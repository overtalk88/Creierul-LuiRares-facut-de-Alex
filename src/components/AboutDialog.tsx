import { useEffect, useRef } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
export default function AboutDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    const previous = document.activeElement as HTMLElement
    dialog.showModal()
    return () => {
      dialog.close()
      previous?.focus()
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className="about-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      <div className="about-content">
        <button
          className="icon-button close-about"
          onClick={onClose}
          aria-label="Închide despre proiect"
        >
          <X size={20} />
        </button>
        <span className="eyebrow">DINCOLO DE MODEL</span>
        <h2>Despre proiect</h2>
        <p>
          Creierul Interactiv este o aplicație educațională creată pentru prezentarea relației
          dintre anatomia creierului, procesele neuronale și psihologie.
        </p>
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
          . Adaptări: selecție, centrare, schimbarea axelor, conversie OBJ → GLB, normale și culori
          educaționale. Culorile nu sunt culori biologice reale.
        </p>
        <ul className="source-list">
          <li>
            <a
              href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html"
              target="_blank"
              rel="noreferrer"
            >
              Licența oficială BodyParts3D
            </a>{' '}
            ·{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
              CC BY 4.0
            </a>
          </li>
          <li>
            <a
              href="https://www.ninds.nih.gov/health-information/public-education/brain-basics"
              target="_blank"
              rel="noreferrer"
            >
              NIH / NINDS — Brain Basics
            </a>
          </li>
          <li>
            <a href="https://www.ncbi.nlm.nih.gov/books/NBK11034/" target="_blank" rel="noreferrer">
              Purves et al. — Central Visual Pathways
            </a>
          </li>
          <li>
            <a href="https://www.ncbi.nlm.nih.gov/books/NBK11078/" target="_blank" rel="noreferrer">
              Purves et al. — The Somatic Sensory System
            </a>
          </li>
          <li>
            <a
              href="https://www.ncbi.nlm.nih.gov/books/NBK532311/"
              target="_blank"
              rel="noreferrer"
            >
              NCBI — Auditory Pathway
            </a>
          </li>
          <li>
            <a href="https://nba.uth.tmc.edu/neuroscience/s4/" target="_blank" rel="noreferrer">
              UTHealth — Homeostasis, emotion and memory
            </a>
          </li>
          <li>
            <a
              href="https://nba.uth.tmc.edu/neuroanatomy/l5/Lab05p14_index.html"
              target="_blank"
              rel="noreferrer"
            >
              UTHealth — Basal Ganglia
            </a>
          </li>
          <li>
            <a
              href="https://nba.uth.tmc.edu/neuroanatomy/L7/Lab07p25_index.html"
              target="_blank"
              rel="noreferrer"
            >
              UTHealth — The Central Olfactory System
            </a>
          </li>
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/27069377/" target="_blank" rel="noreferrer">
              Schultz (2016) — Dopamine reward prediction error coding
            </a>
          </li>
        </ul>
        <h3>Cum citești vizualizarea</h3>
        <p>
          17 concepte educaționale sunt mapate pe 59 de mesh-uri. V1, cortexul prefrontal, nucleii
          talamici, aria tegmentală ventrală și nucleul accumbens nu sunt delimitate exact. Fișele
          precizează regiunile folosite ca repere. Etapele ilustrează idei, nu viteza impulsurilor
          sau fibre nervoase reale.
        </p>
        <p className="notice">
          Vizualizările au scop educațional și simplifică procese biologice complexe. Aplicația nu
          este destinată diagnosticului sau utilizării medicale.
        </p>
        <small>
          Software: React, Three.js, React Three Fiber, Drei — MIT; Lucide — ISC. Atribuirea
          completă este inclusă în proiect.
        </small>
      </div>
    </dialog>
  )
}
