import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { NodeIO } from '@gltf-transform/core'
import { brainRegions } from '../src/data/brainRegions.ts'
import { modelMap, regionForMesh } from '../src/data/modelMap.ts'
import { pathways } from '../src/data/pathways.ts'
import { syndromes } from '../src/data/syndromes.ts'

test('all 17 semantic regions resolve to real, nonempty GLB geometry', async () => {
  const doc = await new NodeIO().read('public/models/brain.glb')
  const meshes = new Map(
    doc
      .getRoot()
      .listMeshes()
      .map((m) => [m.getName(), m]),
  )
  assert.equal(brainRegions.length, 17)
  assert.equal(new Set(brainRegions.map((r) => r.id)).size, 17)
  assert.equal(meshes.size, 59)
  for (const region of brainRegions) {
    assert.ok(modelMap[region.id].length > 0, region.id)
    for (const name of modelMap[region.id]) {
      const mesh = meshes.get(name)
      assert.ok(mesh, `${region.id}: missing ${name}`)
      for (const primitive of mesh.listPrimitives()) {
        assert.ok(primitive.getAttribute('POSITION')!.getCount() > 3)
        assert.ok(primitive.getAttribute('NORMAL'))
        const positions = primitive.getAttribute('POSITION')!.getArray()!
        assert.ok(Array.from(positions).every(Number.isFinite))
      }
    }
  }
  assert.ok((await fs.stat('public/models/brain.glb')).size < 10 * 1024 * 1024)
})
test('all eight pathways use supported regions and explicit scientific limitations', () => {
  assert.equal(pathways.length, 8)
  assert.equal(new Set(pathways.map((p) => p.id)).size, 8)
  for (const p of pathways) {
    assert.ok(p.steps.length >= 3)
    assert.ok(p.description && p.psychology && p.mainIdea)
    for (const step of p.steps) {
      assert.ok(step.description && step.title)
      for (const id of step.regions) assert.ok(modelMap[id]?.length, `${p.id}: unsupported ${id}`)
    }
  }
  for (const id of ['movement', 'threat', 'memory', 'reward'])
    assert.equal(pathways.find((p) => p.id === id)?.type, 'functional-network')
  for (const id of ['prefrontal', 'visual', 'auditory', 'basal', 'thalamus'])
    assert.ok(brainRegions.find((r) => r.id === id)?.note)
})
test('mesh taps resolve to anatomical regions rather than overlapping functional proxies', () => {
  for (const name of modelMap.motor) assert.equal(regionForMesh(name), 'motor')
  for (const name of modelMap.somatosensory) assert.equal(regionForMesh(name), 'somatosensory')
  for (const name of modelMap.visual) assert.equal(regionForMesh(name), 'occipital')
  assert.equal(regionForMesh('missing'), undefined)
})
test('twelve syndromes map to real meshes, the correct hemisphere and verifiable sources', async () => {
  const doc = await new NodeIO().read('public/models/brain.glb')
  const centroidX = new Map(
    doc
      .getRoot()
      .listMeshes()
      .map((m) => {
        const positions = m.listPrimitives()[0].getAttribute('POSITION')!.getArray()!
        let sum = 0
        for (let i = 0; i < positions.length; i += 3) sum += positions[i]
        return [m.getName(), sum / (positions.length / 3)]
      }),
  )
  assert.equal(syndromes.length, 12)
  assert.equal(new Set(syndromes.map((s) => s.id)).size, 12)
  for (const s of syndromes) {
    assert.ok(s.focus.length > 0, s.id)
    for (const name of [...s.focus, ...(s.context ?? [])]) assert.ok(centroidX.has(name), name)
    for (const id of s.regions)
      assert.ok(
        brainRegions.some((r) => r.id === id),
        id,
      )
    if (s.pathway)
      assert.ok(
        pathways.some((p) => p.id === s.pathway),
        s.pathway,
      )
    assert.ok(s.summary && s.causes && s.anatomy && s.psychology && s.insight && s.note)
    assert.ok(s.signs.length >= 4 && s.facts.length >= 2, s.id)
    assert.ok(s.sources.length >= 2, s.id)
    for (const source of s.sources) assert.match(source.url, /^https:\/\//)
  }
  // BodyParts3D labels the left hemisphere on +X; lateralized syndromes must follow it.
  const side = (id: string) => {
    const s = syndromes.find((x) => x.id === id)!
    return s.focus.map((name) => Math.sign(centroidX.get(name)!))
  }
  assert.deepEqual(side('broca'), [1])
  assert.deepEqual(side('wernicke'), [1])
  assert.deepEqual(side('neglect'), [-1, -1])
  assert.deepEqual(side('prosopagnosia'), [-1])
})
