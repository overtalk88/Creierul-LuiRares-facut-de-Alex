import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/usePathwayAnimation'

type Props = {
  open: boolean
  onClose: () => void
  className: string
  labelledBy: string
  returnFocus?: HTMLElement | null
  children: ReactNode
}
// Modal panel on a native <dialog>; stays mounted while its exit transition runs.
export default function Drawer({
  open,
  onClose,
  className,
  labelledBy,
  returnFocus,
  children,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const previous = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(open)
  const reduced = useReducedMotion()
  if (open && !mounted) setMounted(true)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) {
        previous.current = document.activeElement as HTMLElement | null
        dialog.showModal()
        // Commit the closed state before opening so the entry transition runs.
        void dialog.offsetWidth
      }
      dialog.setAttribute('data-open', '')
      return
    }
    dialog.removeAttribute('data-open')
    const timer = window.setTimeout(
      () => {
        dialog.close()
        setMounted(false)
        ;(returnFocus ?? previous.current)?.focus()
      },
      reduced ? 0 : 360,
    )
    return () => window.clearTimeout(timer)
  }, [open, mounted, reduced, returnFocus])
  if (!mounted) return null
  return (
    <dialog
      ref={ref}
      className={`drawer ${className}`}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
    >
      <div className="drawer-inner">{children}</div>
    </dialog>
  )
}
