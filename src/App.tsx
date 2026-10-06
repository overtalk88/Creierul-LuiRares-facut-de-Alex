import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
import { brainRegions, regionById } from './data/brainRegions'
import { meshesFor } from './data/modelMap'
import { pathways } from './data/pathways'
import { syndromes } from './data/syndromes'
import { usePathwayAnimation } from './hooks/usePathwayAnimation'
import { useMediaQuery } from './hooks/useMediaQuery'
import AboutDialog from './components/AboutDialog'
import MenuDrawer from './components/MenuDrawer'
import Sheet from './components/Sheet'
import type { Snap } from './components/Sheet'
import PlayerBar from './components/PlayerBar'
import StepRail from './components/StepRail'
import StageTools from './components/StageTools'
import {
  ModeTabs,
  PathwayHeading,
  PathwayInfo,
  PathwayList,
  RegionHeading,
  RegionInfo,
  RegionList,
  RegionSearch,
  SyndromeHeading,
  SyndromeInfo,
  SyndromeList,
} from './components/ExplorePanel'
import type { Mode } from './components/ExplorePanel'
import type { RegionId } from './types/brain'
const BrainCanvas = lazy(() => import('./components/BrainCanvas'))

const normalized = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase('ro')

export default function App() {
  const mobile = useMediaQuery('(max-width: 899px)')
  const [mode, setMode] = useState<Mode>('anatomy')
  const [selected, setSelected] = useState<RegionId>()
  const [pathId, setPathId] = useState<string>()
  const [syndromeId, setSyndromeId] = useState<string>()
  const [deep, setDeep] = useState(false)
  const [menu, setMenu] = useState(false)
  const [info, setInfo] = useState<'about' | 'guide'>()
  const [infoReturn, setInfoReturn] = useState<HTMLElement | null>(null)
  const [reset, setReset] = useState(0)
  const [zoom, setZoom] = useState(0)
  const [query, setQuery] = useState('')
  const [snap, setSnap] = useState<Snap>('peek')
  const [touched, setTouched] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const pathway = pathways.find((p) => p.id === pathId)
  const player = usePathwayAnimation(pathway)
  const region = selected ? regionById[selected] : undefined
  const syndrome = syndromes.find((s) => s.id === syndromeId)
  const current = mode === 'pathways' ? pathway?.steps[player.step] : undefined
  // Stable arrays keep the 3D scene idle while unrelated UI state changes.
  const active = useMemo<string[]>(() => {
    if (mode === 'anatomy') return selected ? meshesFor([selected]) : []
    if (mode === 'syndromes') return syndrome?.focus ?? []
    return player.complete ? [] : meshesFor(current?.regions ?? [])
  }, [mode, selected, syndrome, player.complete, current])
  const visited = useMemo<string[]>(() => {
    if (mode === 'syndromes') return syndrome?.context ?? []
    if (mode !== 'pathways' || !pathway) return []
    return meshesFor(
      pathway.steps.slice(0, player.complete ? undefined : player.step).flatMap((s) => s.regions),
    )
  }, [mode, syndrome, pathway, player.complete, player.step])
  const view =
    mode === 'anatomy'
      ? region
        ? 'region'
        : 'regions'
      : mode === 'syndromes'
        ? syndrome
          ? 'syndrome'
          : 'syndromes'
        : pathway
          ? 'pathway'
          : 'pathways'
  const reveal = () => {
    if (mobile) setSnap('half')
  }
  const switchMode = (next: Mode) => {
    setMode(next)
    setSelected(undefined)
    setPathId(undefined)
    setSyndromeId(undefined)
    player.stop()
    setQuery('')
  }
  // Choosing a tab from the collapsed sheet opens it so the list is visible.
  const browse = (next: Mode) => {
    switchMode(next)
    if (snap === 'peek') reveal()
  }
  const selectRegion = (id: RegionId) => {
    player.stop()
    setMode('anatomy')
    setSelected(id)
    setPathId(undefined)
    setSyndromeId(undefined)
    setTouched(true)
    reveal()
  }
  const selectPath = (id: string) => {
    setMode('pathways')
    setPathId(id)
    setSelected(undefined)
    setSyndromeId(undefined)
    player.start()
    setTouched(true)
    reveal()
  }
  const selectSyndrome = (id: string) => {
    setSyndromeId(id)
    setTouched(true)
    reveal()
  }
  const closePath = () => {
    setPathId(undefined)
    player.stop()
  }
  const resetAll = () => {
    setMode('anatomy')
    setSelected(undefined)
    setPathId(undefined)
    setSyndromeId(undefined)
    setDeep(false)
    setReset((n) => n + 1)
    player.stop()
    setQuery('')
    setSnap('peek')
  }
  const openInfo = (section: 'about' | 'guide', returnTo: HTMLElement | null) => {
    player.stop()
    setInfoReturn(returnTo)
    setInfo(section)
  }
  const filtered = brainRegions.filter((r) =>
    normalized(r.name + ' ' + r.category).includes(normalized(query)),
  )
  const trail =
    region?.name ??
    pathway?.name ??
    syndrome?.name ??
    (mode === 'pathways' ? 'Trasee' : mode === 'syndromes' ? 'Sindroame' : undefined)

  let header, body
  if (view === 'regions') {
    header = (
      <>
        <ModeTabs mode={mode} onChange={browse} />
        <RegionSearch query={query} onChange={setQuery} onFocus={() => mobile && setSnap('full')} />
      </>
    )
    body = <RegionList regions={filtered} onSelect={selectRegion} />
  } else if (view === 'pathways') {
    header = <ModeTabs mode={mode} onChange={browse} />
    body = <PathwayList onSelect={selectPath} />
  } else if (view === 'syndromes') {
    header = <ModeTabs mode={mode} onChange={browse} />
    body = <SyndromeList onSelect={selectSyndrome} />
  } else if (syndrome) {
    header = <SyndromeHeading syndrome={syndrome} onBack={() => setSyndromeId(undefined)} />
    body = <SyndromeInfo syndrome={syndrome} onRegion={selectRegion} onPathway={selectPath} />
  } else if (region) {
    header = <RegionHeading region={region} onBack={() => setSelected(undefined)} />
    body = <RegionInfo region={region} onPathways={() => switchMode('pathways')} />
  } else if (pathway) {
    header = mobile ? (
      <PlayerBar pathway={pathway} player={player} compact onBack={closePath} />
    ) : (
      <PathwayHeading pathway={pathway} onBack={closePath} />
    )
    body = <PathwayInfo pathway={pathway} player={player} stepText={mobile} />
  }
  const viewKey = selected ?? pathId ?? syndromeId ?? mode

  return (
    <div className="app" data-snap={mobile ? snap : undefined}>
      <h1 className="sr-only">Creierul Interactiv</h1>
      <header className="topbar">
        <button
          ref={menuButton}
          className="menu-button"
          onClick={() => {
            player.stop()
            setMenu(true)
          }}
          aria-haspopup="dialog"
          aria-expanded={menu}
          aria-label="Meniu"
        >
          <Menu size={20} strokeWidth={1.6} />
          <span className="menu-text">Meniu</span>
        </button>
        <nav className="crumbs" aria-label="Poziția curentă">
          <button
            className="crumb-root"
            onClick={resetAll}
            aria-label="Creierul Interactiv, revino la început"
          >
            Creierul
          </button>
          {trail && (
            <span className="crumb-trail" key={trail}>
              <span aria-hidden="true">/</span> {trail}
            </span>
          )}
        </nav>
        {!mobile && (
          <div className="layer-toggle" role="group" aria-label="Straturi anatomice">
            <button aria-pressed={!deep} onClick={() => setDeep(false)}>
              Exterior
            </button>
            <button aria-pressed={deep} onClick={() => setDeep(true)}>
              Structuri profunde
            </button>
          </div>
        )}
      </header>
      <main className="stage" aria-label="Explorator anatomic 3D">
        <div className="canvas-wrap" onPointerDown={() => setTouched(true)}>
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
              fit={mobile && snap !== 'peek' ? 0.78 : 1}
              view={mode === 'syndromes' ? syndrome?.view : undefined}
            />
          </Suspense>
        </div>
        {!mobile && pathway && (
          <>
            <StepRail pathway={pathway} player={player} />
            <PlayerBar pathway={pathway} player={player} />
          </>
        )}
        {!mobile && view === 'regions' && (
          <ol className="stage-guide" aria-label="Cum folosești exploratorul">
            <li>
              <h2>
                <span className="num">001</span> / Rotește
              </h2>
              <p>Trage pentru rotire. Rotița sau butoanele + și − apropie modelul.</p>
            </li>
            <li>
              <h2>
                <span className="num">002</span> / Selectează
              </h2>
              <p>Alege o regiune direct pe model sau din lista din dreapta.</p>
            </li>
            <li>
              <h2>
                <span className="num">003</span> / Urmărește
              </h2>
              <p>Deschide un traseu din „Trasee” și parcurge-l pas cu pas.</p>
            </li>
          </ol>
        )}
      </main>
      <StageTools
        onZoom={(step) => setZoom((z) => z + step)}
        onReset={() => setReset((n) => n + 1)}
        deep={deep}
        onDeep={mobile ? setDeep : undefined}
      />
      {mobile && (
        <p
          className="stage-hint"
          data-hidden={touched || view !== 'regions' || snap !== 'peek' ? '' : undefined}
          aria-hidden="true"
        >
          Trage pentru rotire · două degete pentru zoom
        </p>
      )}
      {mobile ? (
        <Sheet
          snap={snap}
          onSnap={setSnap}
          view={viewKey}
          header={
            <div className="panel-head" key={viewKey}>
              {header}
            </div>
          }
        >
          <div className="panel-body" key={viewKey}>
            {body}
          </div>
        </Sheet>
      ) : (
        <aside className="column" aria-label="Informații educaționale">
          <div className="panel-head" key={`head-${viewKey}`}>
            {header}
          </div>
          <div className="column-body" key={`body-${viewKey}`}>
            <div className="panel-body">{body}</div>
          </div>
          <footer className="column-foot">
            <button className="text-link" onClick={(e) => openInfo('about', e.currentTarget)}>
              Despre proiect și surse
              <ArrowUpRight size={15} strokeWidth={1.7} />
            </button>
            <p className="credit">Model 3D: BodyParts3D, © DBCLS · CC BY 4.0</p>
          </footer>
        </aside>
      )}
      <MenuDrawer
        open={menu}
        mode={mode}
        onClose={() => setMenu(false)}
        onMode={(next) => {
          setMenu(false)
          switchMode(next)
          reveal()
        }}
        onGuide={() => {
          setMenu(false)
          openInfo('guide', menuButton.current)
        }}
        onAbout={() => {
          setMenu(false)
          openInfo('about', menuButton.current)
        }}
        onReset={() => {
          setMenu(false)
          resetAll()
        }}
      />
      <AboutDialog
        open={!!info}
        section={info}
        onClose={() => setInfo(undefined)}
        returnFocus={infoReturn}
      />
    </div>
  )
}
