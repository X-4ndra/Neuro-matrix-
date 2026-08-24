const ROUTINE = [
  ["05:00","05:25","Morning Physical Activation","10m Calisthenics • 15m Pilates/Yoga"],
  ["05:25","05:40","Grooming, Dressing, and Hair","Get ready"],
  ["05:40","05:55","Breakfast Fuel & Korean Matrix Flashcards","Breakfast + Korean"],
  ["05:55","06:00","Lock-out pre-packed bag check","Bag • books • water"],
  ["06:00","07:30","Outbound Transit Bus","Transit"],
  ["07:30","15:30","Maarif International School Academics","Pure Math • Further Math • Biology • Chemistry • Physics"],
  ["15:30","16:30","Inbound Transit Bus","Return home"],
  ["16:30","17:30","Decompression Brain Break Reset","STRICTLY no study/screens"],
  ["17:30","19:00","Deep Syllabus Concept Study","Dynamic daily subject"],
  ["19:00","19:30","Family Dinner Break","Dinner"],
  ["19:30","20:30","Cameroon GCE A-Level Past Paper Sprint","60-minute timer"],
  ["20:30","21:00","Dual-Language Science Glossary Entry","English → French"],
  ["21:00","21:15","Next-day Logistics Lock-in Checklist","Prepare tomorrow"],
  ["21:15","22:00","Brain Wind-down Hour","Zero blue light"],
  ["22:00","23:59","Lights Out / Sleep Frame","Sleep"]
];

const SUBJECTS = [
  ["Pure Mathematics","Functions • Algebra • Calculus"],
  ["Further Mathematics","Advanced algebra • Complex numbers"],
  ["Physics","Mechanics • Waves • Electricity"],
  ["Chemistry","Atomic structure • Bonding • Reactions"],
  ["Biology","Cells • Genetics • Physiology"]
];

const QUIZZES = {
  "Pure Mathematics":[
    ["Differentiate x² + 3x.",["x²+3","2x","2x+3","3"],1],
    ["Solve 2x + 5 = 17.",["4","5","6","7"],2],
    ["The gradient of y = 3x + 4 is:",["3","4","7","1"],0],
    ["If f(x)=x², f(3) equals:",["6","9","12","27"],1]
  ],

  "Further Mathematics":[
    ["The determinant of [[a,b],[c,d]] is:",["ab-cd","ad-bc","ac-bd","a+b+c+d"],1],
    ["If z=3+4i, |z| is:",["4","5","7","25"],1],
    ["i² equals:",["1","-1","i","-i"],1],
    ["The real part of 5-7i is:",["5","-7","7","-5"],0]
  ],

  "Physics":[
    ["The SI unit of force is:",["Joule","Watt","Newton","Pascal"],2],
    ["Which is a kinematic equation?",["v=u+at","F=ma²","P=IV²","E=mc³"],0],
    ["Power is measured in:",["Joules","Watts","Newtons","Pascals"],1],
    ["Momentum is equal to:",["mv","ma","m/v","v/m"],0]
  ],

  "Chemistry":[
    ["The usual oxidation state of oxygen in oxides is:",["-1","-2","+1","+2"],1],
    ["Atomic number equals the number of:",["Neutrons","Electrons only","Protons","Nucleons"],2],
    ["A catalyst generally:",["Raises activation energy","Lowers activation energy","Changes equilibrium constant","Is permanently consumed"],1],
    ["The pH of a neutral solution at 25°C is approximately:",["0","5","7","14"],2]
  ],

  "Biology":[
    ["The organelle strongly associated with aerobic ATP production is:",["Ribosome","Nucleus","Mitochondrion","Golgi apparatus"],2],
    ["The basic functional cell of the nervous system is the:",["Nephron","Neuron","Alveolus","Osteon"],1],
    ["DNA is mainly located in the:",["Nucleus","Ribosome","Cell wall","Vacuole"],0],
    ["Gas exchange in the lungs occurs mainly at the:",["Bronchi","Alveoli","Trachea","Larynx"],1]
  ]
};

