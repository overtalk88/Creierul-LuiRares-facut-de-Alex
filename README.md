# Creierul Interactiv

Aplicație educațională în română, pentru explorarea relației dintre anatomie, procese neuronale și psihologie. React + TypeScript + Vite + Three.js + React Three Fiber + Drei. Statică, fără backend, conturi, baze de date, chei API sau servicii plătite.

## Pornire locală

Node.js 22.12+ sau 24 LTS și npm.

```sh
npm install
npm run dev
```

Deschide adresa afișată de Vite (implicit http://localhost:5173). Pentru telefon, conectează-l la aceeași rețea Wi-Fi și folosește adresa Network afișată în terminal; firewallul trebuie să permită serverul local.

```sh
npm run build
npm run preview
```

`build` verifică TypeScript și generează `dist/`. `preview` servește build-ul, implicit pe portul 4173. GLB-ul și fonturile sunt incluse local; nu se descarcă modelul dintr-un serviciu terț la fiecare utilizare. Nu există service worker și nu se promite utilizare offline înainte de încărcare.

## Funcții

- Model anatomic real, rotire cu un deget/mouse, pinch/wheel și butoane de zoom, resetarea camerei.
- 17 concepte anatomice selectabile din model sau din lista accesibilă, cu căutare fără diacritice obligatorii.
- Fișe cu anatomie, funcții și legătura cu psihologia; structurile profunde estompează exteriorul automat.
- 8 trasee/circuite: vedere, auz, atingere și propriocepție, mișcare voluntară, miros, răspuns la amenințare, memorie, recompensă și motivație.
- 12 sindroame neuropsihologice (afazia Broca și Wernicke, sindromul amnezic, Korsakoff, sindromul frontal, neglijarea spațială, prosopagnozia, Klüver–Bucy, creierul divizat, Parkinson, sindromul cerebelos, locked-in): date-cheie, anatomie, manifestări, legătura cu psihologia, un reper istoric și surse PubMed. Modelul evidențiază zona afectată pe emisfera corectă și se rotește spre ea.
- Evidențiere secvențială, pauză/redare, anterior/următor, acces direct la etapă și reluare.
- Interfață luminoasă, minimalistă, gândită întâi pentru telefon: modelul ocupă ecranul, iar listele și fișele stau într-un panou glisant (pe desktop, într-o coloană); meniul, ghidul de citire și sursele se deschid la cerere.
- Tranziții line pentru cameră, evidențieri, panouri și conținut.
- Respectarea `prefers-reduced-motion`, selecție prin butoane pentru utilizatorii care nu pot manipula 3D, mesaje de încărcare, reîncercare și fallback fără WebGL.

### Regiuni

Lob frontal, cortex prefrontal, cortex motor primar, lob parietal, cortex somatosenzorial, lob temporal, cortex auditiv, hipocamp, amigdală, lob occipital, cortex vizual, talamus, hipotalamus, ganglionii bazali, corp calos, cerebel și trunchi cerebral.

Unele concepte funcționale folosesc mesh-uri anatomice mai largi. Nu sunt 17 delimitări funcționale exacte: fișele explică aproximațiile. Circuitele pentru memorie, emoție, mișcare și recompensă sunt rețele, nu tracturi liniare. Modelul nu este pentru diagnostic sau utilizare medicală.

## Model și atribuire

**BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.**

[Dataset oficial](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html) · [licență oficială](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) · [selecție OBJ](https://github.com/ssrpw2/brain-atlas).

59 de mesh-uri separate, 276.786 triunghiuri, GLB de ~6,38 MiB. Adaptări: selecție, centrare/scalare/rotire, reunirea vertexurilor coincidente, recalcularea normalelor, conversie în GLB și culori didactice. Atribuirea completă și sursele educaționale sunt în [ATTRIBUTIONS.md](ATTRIBUTIONS.md), iar cercetarea și limitele sunt în [docs/model-research.md](docs/model-research.md).

GLB-ul este deja inclus în repository; conversia nu este necesară la build sau deploy. Pentru reproducere:

```sh
npm run prepare:model
```

Comanda necesită acces la GitHub. Commitul sursă este fixat, fișierele originale sunt păstrate în `.cache/obj/`, iar manifestele documentează conversia. `src/data/modelMap.ts` separă conceptele educaționale de numele mesh-urilor.

## Verificare

```sh
npm run lint
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

Testele de date verifică existența reală a mesh-urilor GLB, toate referințele semantice, cele opt circuite și cele 12 sindroame, inclusiv emisfera mesh-urilor lateralizate. Testele de browser verifică randarea, selecția, rotirea, zoomul, repausul randării la inactivitate, comenzile playerului, reduced-motion, recuperarea după eroare, fallback fără WebGL și viewporturi de 360×640, 390×844 și 430×932. Gesturile sunt simulate în Chromium; aceasta nu înlocuiește verificarea pe telefonul fizic folosit la prezentare.

## Deploy pe Vercel

1. Încarcă acest proiect în repository-ul GitHub `overtalk88/Creierul-LuiRares-facut-de-Alex`.
2. În Vercel: **Add New → Project → Import Git Repository**, apoi selectează repository-ul.
3. **Framework Preset: Vite**.
4. **Build Command: `npm run build`**.
5. **Output Directory: `dist`**. Install command: `npm install` sau `npm ci`.
6. Nu sunt necesare variabile de mediu. Apasă **Deploy**.
7. Deschide adresa `.vercel.app` afișată de Vercel și verifică modelul și un traseu pe telefon.

Proiectul este static și potrivit pentru un proiect personal/educațional. Un domeniu personalizat este opțional și trebuie deținut separat. Configurația este inclusă în `vercel.json`.

## Structură

```text
src/App.tsx                     starea aplicației și așezarea pe desktop/telefon
src/components/BrainCanvas.tsx   randare, selectare, cameră, tranziții și fallback
src/components/ExplorePanel.tsx  listele și fișele structurilor, traseelor și sindroamelor
src/components/PlayerBar.tsx    playerul traseelor (StepRail: etapele numerotate)
src/components/Sheet.tsx        panoul glisant de pe telefon
src/components/MenuDrawer.tsx   meniul principal
src/components/AboutDialog.tsx  ghid de citire, atribuire și surse
src/components/Drawer.tsx       panouri modale animate pe <dialog>
src/data/brainRegions.ts        textele anatomice românești
src/data/pathways.ts            cele opt circuite și etapele lor
src/data/syndromes.ts           cele 12 sindroame, cu date, surse și zonele de pe model
src/data/modelMap.ts            maparea semantică
src/hooks/usePathwayAnimation.ts player și reduced-motion
public/models/brain.glb         modelul redistribuibil
scripts/prepare-model.mjs       conversie reproductibilă
tests/                         date și verificări de browser
```
