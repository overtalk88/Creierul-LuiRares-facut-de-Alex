import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useProgress } from '@react-three/drei'
import { Mesh, MeshStandardMaterial, Vector3 } from 'three'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { deepRegions, modelMap, regionForMesh } from '../data/modelMap'
import { regionById } from '../data/brainRegions'
import type { RegionId } from '../types/brain'

type Props = {
  active: RegionId[]
  visited: RegionId[]
  deep: boolean
  onSelect: (id: RegionId) => void
  reset: number
  zoom: number
  reduced: boolean
}
const modelUrl = '/models/brain.glb'
function Loading() {
  const { progress } = useProgress()
  return (
    <div className="loading-overlay">
      <div className="model-loading" role="status">
        <span className="loading-dot" />
        Se încarcă modelul 3D…<small>{Math.round(progress)}%</small>
      </div>
    </div>
  )
}
function Model({ active, visited, deep, onSelect, onReady }: Props & { onReady: () => void }) {
  const { scene } = useGLTF(modelUrl)
  const invalidate = useThree((state) => state.invalidate)
  useEffect(onReady, [onReady])
  useEffect(() => invalidate(), [active, visited, deep, invalidate])
  const parts = useMemo(() => {
    const result: { name: string; mesh: Mesh; id?: RegionId }[] = []
    scene.traverse((child) => {
      if (child instanceof Mesh)
        result.push({ name: child.name, mesh: child, id: regionForMesh(child.name) })
    })
    return result
  }, [scene])
  const activeNames = new Set(active.flatMap((id) => modelMap[id]))
  const visitedNames = new Set(visited.flatMap((id) => modelMap[id]))
  const selection = active.length > 0 || visited.length > 0
  const seeInside = deep || [...active, ...visited].some((id) => deepRegions.includes(id))
  const materials = useMemo(
    () => parts.map(() => new MeshStandardMaterial({ roughness: 0.78, metalness: 0 })),
    [parts],
  )
  useEffect(() => () => materials.forEach((m) => m.dispose()), [materials])
  return (
    <group dispose={null}>
      {parts.map((part, index) => {
        const isActive = activeNames.has(part.name),
          wasVisited = visitedNames.has(part.name)
        const isInternal = !!part.id && deepRegions.includes(part.id)
        const surface = !isInternal && part.id !== 'brainstem' && part.id !== 'cerebellum'
        let opacity = 1
        if (selection && !isActive && !wasVisited) opacity = seeInside ? 0.07 : 0.28
        else if (seeInside && surface && !isActive && !wasVisited) opacity = 0.055
        else if (seeInside && surface && wasVisited && !isActive) opacity = 0.18
        // Keep active internal structures unobstructed, including previously visited cortex.
        if (surface && active.some((id) => deepRegions.includes(id)) && !isActive) opacity = 0.055
        const color = part.id ? regionById[part.id].color : '#b8b2a3'
        const mat = materials[index]
        mat.color.set(color)
        mat.emissive.set(isActive ? color : wasVisited ? color : '#000000')
        mat.emissiveIntensity = isActive ? 0.32 : wasVisited ? 0.09 : 0
        if (mat.transparent !== opacity < 1) {
          mat.transparent = opacity < 1
          mat.needsUpdate = true
        }
        mat.opacity = opacity
        mat.depthWrite = opacity > 0.5
        return (
          <mesh
            key={part.name}
            name={part.name}
            geometry={part.mesh.geometry}
            material={mat}
            renderOrder={opacity < 0.5 ? 0 : 1}
            raycast={opacity < 0.15 ? () => {} : Mesh.prototype.raycast}
            onClick={(event) => {
              if (event.delta > 5 || !part.id || opacity < 0.15) return
              event.stopPropagation()
              onSelect(part.id)
            }}
          />
        )
      })}
    </group>
  )
}
function Controls({ reset, zoom, reduced }: Pick<Props, 'reset' | 'zoom' | 'reduced'>) {
  const ref = useRef<OrbitControlsType>(null)
  const previousZoom = useRef(zoom)
  const { camera, invalidate, gl, size } = useThree()
  useEffect(() => {
    camera.position.set(4.3, 1.5, 3.8)
    if (size.width < 600) camera.position.setLength(4.8)
    ref.current?.target.set(0, 0, 0)
    ref.current?.update()
    invalidate()
  }, [reset, camera, invalidate, size.width])
  useEffect(() => {
    const delta = zoom - previousZoom.current
    previousZoom.current = zoom
    if (!delta || !ref.current) return
    const target = ref.current.target
    const offset = new Vector3().subVectors(camera.position, target)
    offset.setLength(Math.max(3, Math.min(9, offset.length() * Math.pow(0.82, delta))))
    camera.position.copy(target).add(offset)
    ref.current.update()
    invalidate()
  }, [zoom, camera, invalidate])
  useEffect(() => {
    const canvas = gl.domElement
    canvas.setAttribute(
      'aria-label',
      'Model 3D al creierului. Trage pentru rotire; folosește două degete pentru zoom. Regiunile pot fi alese și din listă.',
    )
  }, [gl])
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      minDistance={3}
      maxDistance={9}
      enableDamping={!reduced}
      dampingFactor={0.12}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
    />
  )
}
class ModelBoundary extends Component<
  { children: ReactNode; onRetry: () => void },
  { error: boolean }
> {
  state = { error: false }
  static getDerivedStateFromError() {
    return { error: true }
  }
  render() {
    return this.state.error ? (
      <div className="canvas-error" role="alert">
        <strong>Modelul 3D nu a putut fi încărcat.</strong>
        <p>Poți explora în continuare descrierile și traseele.</p>
        <button onClick={this.props.onRetry}>Reîncearcă</button>
      </div>
    ) : (
      this.props.children
    )
  }
}
function webGLAvailable() {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}
export default function BrainCanvas(props: Props) {
  const [supported] = useState(webGLAvailable)
  const [attempt, setAttempt] = useState(0)
  const [lost, setLost] = useState(false)
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  const retry = () => {
    useGLTF.clear(modelUrl)
    setReady(false)
    setLost(false)
    setAttempt((a) => a + 1)
  }
  if (!supported)
    return (
      <div className="canvas-error" role="status">
        <strong>Vizualizarea 3D necesită WebGL 2.</strong>
        <p>
          Deschide aplicația într-un browser compatibil, cu accelerarea grafică activată. Toate
          explicațiile rămân disponibile din listă.
        </p>
      </div>
    )
  return (
    <ModelBoundary key={attempt} onRetry={retry}>
      {lost ? (
        <div className="canvas-error" role="alert">
          <strong>Vizualizarea 3D a fost întreruptă.</strong>
          <button onClick={retry}>Reîncearcă</button>
        </div>
      ) : (
        <>
          <Canvas
            frameloop="demand"
            dpr={[1, 1.5]}
            camera={{ position: [4.3, 1.5, 3.8], fov: 37, near: 0.1, far: 50 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener(
                'webglcontextlost',
                (event) => {
                  event.preventDefault()
                  setLost(true)
                },
                { once: true },
              )
            }}
          >
            <ambientLight intensity={0.7} />
            <hemisphereLight args={['#fff3df', '#314653', 1.15]} />
            <directionalLight position={[4, 6, 5]} intensity={2.2} />
            <directionalLight position={[-4, 1, -3]} intensity={1.1} color="#bad9e8" />
            <Suspense fallback={null}>
              <Model {...props} onReady={onReady} />
            </Suspense>
            <Controls {...props} />
          </Canvas>
          {!ready && <Loading />}
        </>
      )}
    </ModelBoundary>
  )
}
