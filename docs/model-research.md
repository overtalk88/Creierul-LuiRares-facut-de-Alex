# Alegerea modelului — 6 octombrie 2026

## Decizie

BodyParts3D 4.0, prin selecția de OBJ din `ssrpw2/brain-atlas`. A fost ales pentru anatomia reală, separarea pe structuri, proveniența documentată și licența permisivă. README-ul sursei intermediare descrie o selecție mai veche de 45 de fișiere; inventarul efectiv al commitului folosit conține mai multe. Această aplicație folosește **59**, nu numărul din README.

Licența a fost verificată la sursa oficială, nu dedusă dintr-un rezultat de căutare: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html. Pagina actualizată la 2025-02-27 anunță CC BY 4.0 și permite explicit redistribuirea și derivatele cu atribuire. Comentariile OBJ păstrează un anunț istoric CC BY-SA 2.1 Japan; această diferență este documentată în ATTRIBUTIONS.md.

## Ce există efectiv

Girusuri frontale superioare, mijlocii, inferioare și orbitale; girusuri precentrale și postcentrale; lobuli parietali superiori, girusuri supramarginale și angulare; girusuri temporale superioare, mijlocii și inferioare, fusiforme și parahipocampale; lobi occipitali; hipocampi, amigdale, talamus, hipotalamus; nuclei caudați, putamen și glob palid; corp calos; cerebel; mezencefal, punte și bulb. Insula și girusurile cingulate sunt păstrate ca repere vizuale de context, fără fișe independente.

`src/data/mesh-manifest.json` păstrează grupurile, iar `docs/model-manifest.json` enumeră toate mesh-urile și numerele de triunghiuri. Mesh-urile stânga/dreapta rămân distincte; selecția didactică poate evidenția ambele.

## Limite vizibile în interfață

- Cortex prefrontal: girusuri frontale și orbitale mai largi, fără granița prefrontală exactă.
- Cortex motor/somatosenzorial: repere precentral/postcentral, fără hărți funcționale fine.
- Cortex auditiv: mesh-uri temporale superioare; nu se afirmă că întreaga regiune este cortex auditiv primar.
- V1: lob occipital întreg.
- Nuclei geniculați: talamus întreg.
- Nucleu accumbens: grupul ganglionilor bazali ca reper aproximativ; caudatul/putamenul/palidul nu sunt etichetate ca accumbens.
- Aria tegmentală ventrală: trunchiul cerebral ca reper, cu mezencefalul existent în model.
- Cortex piriform și entorhinal: repere temporale largi.
- Retina, cohleea, receptorii periferici, nervii, măduva și mușchii nu fac parte din selecție; procesarea lor este explicată în text.
- Nu sunt desenate fibre inventate. Etapele au 1,5 secunde pentru explicație, nu reprezintă timpi fiziologici.
- Culorile nu sunt culori naturale; anatomia reflectă modelul de referință, nu variația dintre persoane.

## Conversie și performanță

`npm run prepare:model` descarcă numai fișierele necesare de la commitul fixat în `scripts/model-source.json`, păstrează cache local, centrează și rotește întregul ansamblu și scrie GLB-ul cu mesh-uri separate.

Rezultat: **6.688.428 bytes (~6,38 MiB), 59 mesh-uri, 276.786 triunghiuri**, fără texturi și fără decodare Draco externă. Acesta este sub ținta de 10–15 MB. Geometria sursă este deja simplificată; nu s-a adăugat o nouă decimare care să afecteze reperele anatomice.

Randare `frameloop="demand"`, DPR limitat la 1,5, fără umbre costisitoare, postprocesare sau animație permanentă. Materialele sunt reutilizate între selecții. OrbitControls invalidează scena numai când se mișcă; schimbările de selecție cer explicit un cadru. Redarea traseelor schimbă starea la 1,5 secunde. Preferința reduced-motion dezactivează pornirea automată și inerția camerei.

Referință tehnică: https://r3f.docs.pmnd.rs/advanced/scaling-performance.
