import type { NeuralPathway } from '../types/brain'
import type { Player } from './ExplorePanel'

type Props = { pathway: NeuralPathway; player: Player; horizontal?: boolean }
// Numbered step index: vertical beside the model on desktop, inline in the mobile player.
export default function StepRail({ pathway, player, horizontal }: Props) {
  return (
    <ol
      className={horizontal ? 'step-rail horizontal' : 'step-rail'}
      aria-label="Etapele traseului"
    >
      {pathway.steps.map((s, i) => (
        <li key={s.title}>
          <button
            className={
              i === player.step ? 'current' : i < player.step || player.complete ? 'visited' : ''
            }
            onClick={() => player.go(i)}
            aria-label={`Pasul ${i + 1}: ${s.title}`}
            aria-current={i === player.step ? 'step' : undefined}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        </li>
      ))}
    </ol>
  )
}
