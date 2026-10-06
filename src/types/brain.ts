export type RegionId =
  | 'frontal'
  | 'prefrontal'
  | 'motor'
  | 'parietal'
  | 'somatosensory'
  | 'temporal'
  | 'auditory'
  | 'hippocampus'
  | 'amygdala'
  | 'occipital'
  | 'visual'
  | 'thalamus'
  | 'hypothalamus'
  | 'basal'
  | 'callosum'
  | 'cerebellum'
  | 'brainstem'
export type BrainRegion = {
  id: RegionId
  name: string
  category: string
  color: string
  deep?: boolean
  description: string
  functions: string[]
  psychology: string
  note?: string
}
export type PathwayStep = {
  title: string
  description: string
  regions: RegionId[]
  external?: boolean
}
export type NeuralPathway = {
  id: string
  name: string
  subtitle: string
  type: 'anatomical' | 'functional-network'
  description: string
  psychology: string
  mainIdea: string
  steps: PathwayStep[]
}
export type Source = { title: string; url: string }
export type BrainSyndrome = {
  id: string
  name: string
  aka?: string
  domain: string
  /** Short line under the name in the list. */
  site: string
  /** Anatomy cards linked from the fiche. */
  regions: RegionId[]
  /** Model meshes shown as the affected area, and lighter as related context. */
  focus: string[]
  context?: string[]
  /** Camera direction that brings the affected area into view (+X is the patient's left). */
  view?: [number, number, number]
  summary: string
  causes: string
  facts: { value: string; label: string }[]
  anatomy: string
  signs: string[]
  psychology: string
  insight: string
  history: { year: string; text: string }
  note: string
  pathway?: string
  sources: Source[]
}
