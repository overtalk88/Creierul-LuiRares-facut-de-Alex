// Reproducible conversion of licensed BodyParts3D meshes; no generated anatomy.
import fs from 'node:fs/promises'
import path from 'node:path'
import { Document, NodeIO } from '@gltf-transform/core'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { Box3, Vector3 } from 'three'

const groups = {
  frontal: [
    'superior_frontal_gyrus',
    'middle_frontal_gyrus',
    'inferior_frontal_gyrus',
    'orbital_gyrus',
  ],
  motor: ['precentral_gyrus'],
  parietal: ['superior_parietal_lobule', 'supramarginal_gyrus', 'angular_gyrus'],
  somatosensory: ['postcentral_gyrus'],
  temporal: [
    'middle_temporal_gyrus',
    'inferior_temporal_gyrus',
    'fusiform_gyrus',
    'parahippocampal_gyrus',
  ],
  auditory: ['superior_temporal_gyrus'],
  occipital: ['occipital_lobe'],
  hippocampus: ['hippocampus'],
  amygdala: ['amygdala'],
  thalamus: ['thalamus'],
  hypothalamus: ['hypothalamus'],
  basal: ['caudate_nucleus', 'putamen', 'globus_pallidus'],
  callosum: ['corpus_callosum'],
  cerebellum: ['cerebellum'],
  brainstem: ['midbrain', 'pons', 'medulla_oblongata'],
  context: ['cingulate_gyrus', 'insula'],
}
await fs.mkdir('.cache/obj', { recursive: true })
await fs.mkdir('public/models', { recursive: true })
await fs.mkdir('docs', { recursive: true })
let lock
try {
  lock = JSON.parse(await fs.readFile('scripts/model-source.json', 'utf8'))
} catch {
  const commit = await fetch('https://api.github.com/repos/ssrpw2/brain-atlas/commits/main').then(
    (r) => r.json(),
  )
  if (!commit.sha) throw new Error('Could not resolve source commit')
  lock = { repository: 'ssrpw2/brain-atlas', commit: commit.sha }
  await fs.writeFile('scripts/model-source.json', JSON.stringify(lock, null, 2))
}
const res = await fetch(
  `https://api.github.com/repos/${lock.repository}/contents/brain_obj?ref=${lock.commit}`,
)
if (!res.ok) throw new Error(`Source listing: ${res.status}`)
const files = (await res.json()).filter((f) =>
  Object.values(groups)
    .flat()
    .includes(f.name.replace(/_FJ\d+\.obj$/, '')),
)
const loaded = []
// Bounded batches keep download pressure modest.
for (let i = 0; i < files.length; i += 6) {
  await Promise.all(
    files.slice(i, i + 6).map(async (f) => {
      const local = path.join('.cache/obj', f.name)
      let source
      try {
        source = await fs.readFile(local, 'utf8')
      } catch {
        const response = await fetch(f.download_url)
        if (!response.ok) throw new Error(`${f.name}: ${response.status}`)
        source = await response.text()
        await fs.writeFile(local, source)
      }
      const object = new OBJLoader().parse(source)
      const base = f.name.replace(/_FJ\d+\.obj$/, '')
      const region = Object.keys(groups).find((k) => groups[k].includes(base))
      object.traverse((child) => {
        if (child.isMesh)
          loaded.push({ name: f.name.replace('.obj', ''), region, geometry: child.geometry })
      })
    }),
  )
  console.log(`Downloaded ${Math.min(i + 6, files.length)}/${files.length}`)
}
loaded.sort((a, b) => a.name.localeCompare(b.name))
const bounds = new Box3()
loaded.forEach((m) => {
  m.geometry.computeBoundingBox()
  bounds.union(m.geometry.boundingBox)
})
const center = bounds.getCenter(new Vector3())
const scale = 3 / Math.max(...bounds.getSize(new Vector3()).toArray())
const doc = new Document(),
  buffer = doc.createBuffer(),
  scene = doc.createScene('BodyParts3D Brain')
const material = doc
  .createMaterial('anatomy')
  .setBaseColorFactor([0.7, 0.65, 0.6, 1])
  .setRoughnessFactor(0.85)
const mapping = {},
  manifest = []
for (const m of loaded) {
  m.geometry.deleteAttribute('normal')
  m.geometry.deleteAttribute('uv')
  const geometry = mergeVertices(m.geometry, 0.0001)
  geometry.translate(-center.x, -center.y, -center.z)
  // BodyParts3D is Z-up: rotate as a whole, preserving all relative positions.
  geometry.rotateX(-Math.PI / 2)
  geometry.scale(scale, scale, scale)
  geometry.computeVertexNormals()
  const positions = doc
    .createAccessor()
    .setType('VEC3')
    .setArray(new Float32Array(geometry.attributes.position.array))
    .setBuffer(buffer)
  const normals = doc
    .createAccessor()
    .setType('VEC3')
    .setArray(new Float32Array(geometry.attributes.normal.array))
    .setBuffer(buffer)
  const indices = doc
    .createAccessor()
    .setType('SCALAR')
    .setArray(new Uint32Array(geometry.index.array))
    .setBuffer(buffer)
  const primitive = doc
    .createPrimitive()
    .setAttribute('POSITION', positions)
    .setAttribute('NORMAL', normals)
    .setIndices(indices)
    .setMaterial(material)
  const mesh = doc.createMesh(m.name).addPrimitive(primitive)
  scene.addChild(
    doc.createNode(m.name).setMesh(mesh).setExtras({ region: m.region, source: m.name }),
  )
  ;(mapping[m.region] ??= []).push(m.name)
  manifest.push({
    mesh: m.name,
    region: m.region,
    vertices: geometry.attributes.position.count,
    triangles: geometry.index.count / 3,
  })
}
await new NodeIO().write('public/models/brain.glb', doc)
await fs.writeFile('src/data/mesh-manifest.json', JSON.stringify(mapping, null, 2))
await fs.writeFile(
  'docs/model-manifest.json',
  JSON.stringify(
    {
      ...lock,
      sourceBounds: bounds,
      meshes: manifest,
      triangles: manifest.reduce((n, m) => n + m.triangles, 0),
      bytes: (await fs.stat('public/models/brain.glb')).size,
    },
    null,
    2,
  ),
)
console.log(
  `Converted ${loaded.length} named meshes; ${((await fs.stat('public/models/brain.glb')).size / 1024 / 1024).toFixed(2)} MiB`,
)
