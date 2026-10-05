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
