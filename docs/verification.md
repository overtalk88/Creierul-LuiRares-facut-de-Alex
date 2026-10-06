# Verificare — 6 octombrie 2026

## Metodă

Verificări TypeScript + build Vite, ESLint, teste de integritate pentru GLB/date și teste Playwright în Chromium. Testele folosesc fișierul GLB real; nu înlocuiesc scena cu un mock. Capturile vizuale au fost inspectate pentru modelul exterior, selecția hipocampului și ecranele mobile.

## Acoperire

- 4 teste de date: toate cele 17 mapări către geometrie reală, cele 8 circuite fără referințe lipsă, selecția corectă a girusurilor și cele 12 sindroame (mesh-uri existente, emisfera corectă pentru Broca, Wernicke, neglijare și prosopagnozie, surse HTTPS).
- 11 teste de browser: randare/selecție/rotire/zoom/reset/inactivitate; playerul tuturor circuitelor; 3 dimensiuni mobile, inclusiv tragerea panoului; toate cele 12 fișe de sindrom, evidențierea pe model, sursele și legăturile spre anatomie și trasee; tabul Sindroame pe 360 px; meniu, ghid de citire, revenirea focusului și comutatorul de straturi; eroare de model și reîncercare; fallback fără WebGL și mișcare redusă; încărcare, recuperare după pierderea contextului, dialog accesibil din tastatură și layout mărit.
- Telefon simulat: **360×640, 390×844, 430×932**, gesturi tactile injectate prin Chrome DevTools Protocol.
- Fără depășire orizontală la aceste dimensiuni. Manipularea modelului nu derulează pagina.
- Selecția structurilor profunde este verificată vizual; exteriorul devine transparent, structura activă rămâne vizibilă.
- Testul de inactivitate instrumentează apelurile WebGL `drawElements`: numărul lor nu crește după stabilizarea scenei.
- Erorile JavaScript și erorile de consolă sunt colectate în scenariile normale. Scenariile de eroare provoacă deliberat eșecul încărcării sau lipsa WebGL.

## Build

Model: 6.688.428 bytes. Three.js: aproximativ 704 kB minificat / 181 kB gzip; renderer: aproximativ 491 kB / 152 kB gzip. Vite emite un avertisment informativ pentru chunk-ul Three.js de peste 500 kB. Build-ul reușește. Modelul, fonturile și aplicația sunt servite local; sursele externe sunt doar linkuri informative.

## Reproducere

```sh
npm ci
npm run lint
npm test
npx playwright install chromium
npm run build
npm run test:e2e
```

Pentru aceleași teste pe build-ul de producție, în PowerShell:

```powershell
$env:TEST_PRODUCTION='1'
npm run test:e2e
```

Playwright pornește automat `vite preview` pe 4173 în acest mod. Capturile se scriu în `test-results/` și nu sunt incluse în Git.

## Limite ale verificării

Nu s-a testat pe un telefon fizic și nici în Safari/iOS. Emularea tactilă confirmă comportamentul browserului testat, nu performanța pe orice dispozitiv. Nu este raportat un FPS măsurat pe hardware mobil. Se recomandă o probă pe telefonul folosit la prezentare. Publicarea Vercel se face prin importul repository-ului; existența unui build local nu confirmă un deploy public.
