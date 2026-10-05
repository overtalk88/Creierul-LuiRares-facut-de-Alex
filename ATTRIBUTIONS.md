# Surse și licențe

## Geometrie anatomică — CC BY 4.0 International

**BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.**

- Dataset: **BodyParts3D 4.0**, Database Center for Life Science (DBCLS), Japan.
- [Sursa oficială](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html).
- [Licența oficială a bazei de date](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html), actualizată la 27 februarie 2025; verificată la 6 octombrie 2026.
- [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
- Selecția OBJ: [ssrpw2/brain-atlas](https://github.com/ssrpw2/brain-atlas), commit `c20c30e9c4628b9d129ecf061ff8cce99f358490`. Mulțumiri autorului pentru organizarea mesh-urilor. Nu a fost copiat codul aplicației, scenelor sau scripturilor acestui proiect.
- Publicația datasetului: Mitsuhashi N, Fujieda K, Tamura T, Kawamoto S, Takagi T, Okubo K. _BodyParts3D: 3D structure database for anatomical concepts_. Nucleic Acids Research (2009), 37, D782–D785. [doi:10.1093/nar/gkn613](https://doi.org/10.1093/nar/gkn613).

Licența oficială permite reutilizarea, redistribuirea și adaptarea cu atribuire. Fișierele OBJ istorice includ în comentarii vechea licență CC BY-SA 2.1 Japan. Aceste comentarii sunt păstrate în cache-ul sursă la reconversie; licența CC BY 4.0 folosită pentru această distribuție este anunțul actual al titularului și este confirmată și de README-ul sursei intermediare. Notele de proveniență și atribuire sunt păstrate în `docs/source-notices/`.

### Adaptări

Au fost selectate 59 de mesh-uri, păstrând denumirile anatomice și identificatorii FJ. Coordonatele au fost centrate, scalate uniform și rotite din Z-up în Y-up. Vertexurile coincidente au fost reunite, normalele recalculate și datele convertite OBJ → GLB. Nu au fost generate forme anatomice noi, fibre sau delimitări funcționale. Culorile și transparența sunt alegeri didactice. Mesh-urile nu au fost decimate suplimentar.

Fișierul derivat `public/models/brain.glb` este distribuit sub **CC BY 4.0**. Includeți atribuirea și descrierea modificărilor când îl reutilizați. DBCLS și autorii sursei nu susțin și nu certifică această aplicație.

## Surse educaționale

Textele românești sunt sinteze originale, destinate unui proiect școlar, nu traduceri integrale. Traseele funcționale sunt prezentate ca explicații simplificate, cu conexiuni paralele și recurente.

- NIH / NINDS, [Brain Basics](https://www.ninds.nih.gov/health-information/public-education/brain-basics) — anatomie generală.
- Purves et al., _Neuroscience_, 2nd ed., [Central Visual Pathways](https://www.ncbi.nlm.nih.gov/books/NBK11034/) — vedere.
- Purves et al., [The Somatic Sensory System](https://www.ncbi.nlm.nih.gov/books/NBK11078/) — atingere și propriocepție.
- NCBI Bookshelf, [Neuroanatomy, Auditory Pathway](https://www.ncbi.nlm.nih.gov/books/NBK532311/) — auz.
- UTHealth, [Hippocampus](https://nba.uth.tmc.edu/neuroscience/s4/chapter05.html), [Amygdala](https://nba.uth.tmc.edu/neuroscience/s4/chapter06.html), [Learning and Memory](https://nba.uth.tmc.edu/neuroscience/s4/chapter07.html), [Association and Executive Processing](https://nba.uth.tmc.edu/neuroscience/s4/chapter09.html).
- UTHealth, [Homeostasis and Higher Brain Functions](https://nba.uth.tmc.edu/neuroscience/s4/) — hipotalamus și reglare.
- UTHealth, [Basal Ganglia](https://nba.uth.tmc.edu/neuroanatomy/l5/Lab05p14_index.html) — circuite motorii.
- UTHealth, [The Central Olfactory System](https://nba.uth.tmc.edu/neuroanatomy/L7/Lab07p25_index.html) — miros și relații talamocorticale.
- Schultz W. (2016), [Dopamine reward prediction error coding](https://pubmed.ncbi.nlm.nih.gov/27069377/), doi:10.31887/DCNS.2016.18.1/wschultz — recompensă, anticipare și învățare.

## Software și fonturi

React / React DOM, Three.js, React Three Fiber, Drei, three-stdlib și glTF Transform: MIT. Lucide: ISC. Vite, TypeScript și instrumentele de dezvoltare își păstrează licențele din pachetele npm. Fonturile DM Sans și Manrope sunt găzduite local prin Fontsource, sub SIL Open Font License 1.1. Textele licențelor fonturilor sunt în `public/licenses/`.

Licența modelului anatomic nu se aplică automat codului sursă sau textelor originale ale aplicației.
