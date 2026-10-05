import type { BrainRegion } from '../types/brain'
export const brainRegions: BrainRegion[] = [
  {
    id: 'frontal',
    name: 'Lob frontal',
    category: 'Cortex cerebral',
    color: '#dfa18f',
    description:
      'Partea anterioară a emisferelor cerebrale, situată înaintea șanțului central. Include regiuni prefrontale, premotorii și motorii, care contribuie împreună la organizarea comportamentului.',
    functions: [
      'Planifică acțiuni, menține scopuri și contribuie la controlul mișcărilor voluntare.',
      'Participă la atenție, exprimarea limbajului și reglarea comportamentului în funcție de context.',
    ],
    psychology:
      'Când alegi să înveți înainte de a ieși cu prietenii, rețelele frontale ajută la compararea opțiunilor și menținerea scopului. Decizia rezultă din colaborarea lor cu memoria, emoția și sistemele senzoriale.',
  },
  {
    id: 'prefrontal',
    name: 'Cortex prefrontal',
    category: 'Control și decizie',
    color: '#dfa18f',
    description:
      'Ansamblu de regiuni din partea anterioară a lobului frontal, conectate cu arii senzoriale, limbice și motorii. Nu este o singură unitate cu o funcție unică.',
    functions: [
      'Susține memoria de lucru, planificarea și flexibilitatea cognitivă.',
      'Participă la evaluarea consecințelor, inhibarea unor răspunsuri și urmărirea unui scop.',
    ],
    psychology:
      'Te ajută să păstrezi în minte instrucțiunile unui exercițiu și să schimbi strategia când prima soluție nu funcționează. Autocontrolul depinde de aceste rețele, dar și de context, învățare și starea organismului.',
    note: 'Limitele prefrontale nu sunt separate în model. Sunt evidențiate girusuri frontale și orbitale mai largi, care includ și alte arii.',
  },
  {
    id: 'motor',
    name: 'Cortex motor primar',
    category: 'Mișcare',
    color: '#efbf80',
    description:
      'Regiune din girusul precentral, anterior șanțului central. Participă la controlul mișcărilor, cu o organizare aproximativă a diferitelor părți ale corpului.',
    functions: [
      'Contribuie la comenzile motorii descendente pentru mișcări voluntare, mai ales cele fine.',
      'Lucrează împreună cu ariile premotorii, ganglionii bazali, cerebelul și măduva spinării.',
    ],
    psychology:
      'Scrisul sau prinderea unui obiect transformă un scop în activitate musculară coordonată. Exersarea schimbă eficiența rețelelor motorii. Intenția și învățarea unei acțiuni nu pot fi atribuite exclusiv acestui cortex.',
    note: 'Girusul precentral este reperul geometric; limitele funcționale exacte nu sunt cartografiate.',
  },
  {
    id: 'parietal',
    name: 'Lob parietal',
    category: 'Cortex cerebral',
    color: '#b5c6a2',
    description:
      'Regiune situată posterior de șanțul central și deasupra lobului temporal. Include cortex somatosenzorial și arii de asociere care integrează informații din mai multe simțuri.',
    functions: [
      'Combină semnale despre atingere, poziția corpului și spațiul înconjurător.',
      'Contribuie la orientarea atenției și la coordonarea dintre vedere și acțiune.',
    ],
    psychology:
      'Când întinzi mâna după un pahar, creierul trebuie să combine locul obiectului cu poziția mâinii. Rețelele parietale contribuie la această integrare și la schema corporală, reprezentarea flexibilă a propriului corp în spațiu.',
  },
  {
    id: 'somatosensory',
    name: 'Cortex somatosenzorial',
    category: 'Atingere și corp',
    color: '#d5d299',
    description:
      'Cortexul somatosenzorial primar se află în girusul postcentral, imediat în spatele șanțului central. Primește informații despre corp prin relee talamice.',
    functions: [
      'Analizează proprietăți ale stimulilor tactili și contribuie la percepția poziției corpului.',
      'Păstrează o organizare somatotopică: anumite teritorii corticale corespund unor regiuni corporale.',
    ],
    psychology:
      'Îți permite să discriminezi caracteristicile unui obiect ținut în mână. Experiența corporală apare prin integrarea acestei activități cu atenția, vederea și ariile de asociere, nu prin citirea pasivă a unui singur semnal.',
    note: 'Este evidențiat girusul postcentral; subdiviziunile funcționale nu sunt separate.',
  },
  {
    id: 'temporal',
    name: 'Lob temporal',
    category: 'Cortex cerebral',
    color: '#baa9cf',
    description:
      'Regiune laterală și inferioară a emisferelor, sub șanțul lateral. Include arii auditive, de asociere și regiuni mediale implicate în memorie.',
    functions: [
      'Contribuie la analiza sunetelor, recunoașterea obiectelor și înțelegerea limbajului.',
      'Regiunile temporale mediale participă la formarea și organizarea unor tipuri de amintiri.',
    ],
    psychology:
      'Recunoașterea vocii unui prieten implică atât analiza sunetului, cât și cunoștințe și experiențe anterioare. Aceste procese ilustrează cooperarea dintre percepție, limbaj și memorie. Funcțiile sunt distribuite în subregiuni și rețele, nu identice în tot lobul.',
  },
  {
    id: 'auditory',
    name: 'Cortex auditiv',
    category: 'Auz',
    color: '#a999cb',
    description:
      'Arii corticale aflate în partea superioară a lobului temporal. Cortexul auditiv primar este situat în girusurile temporale transversale, pe suprafața ascunsă în șanțul lateral.',
    functions: [
      'Analizează caracteristici ale sunetului, inclusiv frecvența și organizarea temporală.',
      'Colaborează cu arii asociative în interpretarea vorbirii, muzicii și sunetelor din mediu.',
    ],
    psychology:
      'Același sunet poate fi interpretat diferit în funcție de atenție și context. Înțelegerea unei propoziții presupune mai mult decât detectarea vibrațiilor: experiența și anticiparea influențează percepția auditivă.',
    note: 'Sunt evidențiate mesh-urile temporale superioare. Cortexul auditiv primar nu are o delimitare funcțională separată.',
  },
  {
    id: 'hippocampus',
    name: 'Hipocamp',
    category: 'Memorie · structură profundă',
    color: '#e0bd75',
    deep: true,
    description:
      'Structură pereche din lobul temporal medial, conectată cu regiuni corticale prin care primește informații despre experiențe și context.',
    functions: [
      'Contribuie la formarea și organizarea noilor amintiri episodice.',
      'Susține memoria spațială și relațiile dintre elementele unei experiențe.',
    ],
    psychology:
      'O întâmplare este legată de locul, momentul și persoanele implicate. Hipocampul ajută la această asociere. În consolidare și rememorare colaborează cu rețele corticale distribuite; nu este un depozit unic pentru toate amintirile. Memoria de lucru și deprinderile implică și alte sisteme.',
  },
  {
    id: 'amygdala',
    name: 'Amigdală',
    category: 'Emoție · structură profundă',
    color: '#d38b98',
    deep: true,
    description:
      'Grup de nuclei din lobul temporal medial, situat anterior față de hipocamp. Are conexiuni cu cortexul, hipotalamusul și trunchiul cerebral.',
    functions: [
      'Contribuie la evaluarea relevanței emoționale și la învățarea asocierilor dintre stimuli și rezultate.',
      'Participă la orientarea atenției și la coordonarea unor răspunsuri în situații semnificative.',
    ],
    psychology:
      'Un stimul capătă semnificație prin experiență și context. Amigdala participă la învățarea emoțională atât în contexte aversive, cât și apetitive. Nu este pur și simplu „centrul fricii”; emoțiile rezultă din cooperarea mai multor sisteme.',
  },
  {
    id: 'occipital',
    name: 'Lob occipital',
    category: 'Cortex cerebral',
    color: '#92bbc9',
    description:
      'Porțiunea posterioară a emisferelor cerebrale, care conține cortexul vizual primar și alte arii implicate în analiza informației vizuale.',
    functions: [
      'Participă la prelucrarea contururilor, orientării și altor caracteristici ale imaginii.',
      'Schimbă informații cu regiuni temporale și parietale pentru recunoaștere și ghidarea acțiunii.',
    ],
    psychology:
      'Vederea este o construcție activă: interpretăm stimulii folosind regularități și experiențe. Iluziile vizuale arată că percepția nu este o copie fotografică a lumii. Funcțiile vizuale se extind dincolo de lobul occipital, în rețele larg conectate.',
  },
  {
    id: 'visual',
    name: 'Cortex vizual',
    category: 'Vedere',
    color: '#92bbc9',
    description:
      'Cortexul vizual primar este localizat în jurul șanțului calcarin, în lobul occipital. Primește o mare parte a informației vizuale prin nucleul geniculat lateral al talamusului.',
    functions: [
      'Analizează proprietăți elementare ale stimulilor vizuali.',
      'Participă la procesări recurente cu arii vizuale asociative, pentru interpretarea scenei.',
    ],
    psychology:
      'Recunoașterea unui obiect cere integrarea formei, culorii, mișcării și contextului. Distincția dintre senzație și percepție arată cum semnalele senzoriale sunt transformate în experiență și interpretare. Fluxurile vizuale pentru obiecte și acțiune cooperează permanent.',
    note: 'V1 nu este separat. Este evidențiat întregul lob occipital, fără a-l echivala cu V1.',
  },
  {
    id: 'thalamus',
    name: 'Talamus',
    category: 'Integrare · structură profundă',
    color: '#8fc8be',
    deep: true,
    description:
      'Ansamblu de nuclei din diencefal, situat de o parte și de alta a ventriculului al treilea. Fiecare grup de nuclei are conexiuni specifice.',
    functions: [
      'Participă la releul și integrarea multor semnale senzoriale și motorii.',
      'Susține comunicarea dintre regiuni corticale și contribuie la atenție și starea de veghe.',
    ],
    psychology:
      'Disponibilitatea informației senzoriale pentru prelucrarea corticală depinde și de circuitele talamice. Acestea nu funcționează ca un simplu cablu: sunt influențate de cortex și de starea organismului, contribuind la selecția și organizarea informației.',
    note: 'Nucleii geniculați lateral și medial sunt explicați în text; modelul evidențiază talamusul întreg.',
  },
  {
    id: 'hypothalamus',
    name: 'Hipotalamus',
    category: 'Homeostazie · structură profundă',
    color: '#d9a66e',
    deep: true,
    description:
      'Regiune mică a diencefalului, aflată sub talamus. Leagă activitatea nervoasă de reglarea hormonală și de numeroase funcții autonome.',
    functions: [
      'Contribuie la reglarea foamei, setei, temperaturii și ritmurilor biologice.',
      'Participă la controlul endocrin și la organizarea răspunsurilor fiziologice la stres.',
    ],
    psychology:
      'Motivația are și o dimensiune corporală: nevoia de apă poate orienta atenția și comportamentul. Hipotalamusul ilustrează legătura dintre nevoi, stări psihologice și răspunsuri fiziologice. Aceste relații implică bucle de reglare și colaborarea cu cortexul și sistemele limbice.',
  },
  {
    id: 'basal',
    name: 'Ganglionii bazali',
    category: 'Acțiune · structuri profunde',
    color: '#bea3c4',
    deep: true,
    description:
      'Grup de nuclei conectați în bucle cu cortexul și talamusul. Modelul include nucleul caudat, putamenul și globul palid.',
    functions: [
      'Participă la selecția acțiunilor, reglarea mișcării și învățarea deprinderilor.',
      'Circuitele asociate contribuie la învățarea din consecințe și la procese motivaționale.',
    ],
    psychology:
      'Repetarea și feedbackul pot transforma o acțiune într-o deprindere. Ganglionii bazali ajută la explicarea modului în care experiența influențează probabilitatea alegerii unui comportament. Circuitele motorii, cognitive și motivaționale au organizări parțial distincte.',
    note: 'Nucleul accumbens nu este separat; în circuitul recompensei este folosit grupul anatomic mai larg ca reper, nu ca localizare exactă.',
  },
  {
    id: 'callosum',
    name: 'Corp calos',
    category: 'Conexiuni · structură profundă',
    color: '#d9ccae',
    deep: true,
    description:
      'Fascicul major de substanță albă situat pe linia mediană, care conectează regiuni din cele două emisfere cerebrale.',
    functions: [
      'Permite schimbul de informații între numeroase arii corticale stângi și drepte.',
      'Contribuie la coordonarea procesărilor senzoriale, motorii și cognitive între emisfere.',
    ],
    psychology:
      'O activitate obișnuită, precum manipularea unui obiect cu ambele mâini, implică o cooperare extinsă. Corpul calos oferă un exemplu al infrastructurii acestei integrări. Specializarea parțială a emisferelor nu înseamnă că oamenii au personalități de tip „creier stâng” sau „creier drept”.',
  },
  {
    id: 'cerebellum',
    name: 'Cerebel',
    category: 'Coordonare și învățare',
    color: '#c2a38c',
    description:
      'Structură situată posterior de trunchiul cerebral și sub emisfere. Suprafața sa are numeroase pliuri fine, iar conexiunile sale formează circuite cu alte regiuni.',
    functions: [
      'Contribuie la coordonare, sincronizare și corectarea erorilor de mișcare.',
      'Participă la învățarea motorie și, prin circuite distincte, la unele procese cognitive.',
    ],
    psychology:
      'Când înveți să mergi pe bicicletă, compararea rezultatului cu așteptarea permite ajustarea comportamentului. Cerebelul contribuie la această adaptare și predicție. Nu produce singur intenția unei mișcări și nu este doar un sistem de echilibru.',
  },
  {
    id: 'brainstem',
    name: 'Trunchi cerebral',
    category: 'Reglare și comunicare',
    color: '#9ca9b5',
    description:
      'Cuprinde mezencefalul, puntea și bulbul rahidian. Conectează structurile superioare ale creierului cu măduva spinării și include nuclei ai nervilor cranieni.',
    functions: [
      'Participă la reglarea respirației, stării de veghe și altor funcții esențiale.',
      'Conține relee senzoriale și căi motorii ascendente și descendente.',
    ],
    psychology:
      'Atenția și comportamentul se desfășoară pe fondul unei stări de activare a organismului. Sistemele din trunchiul cerebral contribuie la acest fond și la comunicarea creier–corp. Diferitele sale componente au roluri distincte, chiar dacă sunt grupate vizual.',
    note: 'Mezencefalul, puntea și bulbul au mesh-uri distincte; nucleii mici și fibrele nu sunt reprezentați separat.',
  },
]
export const regionById = Object.fromEntries(brainRegions.map((r) => [r.id, r])) as Record<
  BrainRegion['id'],
  BrainRegion
>
