import meshes from './mesh-manifest.json'
import type { RegionId } from '../types/brain'

// Semantic teaching concepts are independent of the original FJ identifiers.
// Subregions without exact boundaries reuse a labelled anatomical parent.
export const modelMap: Record<RegionId, string[]> = {
  frontal: [...meshes.frontal, ...meshes.motor],
  prefrontal: meshes.frontal,
  motor: meshes.motor,
  parietal: [...meshes.parietal, ...meshes.somatosensory],
  somatosensory: meshes.somatosensory,
  temporal: [...meshes.temporal, ...meshes.auditory],
  auditory: meshes.auditory,
  hippocampus: meshes.hippocampus,
  amygdala: meshes.amygdala,
  occipital: meshes.occipital,
  visual: meshes.occipital,
  thalamus: meshes.thalamus,
  hypothalamus: meshes.hypothalamus,
  basal: meshes.basal,
  callosum: meshes.callosum,
  cerebellum: meshes.cerebellum,
  brainstem: meshes.brainstem,
}
export function regionForMesh(name: string): RegionId | undefined {
  // Prefer the physical gyrus/parent over a functional approximation on tap.
  const direct: RegionId[] = [
    'motor',
    'somatosensory',
    'auditory',
    'frontal',
    'parietal',
    'temporal',
    'occipital',
    'hippocampus',
    'amygdala',
    'thalamus',
    'hypothalamus',
    'basal',
    'callosum',
    'cerebellum',
    'brainstem',
  ]
  return direct.find((id) => modelMap[id].includes(name))
}
export const deepRegions: RegionId[] = [
  'hippocampus',
  'amygdala',
  'thalamus',
  'hypothalamus',
  'basal',
  'callosum',
]
export const meshesFor = (ids: RegionId[]) => [...new Set(ids.flatMap((id) => modelMap[id]))]
export const deepMeshes = new Set(meshesFor(deepRegions))
