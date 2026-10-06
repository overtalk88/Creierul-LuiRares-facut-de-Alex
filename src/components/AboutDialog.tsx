import { useEffect, useRef } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { regionById } from '../data/brainRegions'
import Drawer from './Drawer'

const lobes = (['frontal', 'parietal', 'temporal', 'occipital'] as const).map(
  (id) => regionById[id],
)
const sources = [
  ['https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html', 'Licența oficială BodyParts3D'],
  ['https://creativecommons.org/licenses/by/4.0/', 'Creative Commons CC BY 4.0'],
  [
    'https://www.ninds.nih.gov/health-information/public-education/brain-basics',
    'NIH / NINDS — Brain Basics',
  ],
  ['https://www.ncbi.nlm.nih.gov/books/NBK11034/', 'Purves et al. — Central Visual Pathways'],
  ['https://www.ncbi.nlm.nih.gov/books/NBK11078/', 'Purves et al. — The Somatic Sensory System'],
  ['https://www.ncbi.nlm.nih.gov/books/NBK532311/', 'NCBI — Auditory Pathway'],
  ['https://nba.uth.tmc.edu/neuroscience/s4/', 'UTHealth — Homeostasis, emotion and memory'],
  ['https://nba.uth.tmc.edu/neuroanatomy/l5/Lab05p14_index.html', 'UTHealth — Basal Ganglia'],
  [
    'https://nba.uth.tmc.edu/neuroanatomy/L7/Lab07p25_index.html',
    'UTHealth — The Central Olfactory System',
  ],
  [
    'https://pubmed.ncbi.nlm.nih.gov/27069377/',
    'Schultz (2016) — Dopamine reward prediction error coding',
  ],
]
type Props = {
  open: boolean
  section?: 'about' | 'guide'
  onClose: () => void
  returnFocus?: HTMLElement | null
}
export default function AboutDialog({ open, section, onClose, returnFocus }: Props) {
  const body = useRef<HTMLDivElement>(null)
  const guide = useRef<HTMLElement>(null)
  useEffect(() => {
    // Scroll only the panel; scrollIntoView would also move the page behind the dialog.
    if (open && body.current && guide.current)
      body.current.scrollTop = section === 'guide' ? guide.current.offsetTop - 12 : 0
  }, [open, section])
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className="info-drawer"
      labelledBy="about-title"
      returnFocus={returnFocus}
    >
      <div className="drawer-head">
        <span className="label">Informații</span>
        <button className="tool" onClick={onClose} aria-label="Închide despre proiect">
          <X size={18} strokeWidth={1.6} />
        </button>
      </div>
      <div ref={body} className="drawer-body">
        <h2 id="about-title">Despre proiect</h2>
        <p>
          Creierul Interactiv este o aplicație educațională creată pentru prezentarea relației
          dintre anatomia creierului, procesele neuronale și psihologie.
        </p>
        <section ref={guide} className="info-section">
          <h3>Cum citești modelul</h3>
          <ul className="legend">
            {lobes.map((lobe) => (
              <li key={lobe.id}>
                <i style={{ background: lobe.color }} />
                {lobe.name}
              </li>
            ))}
          </ul>
          <p>
            Trage pentru a roti modelul și apropie cu două degete, cu rotița sau cu butoanele + și −
            pentru zoom. Atinge o regiune ca să-i deschizi fișa. Regiunea selectată devine albastru
            intens; etapele deja parcurse ale unui traseu rămân albastru deschis.
          </p>
          <p>
            17 concepte educaționale sunt mapate pe 59 de mesh-uri. V1, cortexul prefrontal, nucleii
            talamici, aria tegmentală ventrală și nucleul accumbens nu sunt delimitate exact. Fișele
            precizează regiunile folosite ca repere. Etapele ilustrează idei, nu viteza impulsurilor
            sau fibre nervoase reale.
          </p>
        </section>
        <section className="info-section">
          <h3>Surse și licențe</h3>
          <p>
            BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0
            International.
          </p>
          <p>
            Geometrie BodyParts3D 4.0, selectată din{' '}
            <a href="https://github.com/ssrpw2/brain-atlas" target="_blank" rel="noreferrer">
              ssrpw2/brain-atlas <ArrowUpRight size={13} />
            </a>
            . Adaptări: selecție, centrare, schimbarea axelor, conversie OBJ → GLB, normale și
            culori educaționale. Culorile nu sunt culori biologice reale.
          </p>
          <ul className="source-list">
            {sources.map(([href, title]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer">
                  {title}
                  <ArrowUpRight size={13} />
                </a>
              </li>
            ))}
          </ul>
        </section>
        <p className="notice">
          Vizualizările au scop educațional și simplifică procese biologice complexe. Aplicația nu
          este destinată diagnosticului sau utilizării medicale.
        </p>
        <small className="credit">
          Software: React, Three.js, React Three Fiber, Drei — MIT; Lucide — ISC. Atribuirea
          completă este inclusă în proiect.
        </small>
      </div>
    </Drawer>
  )
}
