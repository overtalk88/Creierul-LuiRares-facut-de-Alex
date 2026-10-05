import { useEffect, useRef } from 'react'

export default function EntryNotice({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current!
    const previous = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className="about-dialog entry-notice"
      aria-labelledby="entry-notice-title"
      aria-describedby="entry-notice-message"
      onCancel={onClose}
    >
      <div className="about-content">
        <h2 id="entry-notice-title">Mesaj despre proiect</h2>
        <p id="entry-notice-message">
          Rares Oancea nu s-a implicat deloc in proiect asa ca va trebui sa il lasati gorigent
        </p>
        <button className="entry-notice-cta" onClick={onClose}>
          rares oancea n-ai de ales
        </button>
      </div>
    </dialog>
  )
}
