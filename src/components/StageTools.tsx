import { useState } from 'react'
import { Layers3, Maximize2, Minus, Plus } from 'lucide-react'

type Props = {
  onZoom: (step: number) => void
  onReset: () => void
  deep: boolean
  onDeep?: (deep: boolean) => void
}
export default function StageTools({ onZoom, onReset, deep, onDeep }: Props) {
  // A short caption confirms the icon-only layer switch on touch screens.
  const [caption, setCaption] = useState<{ text: string; key: number }>()
  return (
    <div
      className="stage-tools"
      role="toolbar"
      aria-label="Vizualizare"
      aria-orientation="vertical"
    >
      <button className="tool" onClick={() => onZoom(1)} aria-label="Mărește modelul">
        <Plus size={18} strokeWidth={1.6} />
      </button>
      <button className="tool" onClick={() => onZoom(-1)} aria-label="Micșorează modelul">
        <Minus size={18} strokeWidth={1.6} />
      </button>
      <button className="tool" onClick={onReset} aria-label="Resetează vederea">
        <Maximize2 size={16} strokeWidth={1.6} />
      </button>
      {onDeep && (
        <button
          className="tool"
          aria-pressed={deep}
          aria-label="Structuri profunde"
          onClick={() => {
            onDeep(!deep)
            setCaption((c) => ({
              text: deep ? 'Exterior' : 'Structuri profunde',
              key: (c?.key ?? 0) + 1,
            }))
          }}
        >
          <Layers3 size={17} strokeWidth={1.6} />
        </button>
      )}
      {caption && (
        <span className="tool-caption" key={caption.key} aria-hidden="true">
          {caption.text}
        </span>
      )}
    </div>
  )
}
