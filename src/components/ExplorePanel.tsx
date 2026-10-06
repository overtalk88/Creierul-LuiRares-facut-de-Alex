import type { CSSProperties, ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, Eye, Info, Search, X } from 'lucide-react'
import { brainRegions } from '../data/brainRegions'
import { educationalNote, pathways } from '../data/pathways'
import type { BrainRegion, NeuralPathway, RegionId } from '../types/brain'
import type { usePathwayAnimation } from '../hooks/usePathwayAnimation'

export type Mode = 'anatomy' | 'pathways'
export type Player = ReturnType<typeof usePathwayAnimation>
const order = (i: number) => ({ '--i': Math.min(i, 12) }) as CSSProperties

export function ModeTabs({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <nav className="tabs" aria-label="Mod de explorare">
      <button className="tab" aria-pressed={mode === 'anatomy'} onClick={() => onChange('anatomy')}>
        Anatomie <sup aria-hidden="true">{brainRegions.length}</sup>
      </button>
      <button
        className="tab"
        aria-pressed={mode === 'pathways'}
        onClick={() => onChange('pathways')}
      >
        Trasee <sup aria-hidden="true">{pathways.length}</sup>
      </button>
    </nav>
  )
}

export function RegionSearch({
  query,
  onChange,
  onFocus,
}: {
  query: string
  onChange: (query: string) => void
  onFocus?: () => void
}) {
  return (
    <label className="search">
      <Search size={16} strokeWidth={1.7} />
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder="Caută o structură"
        aria-label="Caută o structură"
        enterKeyHint="search"
      />
      {query && (
        <button onClick={() => onChange('')} aria-label="Șterge căutarea">
          <X size={15} />
        </button>
      )}
    </label>
  )
}

export function RegionList({
  regions,
  onSelect,
}: {
  regions: BrainRegion[]
  onSelect: (id: RegionId) => void
}) {
  if (!regions.length)
    return <p className="empty-search">Nicio structură găsită. Încearcă „memorie” sau „frontal”.</p>
  return (
    <ul className="index stagger">
      {regions.map((r, i) => (
        <li key={r.id} style={order(i)}>
          <button className="region-row" onClick={() => onSelect(r.id)}>
            <span className="dot" style={{ background: r.color }} />
            <span className="row-text">
              {r.name}
              <small>{r.category}</small>
            </span>
            <ArrowRight className="row-arrow" size={16} strokeWidth={1.6} />
          </button>
        </li>
      ))}
    </ul>
  )
}

export function PathwayList({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <ul className="index stagger">
      {pathways.map((p, i) => (
        <li key={p.id} style={order(i)}>
          <button className="pathway-row" onClick={() => onSelect(p.id)}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="row-text">
              {p.name}
              <small>{p.subtitle}</small>
            </span>
            <ArrowRight className="row-arrow" size={16} strokeWidth={1.6} />
          </button>
        </li>
      ))}
    </ul>
  )
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className="back" onClick={onClick}>
      <ArrowLeft size={16} strokeWidth={1.7} />
      {label}
    </button>
  )
}

export function RegionHeading({ region, onBack }: { region: BrainRegion; onBack: () => void }) {
  return (
    <div className="region-title">
      <BackButton label="Toate structurile" onClick={onBack} />
      <p className="label muted">{region.category}</p>
      <h2 className="detail-title">
        <span className="dot" style={{ background: region.color }} />
        {region.name}
      </h2>
      {region.deep && (
        <p className="tag">
          <Eye size={13} strokeWidth={1.7} />
          Exterior estompat automat
        </p>
      )}
    </div>
  )
}

function Section({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section className="section" style={order(Number(num))}>
      <h3>
        <span className="num">{num}</span> {title}
      </h3>
      {children}
    </section>
  )
}

export function RegionInfo({
  region,
  onPathways,
}: {
  region: BrainRegion
  onPathways: () => void
}) {
  return (
    <div className="detail stagger">
      <Section num="001" title="Ce este">
        <p>{region.description}</p>
      </Section>
      <Section num="002" title="Funcție">
        <ul className="dash-list">
          {region.functions.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </Section>
      <Section num="003" title="Legătura cu psihologia">
        <p>{region.psychology}</p>
      </Section>
      {region.note && (
        <p className="note" style={order(4)}>
          <Info size={15} strokeWidth={1.7} />
          <span>{region.note}</span>
        </p>
      )}
      <button className="cta" style={order(5)} onClick={onPathways}>
        Vezi traseele funcționale
        <ArrowRight size={17} strokeWidth={1.7} />
      </button>
    </div>
  )
}

export function PathwayHeading({
  pathway,
  onBack,
}: {
  pathway: NeuralPathway
  onBack: () => void
}) {
  return (
    <div className="path-title">
      <BackButton label="Toate traseele" onClick={onBack} />
      <p className="label muted">
        {pathway.type === 'anatomical'
          ? 'Traseu anatomic simplificat'
          : 'Rețea funcțională · ordine didactică'}
      </p>
      <h2 className="detail-title">{pathway.name}</h2>
      <p className="subtitle">{pathway.subtitle}</p>
    </div>
  )
}

export function PathwayInfo({
  pathway,
  player,
  stepText,
}: {
  pathway: NeuralPathway
  player: Player
  stepText?: boolean
}) {
  const current = pathway.steps[player.step]
  return (
    <div className="detail stagger">
      {stepText && (
        <p className="step-text" key={player.step} style={order(0)}>
          {current.description}
        </p>
      )}
      <Section num="001" title="Ce se întâmplă">
        <p>{pathway.description}</p>
      </Section>
      <Section num="002" title="Legătura cu psihologia">
        <p>{pathway.psychology}</p>
      </Section>
      <Section num="003" title="Ideea principală">
        <p className="main-idea">{pathway.mainIdea}</p>
      </Section>
      <details className="step-details" style={order(4)}>
        <summary>
          Toate etapele · {pathway.steps.length}
          <ChevronDown size={16} strokeWidth={1.7} />
        </summary>
        <ol>
          {pathway.steps.map((s, i) => (
            <li key={s.title}>
              <button
                aria-current={i === player.step ? 'step' : undefined}
                onClick={() => player.go(i)}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>
      </details>
      <p className="note" style={order(5)}>
        <Info size={15} strokeWidth={1.7} />
        <span>{educationalNote}</span>
      </p>
    </div>
  )
}
