import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useProgress } from '@react-three/drei'
import { Color, Mesh, MeshStandardMaterial, PerspectiveCamera, Spherical, Vector3 } from 'three'
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
  /** Lens zoom below 1 shrinks the model when a panel covers part of the canvas. */
  fit?: number
}
type Look = { color: Color; emissive: Color; glow: number; opacity: number }
const modelUrl = '/models/brain.glb'
const baseFov = 37
const maxFov = 60
const activeColor = '#3346e8'
const visitedColor = '#97a3f3'
const neutralColor = '#c3c8d6'
// Exponential smoothing; capped delta keeps the first frame after idle from jumping.
const settle = (delta: number, speed = 9) => 1 - Math.exp(-Math.min(delta, 1 / 30) * speed)
const near = (a: Color, b: Color) =>
  Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b) < 0.004

function blend(material: MeshStandardMaterial, look: Look, k: number) {
  const done =
    k >= 1 ||
    (near(material.color, look.color) &&
      near(material.emissive, look.emissive) &&
      Math.abs(material.emissiveIntensity - look.glow) < 0.003 &&
      Math.abs(material.opacity - look.opacity) < 0.003)
  if (done) {
    material.color.copy(look.color)
    material.emissive.copy(look.emissive)
    material.emissiveIntensity = look.glow
    material.opacity = look.opacity
  } else {
    material.color.lerp(look.color, k)
    material.emissive.lerp(look.emissive, k)
    material.emissiveIntensity += (look.glow - material.emissiveIntensity) * k
    material.opacity += (look.opacity - material.opacity) * k
  }
  const transparent = material.opacity < 1
  if (material.transparent !== transparent) {
    material.transparent = transparent
    material.needsUpdate = true
  }
  material.depthWrite = material.opacity > 0.5
  return !done
}

function Loading() {
  const { progress } = useProgress()
  return (
    <div className="loading-overlay">
      <div className="model-loading" role="status">
        <span>Se încarcă modelul 3D…</span>
        <span className="loading-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress / 100})` }} />
        </span>
        <small>{Math.round(progress)}%</small>
      </div>
    </div>
  )
}