const NEURO_NOTES = [
  ["FOUNDATIONS","The Nervous System",
   "The nervous system coordinates communication between the body and its environment. It is commonly divided into the central nervous system and peripheral nervous system."],

  ["CELL BIOLOGY","Neurons & Glia",
   "Neurons are specialized cells involved in information signalling. Glial cells provide support, protection, metabolic assistance and other functions within nervous tissue."],

  ["PHYSIOLOGY","Action Potentials",
   "Neural electrical signalling involves changes in membrane potential caused by regulated movement of ions across the cell membrane."],

  ["PHYSIOLOGY","Synapses",
   "At chemical synapses, neurotransmitters released by a presynaptic neuron can influence a postsynaptic cell."],

  ["ANATOMY","Cerebral Lobes",
   "The frontal lobe contributes to motor control and executive functions. The parietal lobe integrates sensory information. The temporal lobe is important for hearing and memory, while the occipital lobe is strongly associated with visual processing."],

  ["ANATOMY","Brainstem",
   "The brainstem connects the brain with the spinal cord and contains pathways and nuclei involved in essential functions, arousal and cranial-nerve activity."],

  ["ANATOMY","Cerebellum",
   "The cerebellum contributes to balance, coordination, posture and motor learning."],

  ["ANATOMY","Meninges",
   "The central nervous system is surrounded by dura mater, arachnoid mater and pia mater."],

  ["CSF","Cerebrospinal Fluid",
   "CSF surrounds the brain and spinal cord and contributes to mechanical protection, buoyancy and maintenance of the CNS environment."],

  ["VASCULAR","Cerebral Blood Flow",
   "Neural tissue has high metabolic demands and requires continuous blood supply. Major arterial systems form interconnected circulation around the base of the brain."],

  ["PROTECTION","Blood-Brain Barrier",
   "The blood-brain barrier selectively regulates movement of many substances between blood and nervous tissue."],

  ["CLINICAL","Stroke",
   "Stroke involves brain injury caused by interruption of blood flow or bleeding. The affected brain region helps determine neurological effects."],

  ["CLINICAL","Brain Tumours",
   "Brain tumours are abnormal growths arising within or around nervous tissue. Classification considers cell type, location, molecular features and behaviour."],

  ["CAREER","Neurosurgery",
   "Neurosurgery is a medical specialty dealing with diagnosis and treatment of conditions involving the nervous system and related structures. Strong foundations in biology, chemistry, physics and mathematics support later medical education."]
];

const LANGUAGE_MATRIX = [
  ["Korean","저는 한국어를 못합니다.","Jeoneun hangugeoreul mothamnida.","떠들지 말고 내가 공부하게 해줘!"],
  ["Ewondo","Maa dzigi kobo ewondo.","Mah dzee-gee ko-bo eh-won-do.","Ligege na biekobo emien ma dzigi duli abum aval afab!"],
  ["Nda Nda","Nda' mbe nù mbò bbo bba.","Ndah mbeh noo mboh bboh bbah.","Gha pua nù, nzhé ngá nù nfa’ mbe."],
  ["French","Je ne parle pas français.","","Arrête de parler et laisse-moi travailler !"],
  ["Spanish","No hablo español.","","¡Deja de hablar y déjame trabajar!"],
  ["German","Ich spreche kein Deutsch.","","Hör auf zu reden und lass mich arbeiten!"],
  ["Italian","Non parlo italiano.","","Smettila di parlare e lasciami lavorare!"],
  ["Portuguese","Eu não falo português.","","Pare de falar e deixe-me trabalhar!"],
  ["Japanese","日本語が話せません。","Nihongo ga hanasemasen.","話さないで、勉強させて！"],
  ["Mandarin","我不会说中文。","Wǒ bú huì shuō Zhōngwén.","别说话，让我学习！"],
  ["Arabic","أنا لا أتحدث العربية.","Ana la atahaddath al-arabiya.","توقف عن الكلام ودعني أعمل!"],
  ["Russian","Я не говорю по-русски.","Ya ne govoryu po-russki.","Перестань говорить и дай мне работать!"],
  ["Dutch","Ik spreek geen Nederlands.","","Stop met praten en laat me werken!"],
  ["Turkish","Türkçe konuşamıyorum.","Türkçe konuşamıyorum.","Konuşmayı bırak ve çalışmama izin ver!"],
  ["Swahili","Sizungumzi Kiswahili.","","Acha kuzungumza na uniruhusu nifanye kazi!"],
  ["Lingala","Nakoloba Lingala te.","","Tika koloba mpe tika ngai nasala!"],
  ["English","I do not speak English.","","Stop talking and let me work!"],
  ["Latin","Latine non loquor.","","Noli loqui et sine me laborare!"],
  ["Bassa","Ma nyɔ̃ Bassa.","","Nɔ̃ɔ́l wáa, lɛ́ ma yé mɔ̀l!"],
  ["Fulfulde","Mi waawaa Fulfulde.","","Dekkum haala, acca mi waɗa golle!"],
  ["Korean Formal","한국어를 할 줄 모릅니다.","Hangugeoreul hal jul moreumnida.","말하지 말고 공부하게 해 주세요!"]
];
