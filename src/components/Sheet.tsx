import { useEffect, useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

export type Snap = 'peek' | 'half' | 'full'
type Props = {
  snap: Snap
  onSnap: (snap: Snap) => void
  header: ReactNode
  /** Changing it starts the next view at the top of the panel. */
  view: string
  children: ReactNode
}
type Drag = {
  id: number
  y: number
  base: number
  moved: boolean
  lastY: number
  lastT: number
  v: number
}

// Mobile bottom sheet. Its collapsed height follows the header so the model keeps the rest.
export default function Sheet({ snap, onSnap, header, view, children }: Props) {
  const sheet = useRef<HTMLElement>(null)
  const grip = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const drag = useRef<Drag | null>(null)
  useEffect(() => {
    const element = grip.current!
    const host = sheet.current!.parentElement!
    const observer = new ResizeObserver(() =>
      host.style.setProperty('--peek', `${Math.ceil(element.getBoundingClientRect().height)}px`),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    body.current?.scrollTo({ top: 0 })
  }, [view])
  useEffect(() => {
    if (snap === 'peek') body.current?.scrollTo({ top: 0 })
  }, [snap])
  const offsets = () => {
    const height = sheet.current!.offsetHeight
    const visible = {
      full: height,
      half: window.innerHeight * 0.54,
      peek: grip.current!.offsetHeight,
    }
    return (Object.keys(visible) as Snap[]).map((key) => [key, height - visible[key]] as const)
  }
  const onPointerDown = (event: PointerEvent) => {
    if (!event.isPrimary || event.button !== 0) return
    const element = sheet.current!
    const base = element.getBoundingClientRect().top - (window.innerHeight - element.offsetHeight)
    drag.current = {
      id: event.pointerId,
      y: event.clientY,
      base,
      moved: false,
      lastY: event.clientY,
      lastT: event.timeStamp,
      v: 0,
    }
  }
  const onPointerMove = (event: PointerEvent) => {
    const state = drag.current
    if (!state || event.pointerId !== state.id) return
    const dy = event.clientY - state.y
    if (!state.moved) {
      if (Math.abs(dy) < 8) return
      state.moved = true
      grip.current!.setPointerCapture(event.pointerId)
      sheet.current!.classList.add('dragging')
    }
    const dt = Math.max(1, event.timeStamp - state.lastT)
    state.v = (event.clientY - state.lastY) / dt
    state.lastY = event.clientY
    state.lastT = event.timeStamp
    const limits = offsets().map(([, offset]) => offset)
    const min = Math.min(...limits),
      max = Math.max(...limits)
    let next = state.base + dy
    // Rubber-band past the first and last snap point.
    if (next < min) next = min - (min - next) * 0.25
    if (next > max) next = max + (next - max) * 0.25
    sheet.current!.style.transform = `translateY(${next}px)`
  }
  const onPointerUp = (event: PointerEvent) => {
    const state = drag.current
    drag.current = null
    if (!state?.moved || event.pointerId !== state.id) return
    const element = sheet.current!
    const current =
      element.getBoundingClientRect().top - (window.innerHeight - element.offsetHeight)
    const projected = current + state.v * 180
    const [best] = offsets().reduce((a, b) =>
      Math.abs(b[1] - projected) < Math.abs(a[1] - projected) ? b : a,
    )
    element.classList.remove('dragging')
    element.style.transform = ''
    // Pointer capture retargets the trailing click to the grip, so a drag never presses a control.
    onSnap(best)
  }
  const expanded = snap !== 'peek'
  return (
    <section ref={sheet} className="sheet" aria-label="Informații educaționale">
      <div
        ref={grip}
        className="sheet-grip"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button
          className="sheet-handle"
          aria-expanded={expanded}
          aria-label={expanded ? 'Restrânge panoul' : 'Extinde panoul'}
          onClick={() => onSnap(expanded ? 'peek' : 'half')}
        />
        {header}
      </div>
      <div ref={body} className="sheet-body">
        {children}
      </div>
    </section>
  )
}
