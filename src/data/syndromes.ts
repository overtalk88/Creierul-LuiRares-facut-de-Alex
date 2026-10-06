import meshes from './mesh-manifest.json'
import type { BrainSyndrome } from '../types/brain'

// The patient's left lies on +X in the prepared model. Hemisphere labels follow the FMA
// concepts BodyParts3D 4.0 assigns to each element file (partof_element_parts.txt).
const left = {
  inferiorFrontal: 'inferior_frontal_gyrus_FJ1744',
  insula: 'insula_FJ1748',
  posteriorSuperiorTemporal: 'superior_temporal_gyrus_FJ1839',
  fusiform: 'fusiform_gyrus_FJ1783',
}
const right = {
  supramarginal: 'supramarginal_gyrus_FJ1842',
  angular: 'angular_gyrus_FJ1733',
  posteriorSuperiorTemporal: 'superior_temporal_gyrus_FJ1840',
  fusiform: 'fusiform_gyrus_FJ1784',
}
const striatum = meshes.basal.filter((name) => !name.startsWith('globus_pallidus'))
const pons = meshes.brainstem.filter((name) => name.startsWith('pons'))
const midbrain = meshes.brainstem.filter((name) => name.startsWith('midbrain'))
const pubmed = (id: string) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`
const aphasiaPage = {
  title: 'NIDCD (NIH) — Aphasia',
  url: 'https://www.nidcd.nih.gov/health/aphasia',
}
const strokeAphasia = {
  title: 'Berthier (2005) — Poststroke aphasia: epidemiology, pathophysiology and treatment',
  url: pubmed('15733022'),
}

export const syndromeNotice =
  'Descriere educațională generală. Manifestările diferă de la o persoană la alta, iar diagnosticul și tratamentul țin de specialiști.'

export const syndromes: BrainSyndrome[] = [
  {
    id: 'broca',
    name: 'Afazia Broca',
    aka: 'Afazie nonfluentă, de expresie',
    domain: 'Limbaj',
    site: 'Limbaj · lobul frontal stâng',
    regions: ['frontal', 'motor'],
    focus: [left.inferiorFrontal],
    context: [left.insula],
    view: [5, 1, 2.6],
    summary:
      'Tulburare dobândită a limbajului în care vorbirea devine rară, lentă și cu efort, în propoziții scurte din care lipsesc adesea cuvintele de legătură. Înțelegerea conversației obișnuite este relativ păstrată, iar persoana își dă de obicei seama de dificultăți, ceea ce poate produce frustrare.',
    causes:
      'cel mai frecvent un AVC în teritoriul arterei cerebrale medii stângi; mai rar traumatisme, tumori sau boli neurodegenerative.',
    facts: [
      { value: '21–38%', label: 'dintre pacienții cu AVC acut au o formă de afazie' },
      {
        value: '96%',
        label: 'dintre dreptaci au vorbirea controlată de emisfera stângă; la stângaci, circa 70%',
      },
      { value: '1861', label: 'Broca descrie cazul Leborgne, pacientul „Tan”' },
    ],
    anatomy:
      'Leziunea clasică include partea posterioară a girusului frontal inferior stâng (aria Broca), situată chiar în fața zonei motorii care controlează fața, limba și laringele. O leziune limitată la această arie produce de obicei dificultăți mai ușoare și trecătoare. Afazia persistentă apare când leziunea se extinde spre insulă, substanța albă de sub cortex și ganglionii bazali.',
    signs: [
      'Vorbire cu efort, lentă, cu pauze și greșeli de articulare.',
      'Agramatism: lipsesc prepozițiile, conjuncțiile și terminațiile („Eu… magazin… pâine”).',
      'Dificultăți la repetarea frazelor și la găsirea cuvintelor.',
      'Înțelegere bună în conversație, dar dificilă la fraze complexe („Câinele a fost mușcat de pisică”).',
      'Frecvent, slăbiciune a mâinii și feței drepte, pentru că zona motorie vecină este și ea afectată.',
    ],
    psychology:
      'Afazia Broca arată că a ști ce vrei să spui și a transforma intenția în cuvinte organizate gramatical sunt procese care se pot separa. Gândirea și inteligența nu dispar odată cu fluența: multe persoane comunică prin gesturi, desen sau scris. Cazul a deschis studiul localizării funcțiilor și al lateralizării: la majoritatea oamenilor, emisfera stângă este dominantă pentru limbaj. Astăzi, limbajul este descris ca o rețea în care aria Broca lucrează cu ariile temporale prin fascicule de substanță albă.',
    insight: 'A avea un gând și a-l putea rosti depind de sisteme parțial diferite.',
    history: {
      year: '1861',
      text: 'Paul Broca examinează creierul lui Louis Victor Leborgne, un pacient care putea rosti aproape doar silaba „tan”, și găsește o leziune în lobul frontal stâng. În 2007, creierul păstrat a fost scanat prin rezonanță magnetică: leziunea se întindea mult mai adânc decât putuse vedea Broca pe suprafață, inclusiv spre insulă și substanța albă.',
    },
    note: 'Este evidențiat girusul frontal inferior stâng, din care aria Broca ocupă doar partea posterioară. Insula stângă, în albastru deschis, marchează extinderea în profunzime.',
    sources: [
      {
        title:
          'Dronkers et al. (2007) — Paul Broca’s historic cases: MR imaging of Leborgne and Lelong',
        url: pubmed('17405763'),
      },
      strokeAphasia,
      {
        title: 'Rasmussen & Milner (1977) — Lateralization of cerebral speech functions',
        url: pubmed('101116'),
      },
      {
        title: 'Mohr et al. (1978) — Broca aphasia: pathologic and clinical',
        url: pubmed('565019'),
      },
    ],
  },
  {
    id: 'wernicke',
    name: 'Afazia Wernicke',
    aka: 'Afazie fluentă, de recepție',
    domain: 'Limbaj',
    site: 'Limbaj · lobul temporal stâng',
    regions: ['auditory', 'temporal'],
    focus: [left.posteriorSuperiorTemporal],
    view: [5.2, 1.2, -0.6],
    summary:
      'Tulburare dobândită a limbajului în care vorbirea rămâne fluentă, cu ritm și intonație normale, dar conținutul devine greu de urmărit: cuvintele sunt înlocuite, deformate sau inventate. Înțelegerea limbajului vorbit și scris este afectată, iar persoana poate să nu observe propriile erori.',
    causes:
      'de obicei un AVC în ramurile posterioare ale arterei cerebrale medii stângi; mai rar traumatisme, tumori sau infecții.',
    facts: [
      { value: '1874', label: 'Carl Wernicke, la 26 de ani, descrie afazia „senzorială”' },
      {
        value: '21–38%',
        label: 'dintre pacienții cu AVC acut au afazie; tipul ei depinde de locul leziunii',
      },
    ],
    anatomy:
      'Leziunea clasică privește partea posterioară a girusului temporal superior stâng (aria Wernicke), lângă cortexul auditiv. Studiile moderne arată că înțelegerea cuvintelor depinde și de girusul temporal mijlociu și de regiunile temporo-parietale. Aria Wernicke este mai degrabă un nod al unei rețele decât un „centru al înțelegerii”.',
    signs: [
      'Vorbire fluentă, dar cu sens redus; în formele severe, „salată de cuvinte”.',
      'Parafazii: cuvinte înlocuite („masă” în loc de „scaun”) sau cu sunete schimbate.',
      'Neologisme: cuvinte inventate, folosite ca și cum ar fi obișnuite.',
      'Înțelegere afectată a întrebărilor și instrucțiunilor.',
      'Conștientizare redusă a tulburării: persoana nu realizează de ce nu este înțeleasă.',
    ],
    psychology:
      'Afazia Wernicke separă forma vorbirii de sensul ei: gramatica, ritmul și intonația pot funcționa automat chiar când legătura cu semnificația este perturbată. Faptul că erorile trec neobservate arată că monitorizarea propriei vorbiri folosește aceleași sisteme care înțeleg vorbirea celorlalți. Pusă alături de afazia Broca, oferă un exemplu clasic de dublă disociere: o leziune afectează mai ales producerea, cealaltă mai ales înțelegerea.',
    insight: 'Vorbirea poate rămâne fluentă chiar când legătura cu sensul este afectată.',
    history: {
      year: '1874',
      text: 'Carl Wernicke descrie pacienți care vorbeau fluent, dar nu înțelegeau limbajul, și propune un model în care ariile limbajului sunt conectate prin fibre. Completat de Ludwig Lichtheim în 1885, modelul a influențat neuropsihologia limbajului mai bine de un secol.',
    },
    note: 'Este evidențiată partea posterioară a girusului temporal superior stâng, separată în model de partea anterioară. Limitele ariei Wernicke diferă între autori.',
    pathway: 'hearing',
    sources: [strokeAphasia, aphasiaPage],
  },
  {
    id: 'amnesia',
    name: 'Sindromul amnezic',
    aka: 'Amnezie de tip hipocampic',
    domain: 'Memorie',
    site: 'Memorie · lobul temporal medial',
    regions: ['hippocampus', 'amygdala', 'temporal'],
    focus: meshes.hippocampus,
    context: meshes.amygdala,
    view: [4.6, 0.6, 3.4],
    summary:
      'Pierdere severă și selectivă a capacității de a forma amintiri noi despre evenimente și fapte (amnezie anterogradă), adesea împreună cu pierderea unor amintiri din perioada dinaintea leziunii (amnezie retrogradă). Inteligența, limbajul, atenția de moment și deprinderile rămân în mare parte intacte.',
    causes:
      'leziuni bilaterale ale lobului temporal medial: encefalită herpetică, lipsă de oxigen după stop cardiac, AVC, intervenții chirurgicale; o formă progresivă apare în boala Alzheimer.',
    facts: [
      { value: '1953', label: 'H.M. este operat la 27 de ani pentru o epilepsie severă' },
      { value: '50+ ani', label: 'de studii cu H.M., până la moartea sa, în 2008' },
      {
        value: '2.401',
        label: 'secțiuni histologice prin creierul lui H.M., cartografiate digital',
      },
    ],
    anatomy:
      'Regiunile critice sunt hipocampii și cortexul din jur (entorinal, peririnal, parahipocampal), de ambele părți. La H.M. au fost îndepărtate bilateral porțiunea anterioară a hipocampului, cea mai mare parte a amigdalei și cortexul entorinal. O leziune unilaterală produce de obicei deficite mai ușoare, legate de tipul de material: verbal după leziuni stângi, vizual-spațial după leziuni drepte.',
    signs: [
      'Uită conversații și evenimente la câteva minute după ce s-au încheiat.',
      'Poate repeta imediat un șir de cifre: memoria de lucru este păstrată.',
      'Învață deprinderi noi, precum desenul în oglindă, fără să-și amintească antrenamentul.',
      'Amintirile vechi și cunoștințele generale sunt mai bine păstrate decât cele recente.',
      'Dezorientare în timp și în locuri noi.',
    ],
    psychology:
      'Cazul H.M. a arătat că memoria nu este un singur sistem. Memoria declarativă (evenimente și fapte) depinde de lobul temporal medial, în timp ce memoria procedurală și primingul folosesc alte circuite, precum ganglionii bazali, cerebelul și cortexul. A mai arătat că memoria de lucru și stocarea de lungă durată sunt separabile, iar hipocampul este esențial pentru consolidare, adică transformarea experiențelor noi în amintiri stabile. Personalitatea lui H.M. a rămas recognoscibilă, deși nu mai putea adăuga capitole noi poveștii propriei vieți.',
    insight: 'Memoria este o familie de sisteme, nu un singur depozit.',
    history: {
      year: '1953',
      text: 'Chirurgul William Scoville îndepărtează structuri temporale mediale din ambele emisfere ale lui Henry Molaison (H.M.) pentru a-i trata epilepsia. Crizele se reduc, dar H.M. nu mai poate forma amintiri declarative noi. Brenda Milner descrie cazul în 1957, iar cercetările continuă până la moartea lui, în 2008. Creierul său a fost apoi secționat în 2.401 felii și reconstruit digital.',
    },
    note: 'Sunt evidențiați ambii hipocampi; amigdalele apar în albastru deschis. Cortexurile entorinal și peririnal nu sunt delimitate separat în model.',
    pathway: 'memory',
    sources: [
      {
        title:
          'Scoville & Milner (1957) — Loss of recent memory after bilateral hippocampal lesions',
        url: pubmed('13406589'),
      },
      {
        title: 'Annese et al. (2014) — Postmortem examination of patient H.M.’s brain',
        url: pubmed('24473151'),
      },
    ],
  },
  {
    id: 'korsakoff',
    name: 'Sindromul Korsakoff',
    aka: 'Amnezie prin deficit de tiamină (vitamina B1)',
    domain: 'Memorie',
    site: 'Memorie · talamus și corpi mamilari',
    regions: ['thalamus', 'hypothalamus'],
    focus: [...meshes.thalamus, ...meshes.hypothalamus],
    view: [4.2, 1.2, 4],
    summary:
      'Tulburare cronică de memorie cauzată de lipsa tiaminei (vitamina B1). Apare adesea după encefalopatia Wernicke, faza acută, atunci când aceasta nu este tratată la timp. Persoana reține foarte greu informații noi și poate umple golurile de memorie cu confabulații. Faza acută este o urgență medicală: tiamina administrată devreme poate preveni leziunile permanente.',
    causes:
      'consum cronic de alcool asociat cu alimentație deficitară, dar și vărsături persistente, chirurgie bariatrică, malnutriție sau unele boli oncologice.',
    facts: [
      {
        value: '80%',
        label: 'dintre cazurile confirmate la autopsie nu fuseseră diagnosticate în timpul vieții',
      },
      {
        value: '16%',
        label: 'aveau triada clasică: confuzie, mers instabil, tulburări ale mișcărilor oculare',
      },
      { value: '1887', label: 'Serghei Korsakoff descrie sindromul' },
    ],
    anatomy:
      'Fără tiamină, neuronii nu își mai pot susține metabolismul energetic. Cele mai vulnerabile sunt structurile din jurul ventriculilor al treilea și al patrulea. Leziunile caracteristice apar în corpii mamilari, parte a hipotalamusului, și în nucleii anteriori și mediodorsali ai talamusului. Aceste structuri fac parte din circuitul care leagă hipocampul de talamus și de cortexul cingular. Conexiunile cu lobul frontal sunt și ele frecvent afectate.',
    signs: [
      'Amnezie anterogradă severă: informațiile noi se pierd rapid.',
      'Amnezie retrogradă cu gradient: amintirile mai vechi sunt mai bine păstrate.',
      'Confabulații: amintiri inexacte sau inventate, spuse cu convingere, fără intenția de a minți.',
      'Apatie, inițiativă redusă și conștientizare slabă a propriei tulburări.',
      'Deprinderile și memoria procedurală rămân în mare parte funcționale.',
    ],
    psychology:
      'Sindromul Korsakoff arată că memoria depinde de un circuit, nu doar de hipocamp: o leziune în talamus sau în corpii mamilari poate produce o amnezie asemănătoare. Confabulația evidențiază caracterul reconstructiv al amintirii: creierul completează golurile cu informații plauzibile, iar sentimentul de certitudine nu garantează exactitatea. Este și un exemplu clar de legătură între biochimie, alimentație, comportament și cogniție.',
    insight: 'O amintire trăită ca sigură poate fi o reconstrucție a creierului.',
    history: {
      year: '1887',
      text: 'Psihiatrul rus Serghei Korsakoff descrie pacienți cu consum cronic de alcool care nu rețineau evenimentele recente, dar își păstrau cunoștințele vechi. Carl Wernicke descrisese faza acută în 1881. Legătura cu deficitul de tiamină a fost stabilită abia în secolul XX.',
    },
    note: 'Corpii mamilari sunt incluși în mesh-ul hipotalamusului, iar nucleii talamici nu sunt separați: sunt evidențiate talamusul și hipotalamusul întregi.',
    pathway: 'memory',
    sources: [
      {
        title: 'Harper et al. (1986) — Clinical signs in the Wernicke-Korsakoff complex: 131 cases',
        url: pubmed('3701343'),
      },
      {
        title:
          'Kopelman et al. (2009) — The Korsakoff syndrome: clinical aspects, psychology and treatment',
        url: pubmed('19151162'),
      },
    ],
  },
  {
    id: 'frontal',
    name: 'Sindromul frontal',
    aka: 'Sindrom disexecutiv',
    domain: 'Funcții executive',
    site: 'Control și decizie · cortex prefrontal',
    regions: ['prefrontal', 'frontal'],
    focus: meshes.frontal,
    view: [2.4, 1.8, 5.2],
    summary:
      'Ansamblu de modificări ale planificării, autocontrolului și comportamentului social, apărute după leziuni ale cortexului prefrontal. Memoria, limbajul și inteligența măsurată la teste pot părea normale, dar organizarea vieții de zi cu zi devine dificilă.',
    causes:
      'traumatisme cranio-cerebrale, AVC, tumori, demența frontotemporală și alte boli neurodegenerative.',
    facts: [
      { value: '1848', label: 'accidentul lui Phineas Gage, în Vermont' },
      { value: '6 kg', label: 'și 1,1 m: bara de fier care i-a traversat craniul' },
      {
        value: '>10%',
        label: 'din substanța albă a fost afectată, estimează o reconstrucție din 2012',
      },
    ],
    anatomy:
      'Cortexul prefrontal are subdiviziuni cu roluri diferite. Regiunile dorsolaterale susțin memoria de lucru, planificarea și flexibilitatea. Cortexul orbitofrontal și cel ventromedial leagă deciziile de emoții și de consecințele sociale. Regiunile mediale susțin inițiativa și motivația. Contează și conexiunile: lobul frontal comunică prin fascicule de substanță albă cu aproape tot restul creierului.',
    signs: [
      'Dificultăți de planificare: sarcinile cu mai mulți pași rămân neterminate.',
      'Perseverare: aceeași strategie este repetată chiar după ce nu mai funcționează.',
      'Impulsivitate, comportament social nepotrivit, decizii riscante.',
      'Apatie și lipsă de inițiativă, mai ales după leziuni mediale.',
      'Rezultate bune la teste structurate, dar dificultăți în situații reale, nestructurate.',
    ],
    psychology:
      'Sindromul frontal arată că funcțiile executive diferă de cunoștințe: poți ști regulile și totuși să nu le aplici. Pacienții cu leziuni ventromediale studiați de Antonio Damasio puteau raționa corect despre opțiuni, dar luau decizii dezavantajoase în viața reală. De aici ipoteza markerilor somatici: semnalele emoționale ale corpului ghidează alegerile. Personalitatea, autocontrolul și judecata au deci și o bază biologică, modelată însă de mediu și de recuperare.',
    insight: 'A ști ce este potrivit și a acționa în consecință depind de sisteme diferite.',
    history: {
      year: '1848',
      text: 'O explozie accidentală trimite o bară de fier prin obrazul stâng și prin partea de sus a craniului lui Phineas Gage. Supraviețuiește, iar medicul John Harlow notează în 1868 că, pentru prieteni, Gage „nu mai era Gage”. Cercetări istorice ulterioare arată că Gage a lucrat apoi ani buni ca vizitiu de diligență în Chile, deci s-a readaptat parțial; schimbarea lui este adesea exagerată în manuale.',
    },
    note: 'Este evidențiată regiunea prefrontală din ambele emisfere (girusurile frontale superior, mijlociu, inferior și orbital). Reconstrucțiile recente indică la Gage o leziune predominant în lobul frontal stâng.',
    pathway: 'reward',
    sources: [
      {
        title: 'Damasio et al. (1994) — The return of Phineas Gage',
        url: pubmed('8178168'),
      },
      {
        title: 'Van Horn et al. (2012) — Mapping connectivity damage in the case of Phineas Gage',
        url: pubmed('22616011'),
      },
    ],
  },
  {
    id: 'neglect',
    name: 'Neglijarea spațială unilaterală',
    aka: 'Hemineglijență',
    domain: 'Atenție',
    site: 'Atenție · lobul parietal drept',
    regions: ['parietal'],
    focus: [right.supramarginal, right.angular],
    context: [right.posteriorSuperiorTemporal],
    view: [-4.6, 2.6, -2.4],
    summary:
      'Persoana nu observă, nu explorează și nu răspunde la ce se află într-o jumătate a spațiului, de obicei cea stângă, deși vederea poate fi intactă. Nu este o problemă a ochilor, ci a atenției și a reprezentării spațiului.',
    causes: 'cel mai frecvent un AVC în emisfera dreaptă; mai rar tumori sau traumatisme.',
    facts: [
      {
        value: '43%',
        label:
          'dintre pacienții cu AVC în emisfera dreaptă au neglijare în faza acută (20% la stânga)',
      },
      { value: '17%', label: 'o au încă la 3 luni după leziuni drepte (5% după leziuni stângi)' },
      { value: '1978', label: 'neglijarea este descrisă și în imaginile mentale' },
    ],
    anatomy:
      'Neglijarea apare cel mai des după leziuni ale joncțiunii temporo-parietale și ale lobulului parietal inferior drept (girusurile supramarginal și angular), dar și după leziuni frontale sau subcorticale. O explicație influentă: emisfera dreaptă orientează atenția spre ambele jumătăți ale spațiului, iar cea stângă mai ales spre dreapta. După o leziune dreaptă, atenția rămâne „trasă” spre dreapta. Contează și fasciculele de substanță albă dintre lobii parietal și frontal.',
    signs: [
      'Mănâncă doar din jumătatea dreaptă a farfuriei.',
      'Desenează doar jumătatea dreaptă a unui ceas sau a unei flori.',
      'Împarte o linie orizontală „la jumătate” mult spre dreapta.',
      'Se bărbierește sau se machiază doar pe o parte a feței.',
      'Frecvent nu își dă seama că ignoră o parte a lumii (anosognozie).',
    ],
    psychology:
      'Neglijarea arată că a vedea nu înseamnă a fi conștient: stimulii din partea neglijată pot fi procesați fără să ajungă în conștiință și pot influența totuși alegerile. În 1978, Bisiach și Luzzatti au arătat că tulburarea afectează și imaginile mentale. Pacienții își imaginau o piață cunoscută din Milano și omiteau clădirile din stânga. Când își imaginau piața privită din capătul opus, numeau clădirile omise înainte și le omiteau pe celelalte. Atenția structurează așadar și reprezentările din memorie, nu doar percepția.',
    insight: 'Atenția decide ce parte a lumii devine experiență conștientă.',
    history: {
      year: '1978',
      text: 'Edoardo Bisiach și Claudio Luzzatti le cer la doi pacienți să descrie din memorie Piazza del Duomo din Milano. Detaliile din stânga imaginii mentale lipsesc, indiferent de punctul de vedere imaginat. Studiul a arătat că neglijarea privește reprezentarea spațiului, nu doar vederea.',
    },
    note: 'Sunt evidențiate girusurile supramarginal și angular din dreapta (lobulul parietal inferior). Partea posterioară a girusului temporal superior drept, în albastru deschis, marchează joncțiunea temporo-parietală.',
    pathway: 'vision',
    sources: [
      {
        title: 'Ringman et al. (2004) — Frequency and course of unilateral neglect after stroke',
        url: pubmed('15304577'),
      },
      {
        title: 'Bisiach & Luzzatti (1978) — Unilateral neglect of representational space',
        url: pubmed('16295118'),
      },
      {
        title: 'Corbetta & Shulman (2011) — Spatial neglect and attention networks',
        url: pubmed('21692662'),
      },
    ],
  },
  {
    id: 'prosopagnosia',
    name: 'Prosopagnozia',
    aka: 'Agnozie pentru fețe',
    domain: 'Percepție',
    site: 'Percepție · girusul fusiform',
    regions: ['temporal', 'occipital'],
    focus: [right.fusiform],
    context: [left.fusiform],
    view: [-4.8, -2.6, 1.6],
    summary:
      'Dificultate de a recunoaște fețele cunoscute, uneori chiar și propria față în fotografii, deși vederea, inteligența și memoria sunt în general păstrate. Persoana vede ochii, nasul și gura, dar nu poate lega fața de identitatea cuiva.',
    causes:
      'forma dobândită apare după AVC, traumatisme sau encefalite în regiunea occipito-temporală; forma de dezvoltare este prezentă de la naștere, fără o leziune vizibilă, și apare adesea în aceeași familie.',
    facts: [
      {
        value: '2,5%',
        label: 'prevalența formei congenitale într-un studiu german (17 din 689 de participanți)',
      },
      { value: '1947', label: 'Joachim Bodamer introduce termenul „prosopagnozie”' },
      { value: '1997', label: 'este descrisă aria fusiformă pentru fețe' },
    ],
    anatomy:
      'Recunoașterea fețelor folosește o rețea de regiuni de pe fața inferioară a lobilor occipital și temporal. Un nod important este aria fusiformă pentru fețe, situată pe girusul fusiform, care răspunde mai puternic la fețe decât la alte obiecte. Prosopagnozia dobândită apare mai ales după leziuni bilaterale sau ale emisferei drepte.',
    signs: [
      'Nu recunoaște colegi, prieteni sau rude după față, mai ales în contexte neașteptate.',
      'Recunoaște persoanele după voce, mers, păr, haine sau context.',
      'Poate descrie trăsăturile unei fețe, dar nu o poate identifica.',
      'Urmărește greu personajele dintr-un film.',
      'Uneori are reacții fiziologice la fețe familiare, fără recunoaștere conștientă.',
    ],
    psychology:
      'Prosopagnozia arată că recunoașterea fețelor este un proces specializat: fețele sunt percepute mai degrabă ca întreg, nu ca listă de trăsături. Unii pacienți au o reacție electrodermală mai puternică la fețele familiare, deși spun că nu le cunosc. Această recunoaștere implicită arată că o parte a procesării are loc în afara conștiinței. Mulți oameni cu forma congenitală descoperă abia la maturitate că ceilalți recunosc fețele altfel, iar dificultatea poate fi confundată cu timiditatea sau lipsa de interes.',
    insight: 'A vedea o față și a ști cui aparține sunt etape diferite ale percepției.',
    history: {
      year: '1947',
      text: 'Psihiatrul german Joachim Bodamer descrie soldați răniți la cap care nu mai recunoșteau fețele și propune termenul „prosopagnozie”, din grecescul prosopon (față) și agnosia (necunoaștere). Neurologul Oliver Sacks a scris mai târziu despre propria prosopagnozie.',
    },
    note: 'Este evidențiat girusul fusiform drept, iar cel stâng apare în albastru deschis. Aria fusiformă pentru fețe ocupă doar o mică parte a girusului. Girusurile se văd pe fața inferioară a modelului.',
    pathway: 'vision',
    sources: [
      {
        title: 'Kanwisher et al. (1997) — The fusiform face area',
        url: pubmed('9151747'),
      },
      {
        title: 'Kennerknecht et al. (2006) — Prevalence of hereditary prosopagnosia',
        url: pubmed('16817175'),
      },
      {
        title: 'Bauer (1984) — Autonomic recognition of faces in prosopagnosia',
        url: pubmed('6483172'),
      },
    ],
  },
  {
    id: 'kluver-bucy',
    name: 'Sindromul Klüver–Bucy',
    domain: 'Emoție',
    site: 'Emoție · amigdală și lob temporal',
    regions: ['amygdala', 'temporal'],
    focus: meshes.amygdala,
    context: meshes.hippocampus,
    view: [4.4, 0.4, 4],
    summary:
      'Sindrom rar, apărut după leziuni bilaterale ale lobilor temporali anteriori, mai ales ale amigdalei. Reacțiile de frică și furie scad, obiectele sunt explorate cu gura, comportamentul alimentar și cel sexual se schimbă, iar semnificația obiectelor nu mai este recunoscută.',
    causes:
      'la om: encefalită herpetică, traumatisme, forme avansate ale bolii Alzheimer sau ale demenței frontotemporale, intervenții chirurgicale bilaterale.',
    facts: [
      { value: '1937', label: 'Klüver și Bucy prezintă primele observații la maimuțe rhesus' },
      { value: '6', label: 'grupe de simptome descrise de Klüver' },
      { value: '1955', label: 'primul caz uman descris, la un tânăr de 19 ani' },
    ],
    anatomy:
      'Sindromul complet apare de obicei doar după afectarea bilaterală a lobilor temporali anteriori: amigdala, hipocampul anterior și cortexul temporal din jur. Amigdala contribuie la evaluarea semnificației emoționale a stimulilor, iar cortexul temporal inferior la recunoașterea vizuală a obiectelor. Împreună răspund la întrebarea „ce este acesta și ce înseamnă pentru mine?”.',
    signs: [
      'Placiditate: reacții reduse de frică și furie, inclusiv față de pericole reale.',
      'Hiperoralitate: obiectele sunt explorate punându-le în gură.',
      '„Orbire psihică”: obiectele sunt văzute, dar semnificația lor nu este recunoscută.',
      'Hipermetamorfoză: atenția este atrasă compulsiv de fiecare stimul nou.',
      'Modificări ale comportamentului alimentar și sexual.',
    ],
    psychology:
      'Sindromul a arătat că emoția are baze anatomice identificabile și a orientat cercetarea spre amigdală. Pacienta S.M., cu leziuni ale ambelor amigdale cauzate de o boală genetică rară, nu manifesta frică la șerpi, păianjeni sau filme de groază. Totuși, amigdala nu este un „buton al fricii”: S.M. și alți pacienți asemănători au trăit atacuri de panică la inhalarea de dioxid de carbon, o amenințare internă. Emoțiile depind deci de mai multe căi, iar frica declanșată de mediu diferă de cea declanșată din interiorul corpului.',
    insight:
      'Recunoașterea unui obiect și înțelegerea importanței lui emoționale sunt procese distincte.',
    history: {
      year: '1937',
      text: 'Psihologul Heinrich Klüver și neurochirurgul Paul Bucy studiază maimuțe rhesus cărora li se îndepărtaseră lobii temporali din ambele emisfere. Animalele, înainte temătoare, se apropiau fără teamă de șerpi și de oameni și examinau totul cu gura. În 1955, Terzian și Dalle Ore descriu primul caz uman.',
    },
    note: 'Sunt evidențiate ambele amigdale, iar hipocampii apar în albastru deschis. Cortexul temporal anterior, afectat și el, rămâne estompat ca structurile profunde să fie vizibile.',
    pathway: 'threat',
    sources: [
      {
        title: 'Klüver & Bucy (1939) — Functions of the temporal lobes in monkeys (retipărire)',
        url: pubmed('9447506'),
      },
      {
        title:
          'Feinstein et al. (2011) — The human amygdala and the induction and experience of fear',
        url: pubmed('21167712'),
      },
      {
        title: 'Feinstein et al. (2013) — Fear and panic in humans with bilateral amygdala damage',
        url: pubmed('23377128'),
      },
    ],
  },
  {
    id: 'split-brain',
    name: 'Creierul divizat',
    aka: 'Sindrom de deconectare interemisferică',
    domain: 'Integrare',
    site: 'Comunicare între emisfere · corp calos',
    regions: ['callosum'],
    focus: meshes.callosum,
    view: [5.6, 1.6, 0.4],
    summary:
      'Apare după secționarea chirurgicală a corpului calos (calosotomie), o procedură folosită în epilepsia severă care nu răspunde la medicamente. În viața de zi cu zi, pacienții par aproape neschimbați. În teste care trimit informația unei singure emisfere, cele două jumătăți ale creierului par să lucreze independent.',
    causes:
      'calosotomie pentru epilepsie; mai rar, AVC sau tumori ale corpului calos. Persoanele născute fără corp calos au de obicei alte compensări.',
    facts: [
      { value: '~200 mil.', label: 'de fibre nervoase leagă emisferele prin corpul calos' },
      { value: '1962', label: 'apar primele observații la un pacient cu calosotomie' },
      { value: '1981', label: 'Roger Sperry primește Premiul Nobel pentru aceste studii' },
    ],
    anatomy:
      'Corpul calos este cel mai mare fascicul de substanță albă și leagă regiuni corespondente din cele două emisfere. Fiecare emisferă primește informația vizuală din câmpul vizual opus și controlează în principal mâna opusă. După secționare, un obiect arătat doar în câmpul vizual stâng ajunge doar la emisfera dreaptă și nu mai poate fi transmis emisferei stângi, care la majoritatea oamenilor produce vorbirea.',
    signs: [
      'Nu poate numi un obiect arătat doar în câmpul vizual stâng, dar îl poate alege cu mâna stângă.',
      'Nu poate compara stimuli prezentați separat celor două emisfere.',
      'Emisfera stângă inventează explicații pentru acțiuni inițiate de emisfera dreaptă.',
      'Rar și de obicei trecător: conflicte între mâini.',
      'În viața obișnuită, mișcările ochilor și ale capului trimit informația ambelor emisfere.',
    ],
    psychology:
      'Studiile pe creierul divizat arată cât de mult depinde experiența unitară de comunicarea dintre emisfere. Într-un experiment clasic, emisfera stângă a unui pacient vedea o gheară de pui, iar cea dreaptă un peisaj cu zăpadă. Mâna stângă a ales o lopată, iar pacientul a explicat imediat că lopata trebuie pentru curățatul cotețului. Michael Gazzaniga a numit acest mecanism „interpretorul” emisferei stângi: un sistem care construiește povești coerente chiar fără toate informațiile. Fenomenul ajută la înțelegerea raționalizării din viața de zi cu zi. Specializarea emisferelor nu înseamnă însă că oamenii ar fi „de emisferă stângă” sau „dreaptă”.',
    insight: 'Mintea construiește explicații coerente chiar și când nu are toate datele.',
    history: {
      year: '1962',
      text: 'Neurochirurgii Philip Vogel și Joseph Bogen secționează corpul calos la pacienți cu epilepsie severă. Roger Sperry și Michael Gazzaniga creează teste care trimit imagini unei singure emisfere și publică primele rezultate în 1962. Sperry primește Premiul Nobel pentru Fiziologie sau Medicină în 1981.',
    },
    note: 'Corpul calos apare ca o singură structură pe linia mediană. Alte comisuri mai mici, precum comisura anterioară, nu sunt incluse în model.',
    pathway: 'vision',
    sources: [
      {
        title:
          'Gazzaniga, Bogen & Sperry (1962) — Effects of sectioning the cerebral commissures in man',
        url: pubmed('13946939'),
      },
      {
        title: 'Gazzaniga (2005) — Forty-five years of split-brain research',
        url: pubmed('16062172'),
      },
      {
        title: 'Nobel Prize — Roger W. Sperry, 1981',
        url: 'https://www.nobelprize.org/prizes/medicine/1981/sperry/facts/',
      },
    ],
  },
  {
    id: 'parkinson',
    name: 'Boala Parkinson',
    aka: 'Sindrom parkinsonian',
    domain: 'Mișcare și motivație',
    site: 'Mișcare · substanța neagră și striatul',
    regions: ['brainstem', 'basal'],
    focus: midbrain,
    context: striatum,
    view: [4.6, 0.6, 3.4],
    summary:
      'Boală neurodegenerativă progresivă în care se pierd treptat neuronii dopaminergici din substanța neagră, o structură din mezencefal. Este cunoscută pentru tremor, rigiditate și încetinirea mișcărilor, dar afectează și dispoziția, motivația, somnul și gândirea.',
    causes:
      'cauza exactă nu este cunoscută; contribuie vârsta, factori genetici și de mediu. Simptome parkinsoniene pot apărea și din cauza unor medicamente sau a altor boli.',
    facts: [
      {
        value: '8,5 mil.',
        label: 'de oameni trăiau cu boala Parkinson în 2019; prevalența s-a dublat în 25 de ani',
      },
      {
        value: '35%',
        label: 'dintre pacienți au simptome depresive semnificative clinic',
      },
      { value: '1817', label: 'James Parkinson descrie „paralizia agitantă” la șase persoane' },
    ],
    anatomy:
      'Neuronii din partea compactă a substanței negre trimit dopamină spre striat (nucleul caudat și putamenul), parte a ganglionilor bazali. Lipsa dopaminei dezechilibrează buclele cortex – ganglioni bazali – talamus, care ajută la inițierea și selecția mișcărilor. Boala atinge și alte sisteme de neurotransmițători, ceea ce explică o parte din simptomele nemotorii.',
    signs: [
      'Bradikinezie: mișcări lente, greu de inițiat, scris mic, mimică redusă.',
      'Tremor de repaus, adesea pe o singură parte la debut.',
      'Rigiditate musculară; instabilitate posturală în stadii avansate.',
      'Simptome nemotorii: depresie, anxietate, apatie, tulburări de somn, pierderea mirosului.',
      'Uneori, gândire încetinită și dificultăți executive.',
    ],
    psychology:
      'Boala Parkinson arată că dopamina nu ține doar de mișcare: același sistem susține motivația, învățarea din recompense și inițiativa. Unii pacienți rămân „blocați” când încep să meargă, dar pășesc mai ușor peste linii trasate pe podea sau în ritmul muzicii: indiciile externe compensează dificultatea de inițiere. Medicamentele dopaminergice pot produce, la o parte dintre pacienți, comportamente impulsive, precum jocurile de noroc sau cumpărăturile compulsive. Este o dovadă directă a rolului dopaminei în recompensă și autocontrol.',
    insight: 'Același neurotransmițător influențează mișcarea, motivația și dispoziția.',
    history: {
      year: '1817',
      text: 'Medicul londonez James Parkinson publică „An Essay on the Shaking Palsy”, în care descrie șase persoane cu tremor și mișcări încetinite. În jurul anului 1960 s-a descoperit că striatul pacienților conține foarte puțină dopamină. Tratamentul cu levodopa, precursorul dopaminei, a schimbat apoi evoluția bolii.',
    },
    note: 'Substanța neagră nu este delimitată în model, așa că este evidențiat mezencefalul ca reper. Nucleul caudat și putamenul (striatul) apar în albastru deschis.',
    pathway: 'movement',
    sources: [
      {
        title: 'OMS — Parkinson disease (fact sheet)',
        url: 'https://www.who.int/news-room/fact-sheets/detail/parkinson-disease',
      },
      { title: 'Kalia & Lang (2015) — Parkinson’s disease', url: pubmed('25904081') },
      {
        title: 'Reijnders et al. (2008) — Prevalence of depression in Parkinson’s disease',
        url: pubmed('17987654'),
      },
    ],
  },
  {
    id: 'cerebellar',
    name: 'Sindromul cerebelos',
    aka: 'Ataxie și sindrom cognitiv-afectiv cerebelos',
    domain: 'Coordonare',
    site: 'Coordonare și predicție · cerebel',
    regions: ['cerebellum'],
    focus: meshes.cerebellum,
    view: [3.4, 0.6, -4.8],
    summary:
      'Ansamblu de semne apărute după leziuni ale cerebelului: mișcări necoordonate, mers instabil, vorbire sacadată. Cercetările din ultimele decenii au arătat că leziunile cerebelului pot afecta și gândirea și emoțiile, în sindromul cognitiv-afectiv cerebelos.',
    causes: 'AVC, tumori, scleroză multiplă, intoxicație cu alcool, ataxii ereditare, traumatisme.',
    facts: [
      {
        value: '~80%',
        label: 'dintre neuronii creierului sunt în cerebel (69 din 86 de miliarde)',
      },
      { value: '~10%', label: 'din masa creierului revine cerebelului' },
      { value: '1998', label: 'este descris sindromul cognitiv-afectiv, pe baza a 20 de pacienți' },
    ],
    anatomy:
      'Cerebelul compară permanent mișcarea intenționată cu cea realizată și corectează diferențele. Primește copii ale comenzilor motorii și informații senzoriale. Partea mediană contribuie la echilibru și postură, iar emisferele cerebeloase la coordonarea membrelor de aceeași parte a corpului. Prin bucle cu talamusul și cortexul prefrontal și parietal, regiunile posterioare participă și la procese cognitive și afective.',
    signs: [
      'Ataxie: mers instabil, cu picioarele depărtate.',
      'Dismetrie: degetul ratează ținta, depășind-o sau oprindu-se prea devreme.',
      'Tremor de intenție, care crește pe măsură ce mâna se apropie de țintă.',
      'Dizartrie: vorbire sacadată, cu ritm neregulat.',
      'În forma cognitiv-afectivă: dificultăți de planificare, de fluență verbală și vizuo-spațiale, emoții aplatizate sau dezinhibiție.',
    ],
    psychology:
      'Cerebelul funcționează ca un sistem de predicție: anticipează consecințele unei comenzi și ajustează rezultatul. Ipoteza „dismetriei gândirii”, propusă de Jeremy Schmahmann, spune că același tip de calcul se aplică ideilor și emoțiilor; după o leziune, ele pot deveni la fel de necalibrate ca mișcările. Predicția explică și de ce nu ne putem gâdila singuri: creierul anticipează senzația produsă de propria mișcare și o atenuează.',
    insight: 'Creierul anticipează consecințele acțiunilor și corectează diferențele.',
    history: {
      year: '1998',
      text: 'Jeremy Schmahmann și Janet Sherman descriu 20 de pacienți cu leziuni ale cerebelului care aveau, pe lângă tulburările de coordonare, dificultăți executive, vizuo-spațiale și de limbaj și modificări de personalitate. Studiul a contribuit la recunoașterea rolului cerebelului în cogniție.',
    },
    note: 'Partea mediană și emisferele cerebeloase nu sunt separate: este evidențiat cerebelul întreg.',
    pathway: 'movement',
    sources: [
      {
        title: 'Schmahmann & Sherman (1998) — The cerebellar cognitive affective syndrome',
        url: pubmed('9577385'),
      },
      {
        title: 'Azevedo et al. (2009) — Equal numbers of neuronal and nonneuronal cells',
        url: pubmed('19226510'),
      },
      {
        title: 'Blakemore, Wolpert & Frith (1998) — Central cancellation of self-produced tickle',
        url: pubmed('10196573'),
      },
    ],
  },
  {
    id: 'locked-in',
    name: 'Sindromul locked-in',
    aka: 'Sindromul „închis în propriul corp”',
    domain: 'Conștiință',
    site: 'Conștiință și mișcare · puntea',
    regions: ['brainstem'],
    focus: pons,
    view: [3.4, -1.2, 4.6],
    summary:
      'Persoana este conștientă, aude, vede și gândește, dar este aproape complet paralizată și nu poate vorbi. În forma clasică păstrează doar mișcările verticale ale ochilor și clipitul, prin care poate comunica folosind un cod.',
    causes:
      'cel mai frecvent un AVC prin blocarea arterei bazilare, care afectează partea anterioară a punții; mai rar traumatisme, tumori sau boli neuromusculare avansate.',
    facts: [
      {
        value: '72%',
        label: 'dintre cei 65 de pacienți cronici dintr-un studiu din 2011 s-au declarat fericiți',
      },
      {
        value: '2,5 luni',
        label: 'durează în medie până la diagnostic; uneori conștiința este recunoscută după ani',
      },
      {
        value: '200.000',
        label: 'de clipiri: efortul cu care Jean-Dominique Bauby a dictat o carte',
      },
    ],
    anatomy:
      'Prin partea anterioară a punții coboară căile motorii spre măduvă și spre nucleii nervilor cranieni. O leziune aici întrerupe comenzile pentru corp, față și vorbire. Formațiunea reticulată, situată mai posterior, menține starea de veghe, iar cortexul rămâne neafectat. Mișcările verticale ale ochilor sunt controlate de centri din mezencefal, deasupra leziunii, și de aceea se păstrează.',
    signs: [
      'Paralizia brațelor și picioarelor (tetraplegie).',
      'Imposibilitatea de a vorbi (anartrie), deși limbajul este intact.',
      'Conștiință, percepție și gândire păstrate.',
      'Mișcări verticale ale ochilor și clipit păstrate, folosite pentru comunicare.',
      'Risc de a fi confundat cu coma sau starea vegetativă.',
    ],
    psychology:
      'Sindromul locked-in separă conștiința de capacitatea de a o exprima. Arată limitele evaluării bazate doar pe comportament: lipsa răspunsului nu înseamnă lipsa conștiinței. În peste jumătate dintre cazuri, familia, nu medicul, observă prima că pacientul este conștient. Studiile de calitate a vieții contrazic așteptările celor din jur: majoritatea pacienților cronici se declară fericiți, iar adaptarea și sprijinul social contează mai mult decât ar prezice un observator. Interfețele creier–computer sunt dezvoltate pentru a le reda comunicarea.',
    insight: 'Lipsa mișcării nu înseamnă lipsa conștiinței.',
    history: {
      year: '1997',
      text: 'Jean-Dominique Bauby, redactor-șef al revistei Elle, rămâne cu sindrom locked-in după un AVC în 1995. Își dictează memoriile, „Scafandrul și fluturele”, clipind cu ochiul stâng în timp ce i se recită literele alfabetului. Cartea apare în 1997, cu două zile înainte de moartea sa. Termenul „locked-in” fusese introdus în 1966 de Fred Plum și Jerome Posner.',
    },
    note: 'Puntea este evidențiată în întregime; leziunea tipică afectează doar partea sa anterioară.',
    pathway: 'movement',
    sources: [
      {
        title: 'Bruno et al. (2011) — Self-assessed well-being in chronic locked-in syndrome',
        url: pubmed('22021735'),
      },
      {
        title:
          'Laureys et al. (2005) — The locked-in syndrome: what is it like to be conscious but paralyzed?',
        url: pubmed('16186044'),
      },
    ],
  },
]
