import type { NeuralPathway } from '../types/brain'
export const pathways: NeuralPathway[] = [
  {
    id: 'vision',
    name: 'Vedere',
    subtitle: 'De la lumină la percepție',
    type: 'anatomical',
    description:
      'Retina transformă lumina în activitate neuronală. Prin nervul optic și chiasmă, o mare parte a informației ajunge la nucleul geniculat lateral al talamusului și apoi la cortexul vizual. Retina și nervii optici nu sunt afișați în acest model.',
    psychology:
      'Percepția integrează formă, culoare și mișcare cu experiența și contextul. Fluxul ventral este asociat cu identificarea obiectelor, iar cel dorsal cu spațiul și acțiunea; aceasta este o simplificare, nu o separare absolută.',
    mainIdea: 'Creierul transformă stimularea senzorială în percepție.',
    steps: [
      {
        title: 'Talamus',
        regions: ['thalamus'],
        description:
          'După retină și nervul optic, nucleul geniculat lateral prelucrează semnalele vizuale. Este evidențiat talamusul întreg.',
      },
      {
        title: 'Cortex vizual primar',
        regions: ['visual'],
        description:
          'Informația ajunge la V1. Lobul occipital este folosit ca reper: V1 nu este delimitat separat.',
      },
      {
        title: 'Interpretarea scenei',
        regions: ['occipital', 'temporal', 'parietal'],
        description:
          'Arii vizuale de asociere cooperează pentru recunoaștere, spațiu și ghidarea acțiunii. Sunt evidențiați lobii care le conțin.',
      },
    ],
  },
  {
    id: 'hearing',
    name: 'Auz',
    subtitle: 'De la vibrație la semnificație',
    type: 'anatomical',
    description:
      'Celulele senzoriale din cohlee transformă vibrațiile în semnale nervoase. Acestea ajung prin nervul auditiv la relee din trunchiul cerebral, apoi la talamus și cortex. Cohleea și nervul nu sunt afișate.',
    psychology:
      'Auzul presupune interpretarea tiparelor, nu doar detectarea sunetului. Atenția, experiența și contextul susțin înțelegerea vorbirii și recunoașterea sunetelor.',
    mainIdea: 'A auzi un sunet și a-i înțelege sensul sunt procese legate, dar diferite.',
    steps: [
      {
        title: 'Relee în trunchiul cerebral',
        regions: ['brainstem'],
        description:
          'Nucleii cohleari și alte relee prelucrează informația; traseul include coliculul inferior din mezencefal. Gruparea ascunde relee multiple și proiecții bilaterale.',
      },
      {
        title: 'Talamus',
        regions: ['thalamus'],
        description:
          'Nucleul geniculat medial contribuie la releul către cortex. Modelul arată talamusul ca întreg.',
      },
      {
        title: 'Cortex auditiv',
        regions: ['auditory'],
        description:
          'Ariile temporale superioare analizează caracteristicile sonore. Limitele exacte ale cortexului auditiv nu sunt separate.',
      },
    ],
  },
  {
    id: 'touch',
    name: 'Atingere și propriocepție',
    subtitle: 'Cum îți simți corpul',
    type: 'anatomical',
    description:
      'Receptorii pielii, mușchilor și articulațiilor furnizează informații despre atingere și poziție. Exemplul urmărește simplificat sistemul coloanelor dorsale–lemniscului medial; nu descrie toate căile sensibilității. Receptorii și măduva nu sunt afișați.',
    psychology:
      'Schema corporală este construită prin integrarea informației tactile, proprioceptive și vizuale. Ea permite orientarea și ajustarea acțiunilor chiar fără a privi fiecare mișcare.',
    mainIdea: 'Percepția propriului corp este o integrare continuă a informației senzoriale.',
    steps: [
      {
        title: 'Trunchi cerebral',
        regions: ['brainstem'],
        description:
          'După ascensiunea prin măduvă, semnalele fac releu în bulb; majoritatea fibrelor acestei căi traversează linia mediană.',
      },
      {
        title: 'Talamus',
        regions: ['thalamus'],
        description: 'Releele talamice trimit informația către cortexul somatosenzorial.',
      },
      {
        title: 'Cortex somatosenzorial',
        regions: ['somatosensory'],
        description:
          'Girusul postcentral susține analiza caracteristicilor tactile și a informației despre corp.',
      },
      {
        title: 'Integrare parietală',
        regions: ['parietal'],
        description:
          'Ariile de asociere combină semnalele pentru reprezentarea corpului în spațiu.',
      },
    ],
  },
  {
    id: 'movement',
    name: 'Mișcare voluntară',
    subtitle: 'De la intenție la acțiune',
    type: 'functional-network',
    description:
      'Mișcarea implică planificare, selecție, comenzi descendente și feedback. Ganglionii bazali și cerebelul modulează acțiunea în bucle paralele; nu sunt stații succesive pe calea corticospinală. Ordinea de mai jos este didactică.',
    psychology:
      'Un scop devine comportament prin coordonarea atenției, selecției acțiunii și învățării motorii. Exersarea permite ajustări tot mai eficiente.',
    mainIdea: 'Scopurile devin acțiuni prin cooperarea mai multor sisteme.',
    steps: [
      {
        title: 'Scop și planificare',
        regions: ['prefrontal'],
        description:
          'Rețelele prefrontale mențin scopul; regiunile premotorii pregătesc mișcarea. Sunt evidențiate girusuri frontale mai largi.',
      },
      {
        title: 'Comandă motorie',
        regions: ['motor'],
        description: 'Cortexul motor contribuie la semnalele descendente ale căii corticospinale.',
      },
      {
        title: 'Selecție — buclă paralelă',
        regions: ['basal'],
        description:
          'Ganglionii bazali participă la selectarea și reglarea acțiunilor prin bucle cu cortexul și talamusul.',
      },
      {
        title: 'Corecție — buclă paralelă',
        regions: ['cerebellum'],
        description: 'Cerebelul contribuie la sincronizare, predicție și corectarea erorilor.',
      },
      {
        title: 'Către corp',
        regions: ['brainstem'],
        description:
          'Căile descendente trec prin trunchi și măduvă; neuronii motori activează mușchii. Măduva, fibrele și mușchii nu sunt reprezentați.',
      },
    ],
  },
  {
    id: 'smell',
    name: 'Miros',
    subtitle: 'O legătură cu emoția și memoria',
    type: 'anatomical',
    description:
      'După receptorii nazali și bulbul olfactiv, informația ajunge la cortexul olfactiv, inclusiv piriform, și la regiuni limbice. Modelul nu conține bulbul sau limitele cortexului piriform. Etapele evidențiază doar repere disponibile, nu întregul traseu.',
    psychology:
      'Un miros poate reactiva o experiență și starea afectivă asociată ei. Interacțiunile dintre cortex, amigdală și regiuni de memorie contribuie la acest efect.',
    mainIdea: 'Mirosurile pot lega percepția de experiențe personale.',
    steps: [
      {
        title: 'Procesare olfactivă',
        regions: ['temporal'],
        description:
          'Regiunile temporale sunt un reper larg pentru cortexul olfactiv; piriformul nu este delimitat și nu este echivalent cu tot lobul temporal.',
      },
      {
        title: 'Relevanță emoțională',
        regions: ['amygdala'],
        description:
          'Conexiunile olfactive cu amigdala contribuie la învățarea semnificației emoționale a mirosurilor.',
      },
      {
        title: 'Context și amintiri',
        regions: ['hippocampus'],
        description:
          'Regiunile entorhinale și hipocampale participă la asocierea mirosului cu experiențe; conexiunile nu formează un singur lanț.',
      },
      {
        title: 'Evaluare orbitofrontală',
        regions: ['prefrontal'],
        description:
          'Procesarea corticală contribuie la identificare și evaluare. Circuitele ulterioare pot implica talamusul; mirosul nu îl evită în toate etapele.',
      },
    ],
  },
  {
    id: 'threat',
    name: 'Răspuns la amenințare',
    subtitle: 'Stimul, context și reglare',
    type: 'functional-network',
    description:
      'Evaluarea unei posibile amenințări implică procese senzoriale, memorie, învățare și reglare corporală. Aceasta este o rețea funcțională cu activitate paralelă, nu un traseu liniar al fricii.',
    psychology:
      'Aceeași situație poate produce reacții diferite în funcție de experiență, context și interpretare. Amigdala contribuie la relevanța emoțională, iar hipocampul și cortexul prefrontal ajută la contextualizare și reglare.',
    mainIdea: 'Emoția depinde de interacțiunea dintre stimul, corp, memorie și evaluare.',
    steps: [
      {
        title: 'Procesare senzorială',
        regions: ['thalamus'],
        description:
          'Releele talamice și ariile corticale participă la procesarea informației. Nu este ilustrată o cale exclusivă către frică.',
      },
      {
        title: 'Semnificație emoțională',
        regions: ['amygdala'],
        description:
          'Amigdala contribuie la evaluarea relevanței și la asocierile învățate, fără a fi un unic „centru al fricii”.',
      },
      {
        title: 'Răspuns corporal',
        regions: ['hypothalamus', 'brainstem'],
        description:
          'Hipotalamusul și trunchiul cerebral participă la coordonarea unor răspunsuri autonome și endocrine.',
      },
      {
        title: 'Contextul experienței',
        regions: ['hippocampus'],
        description:
          'Hipocampul contribuie cu informații despre loc și context. Această contribuție are loc în interacțiune cu restul rețelei.',
      },
      {
        title: 'Interpretare și reglare',
        regions: ['prefrontal'],
        description:
          'Rețelele prefrontale participă la evaluare și reglare, în funcție de scop, context și experiență.',
      },
    ],
  },
  {
    id: 'memory',
    name: 'Memorie',
    subtitle: 'Cum se formează o amintire',
    type: 'functional-network',
    description:
      'Experiențele activează arii senzoriale și de asociere. Regiunile temporale mediale și hipocampul contribuie la formarea amintirilor episodice, în colaborare cu rețele corticale distribuite. Ordinea este explicativă, nu o cronologie măsurată.',
    psychology:
      'Memoria de lucru menține temporar informația; memoria episodică privește evenimente, cea semantică — cunoștințe, iar cea procedurală — deprinderi. Rememorarea este reconstructivă și poate fi influențată de context.',
    mainIdea: 'Amintirile sunt construite și reconstruite de rețele neuronale.',
    steps: [
      {
        title: 'Experiență și atenție',
        regions: ['parietal', 'occipital'],
        description:
          'Ariile senzoriale și de asociere reprezintă componente ale experienței. Aceste două regiuni sunt doar exemple.',
      },
      {
        title: 'Integrare temporală',
        regions: ['temporal'],
        description:
          'Regiunile temporale mediale, inclusiv cortexul entorhinal, comunică cu hipocampul; delimitarea exactă nu este disponibilă.',
      },
      {
        title: 'Legarea elementelor',
        regions: ['hippocampus'],
        description:
          'Hipocampul contribuie la asocierea elementelor unei experiențe într-o amintire episodică.',
      },
      {
        title: 'Organizare și recuperare',
        regions: ['prefrontal'],
        description:
          'Rețelele prefrontale contribuie la organizarea informației, memoria de lucru și căutarea strategică în memorie.',
      },
      {
        title: 'Rețele distribuite',
        regions: ['frontal', 'parietal', 'temporal', 'occipital'],
        description:
          'Consolidarea și rememorarea implică rețele corticale distribuite. Nu există un singur loc în care se păstrează întreaga amintire.',
      },
    ],
  },
  {
    id: 'reward',
    name: 'Recompensă și motivație',
    subtitle: 'Cum învățăm din rezultate',
    type: 'functional-network',
    description:
      'Circuitele mezolimbice și mezocorticale conectează regiuni din mezencefal, striat ventral și cortex prefrontal. Modelul nu separă aria tegmentală ventrală și nucleul accumbens: sunt evidențiate repere anatomice mai largi.',
    psychology:
      'Dopamina contribuie la învățare, anticipare și actualizarea așteptărilor. Nu este pur și simplu „substanța plăcerii”. Diferența dintre un rezultat anticipat și cel obținut poate schimba alegerile viitoare.',
    mainIdea: 'Consecințele unei acțiuni influențează învățarea și comportamentul viitor.',
    steps: [
      {
        title: 'Semnalizare în mezencefal',
        regions: ['brainstem'],
        description:
          'Aria tegmentală ventrală este o sursă importantă de proiecții dopaminergice. Trunchiul este doar un reper mai larg, nu localizarea exactă.',
      },
      {
        title: 'Învățare și selecție',
        regions: ['basal'],
        description:
          'Striatul ventral, inclusiv nucleul accumbens, participă la procese motivaționale. Grupul ganglionilor bazali este evidențiat ca aproximație.',
      },
      {
        title: 'Scopuri și evaluare',
        regions: ['prefrontal'],
        description:
          'Rețelele prefrontale contribuie la evaluarea opțiunilor și la raportarea recompenselor la scopuri.',
      },
      {
        title: 'Emoție și context',
        regions: ['amygdala', 'hippocampus'],
        description:
          'Amigdala și hipocampul interacționează cu această rețea, contribuind cu relevanță emoțională și informație contextuală.',
      },
    ],
  },
]
export const educationalNote =
  'Vizualizările sunt simplificate pentru scop educațional. Procesele reale implică rețele neuronale distribuite și conexiuni bidirecționale.'