function Model({
  active,
  visited,
  deep,
  reduced,
  onSelect,
  onReady,
}: Pick<Props, 'active' | 'visited' | 'deep' | 'reduced' | 'onSelect'> & { onReady: () => void }) {
  const { scene } = useGLTF(modelUrl)
  const invalidate = useThree((state) => state.invalidate)
  const [hovered, setHovered] = useState<RegionId>()
  useEffect(onReady, [onReady])
  useEffect(
    () => () => {
      document.body.style.cursor = ''
    },
    [],
  )
  const parts = useMemo(() => {
    const result: { name: string; mesh: Mesh; id?: RegionId }[] = []
    scene.traverse((child) => {
      if (child instanceof Mesh)
        result.push({ name: child.name, mesh: child, id: regionForMesh(child.name) })
    })
    return result
  }, [scene])
  const materials = useMemo(
    () => parts.map(() => new MeshStandardMaterial({ roughness: 0.58, metalness: 0 })),
    [parts],
  )
  useEffect(() => () => materials.forEach((m) => m.dispose()), [materials])
  const looks = useMemo(() => {
    const activeNames = new Set(active.flatMap((id) => modelMap[id]))
    const visitedNames = new Set(visited.flatMap((id) => modelMap[id]))
    const selection = active.length > 0 || visited.length > 0
    const seeInside = deep || [...active, ...visited].some((id) => deepRegions.includes(id))
    const activeInside = active.some((id) => deepRegions.includes(id))
    return parts.map((part): Look => {
      const isActive = activeNames.has(part.name),
        wasVisited = visitedNames.has(part.name)
      const isInternal = !!part.id && deepRegions.includes(part.id)
      const surface = !isInternal && part.id !== 'brainstem' && part.id !== 'cerebellum'
      let opacity = 1
      if (selection && !isActive && !wasVisited) opacity = seeInside ? 0.07 : 0.28
      else if (seeInside && surface && !isActive && !wasVisited) opacity = 0.055
      else if (seeInside && surface && wasVisited && !isActive) opacity = 0.18
      // Keep active internal structures unobstructed, including previously visited cortex.
      if (surface && activeInside && !isActive) opacity = 0.055
      const base = part.id ? regionById[part.id].color : neutralColor
      const color = isActive ? activeColor : wasVisited ? visitedColor : base
      const lit = isActive || wasVisited
      const hover = !lit && !!part.id && part.id === hovered && opacity > 0.15
      return {
        color: new Color(color),
        emissive: new Color(lit || hover ? color : '#000000'),
        glow: isActive ? 0.3 : wasVisited ? 0.08 : hover ? 0.22 : 0,
        opacity,
      }
    })
  }, [parts, active, visited, deep, hovered])
  const goal = useRef(looks)
  const primed = useRef(false)
  useEffect(() => {
    goal.current = looks
    if (reduced || !primed.current) materials.forEach((m, i) => blend(m, looks[i], 1))
    primed.current = true
    invalidate()
  }, [looks, materials, reduced, invalidate])
  useFrame((state, delta) => {
    const k = settle(delta)
    let moving = false
    materials.forEach((m, i) => {
      if (blend(m, goal.current[i], k)) moving = true
    })
    if (moving) state.invalidate()
  })
  return (
    <group dispose={null}>
      {parts.map((part, index) => {
        const look = looks[index]
        const pickable = !!part.id && look.opacity >= 0.15
        return (
          <mesh
            key={part.name}
            name={part.name}
            geometry={part.mesh.geometry}
            material={materials[index]}
            renderOrder={look.opacity < 0.5 ? 0 : 1}
            raycast={pickable ? Mesh.prototype.raycast : () => {}}
            onClick={(event) => {
              if (event.delta > 5 || !pickable) return
              event.stopPropagation()
              onSelect(part.id!)
            }}
            onPointerOver={(event) => {
              if (event.pointerType !== 'mouse' || !pickable) return
              event.stopPropagation()
              setHovered(part.id)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(event) => {
              if (event.pointerType !== 'mouse') return
              setHovered((id) => (id === part.id ? undefined : id))
              document.body.style.cursor = ''
            }}
          />
        )
      })}
    </group>
  )
}

function Controls({
  reset,
  zoom,
  reduced,
  fit = 1,
}: Pick<Props, 'reset' | 'zoom' | 'reduced' | 'fit'>) {
  const ref = useRef<OrbitControlsType>(null)
  const lens = useRef(fit)
  const previousZoom = useRef(zoom)
  const goal = useRef<Vector3 | null>(null)
  const first = useRef(true)
  const scratch = useMemo(
    () => ({ from: new Spherical(), to: new Spherical(), offset: new Vector3() }),
    [],
  )
  const { camera, invalidate, gl, size } = useThree()
  const aspect = size.width / Math.max(1, size.height)
  // Portrait screens widen the vertical field of view so the whole brain fits horizontally;
  // past the distortion cap the camera backs off a little instead.
  const framing = useMemo(() => {
    const rad = Math.PI / 180
    const halfWidth = Math.tan((baseFov / 2) * rad) * 1.5
    const needed = Math.atan(halfWidth / aspect)
    const cap = (maxFov / 2) * rad
    return {
      fov: Math.min(maxFov, Math.max(baseFov, (2 * needed) / rad)),
      distance: Math.min(1.2, Math.max(1, Math.tan(needed) / Math.tan(cap))),
    }
  }, [aspect])
  const home = useMemo(
    () => new Vector3(4.3, 1.5, 3.8).multiplyScalar(framing.distance),
    [framing.distance],
  )
  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return
    camera.fov = framing.fov
    camera.updateProjectionMatrix()
    invalidate()
  }, [framing.fov, camera, invalidate])
  useEffect(() => {
    lens.current = fit
    if (reduced && camera instanceof PerspectiveCamera) {
      camera.zoom = fit
      camera.updateProjectionMatrix()
    }
    invalidate()
  }, [fit, reduced, camera, invalidate])
  useEffect(() => {
    const controls = ref.current
    controls?.target.set(0, 0, 0)
    if (reduced || first.current) {
      camera.position.copy(home)
      goal.current = null
      controls?.update()
    } else goal.current = home.clone()
    first.current = false
    invalidate()
  }, [reset, home, camera, invalidate, reduced])
  useEffect(() => {
    const delta = zoom - previousZoom.current
    previousZoom.current = zoom
    const controls = ref.current
    if (!delta || !controls) return
    const offset = new Vector3().subVectors(goal.current ?? camera.position, controls.target)
    offset.setLength(Math.max(3, Math.min(9, offset.length() * Math.pow(0.82, delta))))
    const next = controls.target.clone().add(offset)
    if (reduced) {
      camera.position.copy(next)
      controls.update()
    } else goal.current = next
    invalidate()
  }, [zoom, camera, invalidate, reduced])
  useFrame((state, delta) => {
    if (camera instanceof PerspectiveCamera && camera.zoom !== lens.current) {
      const gap = lens.current - camera.zoom
      camera.zoom = Math.abs(gap) < 0.002 ? lens.current : camera.zoom + gap * settle(delta, 7)
      camera.updateProjectionMatrix()
      state.invalidate()
    }
    const controls = ref.current
    if (!goal.current || !controls) return
    // Interpolate on the sphere so the camera orbits instead of cutting through the model.
    const k = settle(delta, 7)
    const { from, to, offset } = scratch
    from.setFromVector3(offset.subVectors(camera.position, controls.target))
    to.setFromVector3(offset.subVectors(goal.current, controls.target))
    let turn = to.theta - from.theta
    if (turn > Math.PI) turn -= Math.PI * 2
    if (turn < -Math.PI) turn += Math.PI * 2
    from.radius += (to.radius - from.radius) * k
    from.phi += (to.phi - from.phi) * k
    from.theta += turn * k
    camera.position.setFromSpherical(from).add(controls.target)
    if (camera.position.distanceTo(goal.current) < 0.002) {
      camera.position.copy(goal.current)
      goal.current = null
    }
    controls.update()
    if (goal.current) state.invalidate()
  })
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
      dampingFactor={0.1}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      onStart={() => {
        goal.current = null
      }}
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
        <div className={ready ? 'canvas-host ready' : 'canvas-host'}>
          <Canvas
            frameloop="demand"
            dpr={[1, 1.5]}
            camera={{ position: [4.3, 1.5, 3.8], fov: baseFov, near: 0.1, far: 50 }}
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
            <ambientLight intensity={0.5} />
            <hemisphereLight args={['#ffffff', '#9aa5d6', 0.8]} />
            <directionalLight position={[4, 6, 5]} intensity={2.3} />
            <directionalLight position={[-4, 1, -3]} intensity={1.05} color="#c6d0ff" />
            <Suspense fallback={null}>
              <Model {...props} onReady={onReady} />
            </Suspense>
            <Controls {...props} />
          </Canvas>
          {!ready && <Loading />}
        </div>
      )}
    </ModelBoundary>
  )
}
