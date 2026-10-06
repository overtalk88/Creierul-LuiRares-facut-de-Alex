import type { CSSProperties } from 'react'
import { RotateCcw, X } from 'lucide-react'
import { brainRegions } from '../data/brainRegions'
import { pathways } from '../data/pathways'
import Drawer from './Drawer'

type Mode = 'anatomy' | 'pathways'
type Props = {
  open: boolean
  mode: Mode
  onClose: () => void
  onMode: (mode: Mode) => void
  onGuide: () => void
  onAbout: () => void
  onReset: () => void
}
export default function MenuDrawer({
  open,
  mode,
  onClose,
  onMode,
  onGuide,
  onAbout,
  onReset,
}: Props) {
  const items = [
    {
      name: 'Anatomie',
      detail: `${brainRegions.length} structuri`,
      current: mode === 'anatomy',
      action: () => onMode('anatomy'),
    },
    {
      name: 'Trasee',
      detail: `${pathways.length} circuite`,
      current: mode === 'pathways',
      action: () => onMode('pathways'),
    },
    { name: 'Cum citești modelul', detail: 'Culori, gesturi, aproximări', action: onGuide },
    { name: 'Despre proiect și surse', detail: 'Licențe și bibliografie', action: onAbout },
  ]
  return (
    <Drawer open={open} onClose={onClose} className="menu-drawer" labelledBy="menu-title">
      <div className="drawer-head">
        <button className="menu-button" onClick={onClose} aria-label="Închide meniul">
          <X size={20} strokeWidth={1.6} />
          <span className="menu-text">Închide</span>
        </button>
        <h2 id="menu-title" className="label">
          Meniu
        </h2>
      </div>
      <nav className="menu-nav" aria-label="Secțiuni">
        <ol className="menu-list">
          {items.map((item, i) => (
            <li key={item.name} style={{ '--i': i } as CSSProperties}>
              <button
                className="menu-item"
                aria-current={item.current ? 'page' : undefined}
                onClick={item.action}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="name">{item.name}</span>
                <small>{item.detail}</small>
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div className="menu-foot">
        <button className="button-outline" onClick={onReset}>
          <RotateCcw size={15} strokeWidth={1.7} />
          Resetează explorarea
        </button>
        <p className="credit">Model 3D: BodyParts3D, © DBCLS · CC BY 4.0</p>
      </div>
    </Drawer>
  )
}
