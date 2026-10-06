import { ArrowLeft, Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react'
import type { NeuralPathway } from '../types/brain'
import type { Player } from './ExplorePanel'
import StepRail from './StepRail'

type Props = { pathway: NeuralPathway; player: Player; compact?: boolean; onBack?: () => void }
// Step caption and transport controls; compact is the mobile sheet header.
export default function PlayerBar({ pathway, player, compact, onBack }: Props) {
  const total = pathway.steps.length
  const current = pathway.steps[player.step]
  const status = player.complete ? 'Explorare încheiată' : `Pasul ${player.step + 1} din ${total}`
  const state = player.playing ? 'În redare' : player.complete ? '' : 'În pauză'
  return (
    <div className={compact ? 'player compact' : 'player'}>
      {compact && (
        <div className="player-top">
          <button className="back icon-only" onClick={onBack} aria-label="Toate traseele">
            <ArrowLeft size={18} strokeWidth={1.7} />
          </button>
          <h2 className="label">{pathway.name}</h2>
        </div>
      )}
      <div className="player-text">
        <p className="player-status">
          <span>{status}</span>
          {state && <span>{state}</span>}
        </p>
        <div className="current-step" aria-live="polite" key={`${player.step}-${player.complete}`}>
          <h3>{current.title}</h3>
          {!compact && <p>{current.description}</p>}
        </div>
      </div>
      <div className="player-row">
        {compact && <StepRail pathway={pathway} player={player} horizontal />}
        <div className="player-controls">
          <button
            className="tool"
            disabled={player.step === 0}
            onClick={() => player.go(player.step - 1)}
            aria-label="Pasul anterior"
          >
            <SkipBack size={17} strokeWidth={1.7} />
          </button>
          <button
            className="cta play"
            onClick={player.toggle}
            aria-label={player.playing ? 'Pauză' : 'Redă traseul'}
          >
            {player.playing ? <Pause size={18} /> : <Play size={18} />}
            <span>{player.playing ? 'Pauză' : player.complete ? 'Reia' : 'Redă'}</span>
          </button>
          <button
            className="tool"
            disabled={player.step === total - 1}
            onClick={() => player.go(player.step + 1)}
            aria-label="Pasul următor"
          >
            <SkipForward size={17} strokeWidth={1.7} />
          </button>
          <button className="tool" onClick={() => player.start()} aria-label="Repornește traseul">
            <RotateCcw size={16} strokeWidth={1.7} />
          </button>
        </div>
      </div>
      {player.reduced && !compact && (
        <small className="motion-note">
          Mișcare redusă: redarea automată este oprită la selectare.
        </small>
      )}
    </div>
  )
}
