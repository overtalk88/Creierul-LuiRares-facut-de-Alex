import { lazy, Suspense, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  Eye,
  Fingerprint,
  Info,
  Layers3,
  Maximize2,
  Minus,
  MousePointer2,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Route,
  Search,
  SkipBack,
  SkipForward,
  X,
} from 'lucide-react'
import { brainRegions, regionById } from './data/brainRegions'
import { pathways, educationalNote } from './data/pathways'
import { usePathwayAnimation } from './hooks/usePathwayAnimation'
import AboutDialog from './components/AboutDialog'
import EntryNotice from './components/EntryNotice'
import type { RegionId } from './types/brain'
const BrainCanvas = lazy(() => import('./components/BrainCanvas'))

export default function App() {
  const [mode, setMode] = useState<'anatomy' | 'pathways'>('anatomy')
  const [selected, setSelected] = useState<RegionId>()
  const [pathId, setPathId] = useState<string>()
  const [deep, setDeep] = useState(false)
  const [about, setAbout] = useState(false)
  const [showEntryNotice, setShowEntryNotice] = useState(true)
  const [reset, setReset] = useState(0)
  const [zoom, setZoom] = useState(0)
  const [query, setQuery] = useState('')
  const pathway = pathways.find((p) => p.id === pathId)
  const player = usePathwayAnimation(pathway)
  const region = selected ? regionById[selected] : undefined
  const current = mode === 'pathways' ? pathway?.steps[player.step] : undefined
  const active =
    mode === 'anatomy'
      ? selected
        ? [selected]
        : []
      : player.complete
        ? []
        : (current?.regions ?? [])
  const visited =
    mode === 'pathways'
      ? (pathway?.steps
          .slice(0, player.complete ? undefined : player.step)
          .flatMap((s) => s.regions) ?? [])
      : []
  const showModel = () => {
    if (window.innerWidth <= 760) window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const switchMode = (next: typeof mode) => {
    setMode(next)
    setSelected(undefined)
    setPathId(undefined)
    player.stop()
    setQuery('')
    showModel()
  }
  const selectRegion = (id: RegionId) => {
    player.stop()
    setMode('anatomy')
    setSelected(id)
    setPathId(undefined)
    showModel()
  }
  const selectPath = (id: string) => {
    setPathId(id)
    setSelected(undefined)
    player.start()
    showModel()
  }
  const resetAll = () => {
    setSelected(undefined)
    setPathId(undefined)
    setDeep(false)
    setReset((n) => n + 1)
    player.stop()
    setQuery('')
  }
  const normalized = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('ro')
  const filtered = brainRegions.filter((r) =>
    normalized(r.name + ' ' + r.category).includes(normalized(query)),
  )

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Creierul Interactiv — început">
          <span className="brand-icon">
            <Brain size={25} />
          </span>
          <span>
            Creierul <b>Interactiv</b>
            <small>Anatomie · Procese · Psihologie</small>
          </span>
        </a>
        <div className="header-right">
          <span className="edition">UN ATLAS PENTRU MINȚI CURIOASE</span>
          <button
            className="icon-button"
            aria-label="Despre proiect și surse"
            onClick={() => {
              player.stop()
              setAbout(true)
            }}
          >
            <Info size={20} />
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="viewer" aria-label="Explorator anatomic 3D">
          <div className="viewer-heading">
            <span className="eyebrow">
              <span className="status-dot" /> ATLAS INTERACTIV 3D
            </span>
            <h1>
              {mode === 'anatomy'
                ? 'Descoperă ce te face să fii tu.'
                : 'Urmărește o idee în mișcare.'}
            </h1>
            <p>
              {mode === 'anatomy'
                ? 'Atinge o regiune. Înțelege conexiunea.'
                : 'De la anatomie la procesele minții.'}
            </p>
          </div>
          <div className="layer-switch" aria-label="Straturi anatomice">
            <button aria-pressed={!deep} onClick={() => setDeep(false)}>
              <Layers3 size={15} />
              <span>Exterior</span>
            </button>
            <button aria-pressed={deep} onClick={() => setDeep(true)}>
              <Eye size={15} />
              <span>Structuri profunde</span>
            </button>
          </div>
          <div className="canvas-wrap">
            <Suspense
              fallback={
                <div className="canvas-error" role="status">
                  Se pregătește exploratorul 3D…
                </div>
              }
            >
              <BrainCanvas
                active={active}
                visited={visited}
                deep={deep}
                onSelect={selectRegion}
                reset={reset}
                zoom={zoom}
                reduced={player.reduced}
              />
            </Suspense>
          </div>
          <div className="view-tools">
            <button
              className="icon-button"
              onClick={() => setZoom((z) => z + 1)}
              aria-label="Mărește modelul"
            >
              <Plus size={18} />
            </button>
            <button
              className="icon-button"
              onClick={() => setZoom((z) => z - 1)}
              aria-label="Micșorează modelul"
            >
              <Minus size={18} />
            </button>
            <span />
            <button
              className="icon-button"
              onClick={() => setReset((n) => n + 1)}
              aria-label="Resetează vederea"
            >
              <Maximize2 size={18} />
            </button>
          </div>
          {(region || current) && (
            <div className="selection-label" aria-live="polite">
              <span className="status-dot" />
              {region?.name ?? (player.complete ? 'Circuit explorat' : current?.title)}
            </div>
          )}
          <div className="viewer-footer">
            <div className="gesture-hint">
              <MousePointer2 size={15} />
              <span>
                Trage pentru rotire <i>·</i> Apropie pentru zoom
              </span>
            </div>
            <div className="legend">
              <span>
                <i style={{ background: '#dfa18f' }} />
                Frontal
              </span>
              <span>
                <i style={{ background: '#b5c6a2' }} />
                Parietal
              </span>
              <span>
                <i style={{ background: '#baa9cf' }} />
                Temporal
              </span>
              <span>
                <i style={{ background: '#92bbc9' }} />
                Occipital
              </span>
            </div>
          </div>
          <div className="model-credit">
            BodyParts3D 4.0 / DBCLS · CC BY 4.0{' '}
            <button
              onClick={() => {
                player.stop()
                setAbout(true)
              }}
              aria-label="Vezi atribuirea modelului"
            >
              ↗
            </button>
          </div>
        </section>
        <aside className="explore-panel" aria-label="Informații educaționale">
          <nav className="mode-tabs" aria-label="Mod de explorare">
            <button
              className={mode === 'anatomy' ? 'active' : ''}
              aria-pressed={mode === 'anatomy'}
              onClick={() => switchMode('anatomy')}
            >
              <Brain size={18} />
              Anatomie
            </button>
            <button
              className={mode === 'pathways' ? 'active' : ''}
              aria-pressed={mode === 'pathways'}
              onClick={() => switchMode('pathways')}
            >
              <Route size={18} />
              Trasee
            </button>
          </nav>
          <div className="panel-content" key={selected ?? pathId ?? mode}>
            {mode === 'anatomy' && !region && (
              <>
                <div className="panel-intro">
                  <span className="eyebrow">01 / EXPLOREAZĂ STRUCTURILE</span>
                  <h2>O lume în interior.</h2>
                  <p>
                    Alege o regiune și descoperă rolul ei în felul în care simți, gândești și
                    acționezi.
                  </p>
                </div>
                <label className="search-box">
                  <Search size={17} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Caută o structură…"
                    aria-label="Caută o structură"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} aria-label="Șterge căutarea">
                      <X size={15} />
                    </button>
                  )}
                </label>
                <div className="list-heading">
                  <span>REGIUNI ANATOMICE</span>
                  <span>{filtered.length.toString().padStart(2, '0')}</span>
                </div>
                <div className="region-list">
                  {filtered.map((r) => (
                    <button className="region-row" key={r.id} onClick={() => selectRegion(r.id)}>
                      <span className="region-dot" style={{ background: r.color }} />
                      <span>
                        {r.name}
                        <small>{r.category}</small>
                      </span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                  {!filtered.length && (
                    <p className="empty-search">
                      Nicio structură găsită. Încearcă „memorie” sau „frontal”.
                    </p>
                  )}
                </div>
                <div className="explore-tip">
                  <Fingerprint size={22} />
                  <p>Poți selecta o structură și printr-o atingere direct pe model.</p>
                </div>
              </>
            )}
            {mode === 'anatomy' && region && (
              <>
                <button className="text-button" onClick={() => setSelected(undefined)}>
                  <ArrowLeft size={16} />
                  Toate structurile <span className="sr-only">· Închide fișa</span>
                </button>
                <div className="region-title">
                  <span className="eyebrow">{region.category}</span>
                  <h2>
                    <i style={{ background: region.color }} />
                    {region.name}
                  </h2>
                  {region.deep && (
                    <span className="tag">
                      <Eye size={13} />
                      Exterior estompat automat
                    </span>
                  )}
                </div>
                <section className="info-section">
                  <span className="section-number">01</span>
                  <div>
                    <h3>Ce este?</h3>
                    <p>{region.description}</p>
                  </div>
                </section>
                <section className="info-section">
                  <span className="section-number">02</span>
                  <div>
                    <h3>Funcție</h3>
                    <ul>
                      {region.functions.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </section>
                <div className="psychology-card">
                  <span className="eyebrow">
                    <Brain size={15} />
                    LEGĂTURA CU PSIHOLOGIA
                  </span>
                  <p>{region.psychology}</p>
                </div>
                {region.note && (
                  <p className="simplification">
                    <Info size={15} />
                    <span>{region.note}</span>
                  </p>
                )}
                <button className="related-button" onClick={() => switchMode('pathways')}>
                  Descoperă traseele funcționale
                  <ArrowRight size={17} />
                </button>
              </>
            )}
            {mode === 'pathways' && !pathway && (
              <>
                <div className="panel-intro">
                  <span className="eyebrow">02 / URMĂREȘTE CONEXIUNILE</span>
                  <h2>De la creier la minte.</h2>
                  <p>Trasee și circuite funcționale explicate pas cu pas.</p>
                </div>
                <div className="pathway-list">
                  {pathways.map((p, i) => (
                    <button className="pathway-row" key={p.id} onClick={() => selectPath(p.id)}>
                      <span className="path-index">{String(i + 1).padStart(2, '0')}</span>
                      <span>
                        <strong>{p.name}</strong>
                        <small>{p.subtitle}</small>
                      </span>
                      <ArrowRight size={17} />
                    </button>
                  ))}
                </div>
                <p className="simplification">
                  <Info size={16} />
                  <span>{educationalNote}</span>
                </p>
              </>
            )}
            {mode === 'pathways' && pathway && (
              <>
                <button
                  className="text-button"
                  onClick={() => {
                    setPathId(undefined)
                    player.stop()
                  }}
                >
                  <ArrowLeft size={16} />
                  Toate traseele
                </button>
                <div className="path-title">
                  <span className="eyebrow">
                    {pathway.type === 'anatomical'
                      ? 'TRASEU ANATOMIC SIMPLIFICAT'
                      : 'REȚEA FUNCȚIONALĂ · ORDINE DIDACTICĂ'}
                  </span>
                  <h2>{pathway.name}</h2>
                  <p>{pathway.subtitle}</p>
                </div>
                <div className="player-card">
                  <div className="player-status">
                    <span>
                      {player.complete ? (
                        <>
                          <Check size={14} />
                          Explorare încheiată
                        </>
                      ) : (
                        <>
                          PASUL {player.step + 1} DIN {pathway.steps.length}
                        </>
                      )}
                    </span>
                    <span>{player.playing ? 'În redare' : player.complete ? '' : 'În pauză'}</span>
                  </div>
                  <div className="step-progress">
                    {pathway.steps.map((s, i) => (
                      <button
                        key={s.title}
                        className={
                          i === player.step
                            ? 'current'
                            : i < player.step || player.complete
                              ? 'visited'
                              : ''
                        }
                        onClick={() => player.go(i)}
                        aria-label={`Pasul ${i + 1}: ${s.title}`}
                        aria-current={i === player.step ? 'step' : undefined}
                      >
                        <span />
                      </button>
                    ))}
                  </div>
                  <div className="current-step" aria-live="polite">
                    <h3>{current?.title}</h3>
                    <p>{current?.description}</p>
                  </div>
                  <div className="player-controls">
                    <button
                      className="icon-button"
                      disabled={player.step === 0}
                      onClick={() => player.go(player.step - 1)}
                      aria-label="Pasul anterior"
                    >
                      <SkipBack size={19} />
                    </button>
                    <button
                      className="play-button"
                      onClick={player.toggle}
                      aria-label={player.playing ? 'Pauză' : 'Redă traseul'}
                    >
                      {player.playing ? <Pause size={18} /> : <Play size={18} />}
                      <span>{player.playing ? 'Pauză' : player.complete ? 'Reia' : 'Redă'}</span>
                    </button>
                    <button
                      className="icon-button"
                      disabled={player.step === pathway.steps.length - 1}
                      onClick={() => player.go(player.step + 1)}
                      aria-label="Pasul următor"
                    >
                      <SkipForward size={19} />
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => player.start()}
                      aria-label="Repornește traseul"
                    >
                      <RotateCcw size={17} />
                    </button>
                  </div>
                  {player.reduced && (
                    <small className="motion-note">
                      Mișcare redusă: redarea automată este oprită la selectare.
                    </small>
                  )}
                </div>
                <details className="step-details">
                  <summary>Traseu simplificat · {pathway.steps.length} etape</summary>
                  <ol>
                    {pathway.steps.map((s, i) => (
                      <li key={s.title}>
                        <button
                          aria-current={i === player.step ? 'step' : undefined}
                          onClick={() => player.go(i)}
                        >
                          {s.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </details>
                <section className="info-section">
                  <div>
                    <h3>Ce se întâmplă?</h3>
                    <p>{pathway.description}</p>
                  </div>
                </section>
                <div className="psychology-card">
                  <span className="eyebrow">
                    <Brain size={15} />
                    LEGĂTURA CU PSIHOLOGIA
                  </span>
                  <p>{pathway.psychology}</p>
                  <div className="main-idea">
                    <span>IDEA PRINCIPALĂ</span>
                    <strong>{pathway.mainIdea}</strong>
                  </div>
                </div>
                <p className="simplification">
                  <Info size={15} />
                  <span>{educationalNote}</span>
                </p>
              </>
            )}
          </div>
          <div className="panel-bottom">
            <span>
              <span className="status-dot" />
              Învață prin explorare
            </span>
            <button onClick={resetAll}>
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </aside>
      </main>
      <footer className="app-footer">
        <span>O perspectivă asupra creierului. O conexiune cu psihologia.</span>
        <button
          onClick={() => {
            player.stop()
            setAbout(true)
          }}
        >
          Surse și licențe <ArrowRight size={13} />
        </button>
      </footer>
      {about && <AboutDialog onClose={() => setAbout(false)} />}
      {showEntryNotice && <EntryNotice onClose={() => setShowEntryNotice(false)} />}
    </div>
  )
}
