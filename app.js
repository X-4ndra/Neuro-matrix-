const STORE="NEURO_MATRIX_V4_";
const today=()=>new Date().toISOString().slice(0,10);

function get(key,fallback){
  try{
    const v=localStorage.getItem(STORE+key);
    return v===null?fallback:JSON.parse(v);
  }catch{return fallback}
}

function set(key,value){
  localStorage.setItem(STORE+key,JSON.stringify(value));
}

/* ---------- NAV ---------- */

function openTab(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  document.querySelector(`[data-tab="${id}"]`).classList.add("active");

  scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".tabs button").forEach(btn=>{
  btn.addEventListener("click",()=>openTab(btn.dataset.tab));
});


/* ---------- DATE / CLOCK ---------- */

const focusDays=[
  "Weekly Refresh",
  "Further Mathematics",
  "Biology",
  "Chemistry",
  "Pure Mathematics",
  "Physics",
  "Weakest Review"
];

function updateClock(){
  const d=new Date();

  document.getElementById("clock").textContent=
    d.toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit",
      second:"2-digit"
    });

  document.getElementById("date").textContent=
    d.toLocaleDateString([],{
      weekday:"long",
      day:"numeric",
      month:"long",
      year:"numeric"
    });

  document.getElementById("dailyFocus").textContent=
    focusDays[d.getDay()];
}

setInterval(updateClock,1000);
updateClock();


/* ---------- ROUTINE ---------- */

function routineState(){
  let s=get("routine",{date:today(),checks:{}});
  if(s.date!==today()){
    s={date:today(),checks:{}};
    set("routine",s);
  }
  return s;
}

function renderRoutine(){
  const s=routineState();

  document.getElementById("routineList").innerHTML=
    ROUTINE.map((r,i)=>`
      <label class="timeline-item ${s.checks[i]?"done":""}">
        <div class="time">${r[0]}–${r[1]}</div>
        <div>
          <div class="task">${r[2]}</div>
          <div class="detail">${r[3]}</div>
        </div>
        <input
          class="check"
          type="checkbox"
          ${s.checks[i]?"checked":""}
          onchange="toggleRoutine(${i},this.checked)"
        >
      </label>
    `).join("");

  const done=Object.values(s.checks).filter(Boolean).length;
  const percent=Math.round(done/ROUTINE.length*100);

  document.getElementById("routineBar").style.width=percent+"%";
  document.getElementById("routineSummary").textContent=
    `${done} / ${ROUTINE.length} activities completed`;
  document.getElementById("routineHome").textContent=percent+"%";

  renderMission();
}

function toggleRoutine(index,value){
  const s=routineState();
  s.checks[index]=value;
  set("routine",s);
  renderRoutine();
}

function resetRoutine(){
  set("routine",{date:today(),checks:{}});
  renderRoutine();
}


/* ---------- HYDRATION ---------- */

function waterState(){
  let w=get("water",{date:today(),amount:0});

  if(w.date!==today()){
    w={date:today(),amount:0};
    set("water",w);
  }

  return w;
}

function addWater(amount){
  const w=waterState();
  w.amount+=amount;
  set("water",w);
  renderWater();
  renderMission();
}

function renderWater(){
  const amount=waterState().amount;
  const pct=Math.min(100,amount/2500*100);

  document.getElementById("waterDisplay").textContent=amount+" ml";
  document.getElementById("waterHome").textContent=
    `${amount} / 2500 ml`;
  document.getElementById("waterBar").style.width=pct+"%";
}

renderWater();


/* ---------- DAILY MISSION ---------- */

function renderMission(){
  const routine=routineState();
  const water=waterState();

  const routineDone=
    Object.values(routine.checks).filter(Boolean).length>0;

  const fitness=get("fitness",[]);
  const fitnessDone=fitness.some(x=>x.date===today());

  const missions=[
    ["Complete at least one routine task",routineDone],
    ["Daily Korean challenge",get("koreanDone",false)],
    ["Read a Neuro Academy note",get("neuroDone",false)],
    ["Reach 2500 ml hydration target",water.amount>=2500],
    ["Log today's training",fitnessDone]
  ];

  document.getElementById("missionList").innerHTML=
    missions.map(m=>`
      <div class="list-item">
        <span>${m[1]?"✓":"□"} ${m[0]}</span>
        <b>${m[1]?"DONE":"PENDING"}</b>
      </div>
    `).join("");

  const done=missions.filter(x=>x[1]).length;
  const percent=Math.round(done/missions.length*100);

  document.getElementById("missionPercent").textContent=percent+"%";
  document.getElementById("missionBar").style.width=percent+"%";
}

renderMission();


/* ---------- SUBJECTS ---------- */

document.getElementById("subjectGrid").innerHTML=
  SUBJECTS.map(s=>`
    <div class="subject" onclick="startQuiz('${s[0]}')">
      <small>${s[1]}</small>
      <h3>${s[0]}</h3>
      <button>Open Quiz</button>
    </div>
  `).join("");


/* ---------- QUIZ ---------- */

let currentQuestions=[];
let currentQuestion=0;
let currentScore=0;
let questionAnswered=false;

function startQuiz(category){
  document.getElementById("quizCategory").value=category;

  currentQuestions=QUIZZES[category];
  currentQuestion=0;
  currentScore=0;

  renderQuestion();
}

function renderQuestion(){
  const q=currentQuestions[currentQuestion];
  questionAnswered=false;

  document.getElementById("quizInfo").textContent=
    `${currentQuestion+1} / ${currentQuestions.length} • Score ${currentScore}`;

  document.getElementById("quizBar").style.width=
    currentQuestion/currentQuestions.length*100+"%";

  document.getElementById("question").textContent=q[0];
  document.getElementById("feedback").textContent="";
  document.getElementById("nextBtn").disabled=true;

  document.getElementById("answers").innerHTML=
    q[1].map((answer,i)=>`
      <button class="answer" onclick="answerQuestion(${i})">
        ${answer}
      </button>
    `).join("");
}

function answerQuestion(choice){
  if(questionAnswered)return;

  questionAnswered=true;

  const q=currentQuestions[currentQuestion];
  const buttons=document.querySelectorAll(".answer");

  buttons.forEach((button,i)=>{
    button.disabled=true;

    if(i===q[2])button.classList.add("correct");
    if(i===choice && choice!==q[2])button.classList.add("wrong");
  });

  if(choice===q[2]){
    currentScore++;
    document.getElementById("feedback").textContent="Correct ✓";
    document.getElementById("feedback").style.color="var(--green)";
  }else{
    document.getElementById("feedback").textContent=
      "Incorrect — review the concept.";
    document.getElementById("feedback").style.color="var(--red)";
  }

  document.getElementById("quizInfo").textContent=
    `${currentQuestion+1} / ${currentQuestions.length} • Score ${currentScore}`;

  document.getElementById("nextBtn").disabled=false;
}

function nextQuestion(){
  if(currentQuestion<currentQuestions.length-1){
    currentQuestion++;
    renderQuestion();
  }else{
    document.getElementById("feedback").textContent=
      `Diagnostic complete: ${currentScore}/${currentQuestions.length}`;
    document.getElementById("feedback").style.color="var(--cyan)";
    document.getElementById("nextBtn").disabled=true;
  }
}

startQuiz("Pure Mathematics");


/* ---------- PAST PAPER TIMER ---------- */

let seconds=3600;
let timerID=null;

function showTimer(){
  const m=Math.floor(seconds/60);
  const s=seconds%60;

  document.getElementById("timer").textContent=
    `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function startTimer(){
  if(timerID)return;

  timerID=setInterval(()=>{
    if(seconds<=0){
      pauseTimer();
      return;
    }

    seconds--;
    showTimer();
  },1000);
}

function pauseTimer(){
  clearInterval(timerID);
  timerID=null;
}

function resetTimer(){
  pauseTimer();
  seconds=3600;
  showTimer();
}

showTimer();


/* ---------- NEURO ---------- */

document.getElementById("neuroNotes").innerHTML=
  NEURO_NOTES.map(n=>`
    <article class="note">
      <span class="tag">${n[0]}</span>
      <h3>${n[1]}</h3>
      <p>${n[2]}</p>
      <button onclick="markNeuro()">Mark Studied ✓</button>
    </article>
  `).join("");

function markNeuro(){
  set("neuroDone",true);
  renderMission();
}


/* ---------- GLOSSARY ---------- */

function renderGlossary(){
  const data=get("glossary",[]);

  document.getElementById("glossary").innerHTML=
    data.length
    ? [...data].reverse().map(x=>`
        <div class="list-item">
          <b>${x.en}</b>
          <span>→ ${x.fr}</span>
        </div>
      `).join("")
    : `<p class="muted">No entries yet.</p>`;
}

function addGlossary(){
  const en=document.getElementById("english").value.trim();
  const fr=document.getElementById("french").value.trim();

  if(!en||!fr)return;

  const data=get("glossary",[]);
  data.push({en,fr,date:today()});
  set("glossary",data);

  document.getElementById("english").value="";
  document.getElementById("french").value="";

  renderGlossary();
}

renderGlossary();


/* ---------- LANGUAGES ---------- */

function showLanguage(id,button){
  document.querySelectorAll(".language-panel")
    .forEach(x=>x.classList.remove("active"));

  document.querySelectorAll(".language-nav button")
    .forEach(x=>x.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  button.classList.add("active");
}

function languageAnswer(button,correct){
  document.querySelectorAll("#korean .answer")
    .forEach(x=>x.disabled=true);

  if(correct){
    button.classList.add("correct");
    document.getElementById("languageFeedback").textContent=
      "Correct ✓ 학교 = hakgyo = school";
    document.getElementById("languageFeedback").style.color=
      "var(--green)";
    set("koreanDone",true);
  }else{
    button.classList.add("wrong");
    document.getElementById("languageFeedback").textContent=
      "Not quite. 학교 (hakgyo) means school.";
    document.getElementById("languageFeedback").style.color=
      "var(--red)";
  }

  renderMission();
}

function renderLanguageTable(){
  const search=document.getElementById("languageSearch")
    .value.toLowerCase();

  document.getElementById("languageTable").innerHTML=
    LANGUAGE_MATRIX
      .filter(x=>x.join(" ").toLowerCase().includes(search))
      .map(x=>`
        <tr>
          <td><b>${x[0]}</b></td>
          <td>${x[1]}${x[2]?`<br><span class="roman">${x[2]}</span>`:""}</td>
          <td>${x[3]}</td>
        </tr>
      `).join("");
}

renderLanguageTable();


/* ---------- FITNESS ---------- */

function saveFitness(){
  const push=document.getElementById("pushups").value;
  const plank=document.getElementById("plank").value;
  const flex=document.getElementById("flexibility").value;

  if(!push||!plank||!flex){
    alert("Complete all three fields.");
    return;
  }

  const data=get("fitness",[]);

  data.push({
    date:today(),
    pushups:Number(push),
    plank:Number(plank),
    flexibility:Number(flex)
  });

  set("fitness",data);

  document.getElementById("pushups").value="";
  document.getElementById("plank").value="";
  document.getElementById("flexibility").value="";

  renderFitness();
  renderMission();
}

function renderFitness(){
  const data=get("fitness",[]);

  document.getElementById("fitnessHistory").innerHTML=
    data.length
    ? [...data].reverse().map(x=>`
      <div class="list-item">
        <span>${x.date}</span>
        <span>
          Push-ups: <b>${x.pushups}</b> |
          Plank: <b>${x.plank}s</b> |
          Flex: <b>${x.flexibility}/10</b>
        </span>
      </div>
    `).join("")
    : `<p class="muted">No training entries yet.</p>`;
}

renderFitness();


/* ---------- NOTIFICATIONS ---------- */

async function requestNotifications(){
  if(!("Notification" in window)){
    alert("This browser does not support notifications.");
    return;
  }

  const permission=await Notification.requestPermission();

  if(permission==="granted"){
    new Notification("Neuro Matrix",{body:"Hydration reminders are enabled."});
  }
}

setInterval(()=>{
  if(
    "Notification" in window &&
    Notification.permission==="granted"
  ){
    new Notification("Hydration Matrix",{
      body:"Hydration check 💧 — remember your daily target."
    });
  }
},2*60*60*1000);


/* ---------- DATA EXPORT ---------- */

function exportData(){
  const data={};

  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);

    if(key.startsWith(STORE)){
      data[key.replace(STORE,"")]=
        JSON.parse(localStorage.getItem(key));
    }
  }

  const blob=new Blob(
    [JSON.stringify(data,null,2)],
    {type:"application/json"}
  );

  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");

  a.href=url;
  a.download="neuro-matrix-backup.json";
  a.click();

  URL.revokeObjectURL(url);
}

function clearAllData(){
  if(!confirm("Clear all Neuro Matrix local data?"))return;

  Object.keys(localStorage)
    .filter(k=>k.startsWith(STORE))
    .forEach(k=>localStorage.removeItem(k));

  location.reload();
}


/* ---------- PWA ---------- */

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("app.js")
      .catch(()=>{});
  });
}


/* ---------- DAILY RESET CHECK ---------- */

setInterval(()=>{
  routineState();
  waterState();
  renderRoutine();
  renderWater();
},60000);

renderRoutine();
/* ============================= */
/* LANGUAGE LEARNING ENGINE       */
/* ============================= */

function selectLearningLanguage(language,button){

  document.querySelectorAll(".learning-language")
    .forEach(panel=>{
      panel.classList.remove("active");
    });

  document.querySelectorAll(".language-select")
    .forEach(btn=>{
      btn.classList.remove("active");
    });

  document
    .getElementById("learning-"+language)
    .classList.add("active");

  button.classList.add("active");
}


/* ---------- KOREAN QUIZ ---------- */

function languageQuiz(button,correct){

  const buttons=document.querySelectorAll(
    ".language-answers button"
  );

  buttons.forEach(btn=>{
    btn.disabled=true;
  });

  const stats=get("languageStats",{
    questions:0,
    correct:0,
    words:0
  });

  stats.questions++;

  if(correct){

    button.classList.add("correct");

    stats.correct++;
    stats.words++;

    document.getElementById(
      "languageQuizFeedback"
    ).textContent=
      "✓ Correct! 학교 = hakgyo = school";

    document.getElementById(
      "languageQuizFeedback"
    ).style.color="var(--green)";

    set("koreanDone",true);

  }else{

    button.classList.add("wrong");

    document.getElementById(
      "languageQuizFeedback"
    ).textContent=
      "Not quite — 학교 (hakgyo) means school.";

    document.getElementById(
      "languageQuizFeedback"
    ).style.color="var(--red)";
  }

  set("languageStats",stats);

  updateLanguageStats();
  renderMission();
}


/* ---------- LANGUAGE STATS ---------- */

function updateLanguageStats(){

  const stats=get("languageStats",{
    questions:0,
    correct:0,
    words:0
  });

  document.getElementById(
    "wordsLearned"
  ).textContent=stats.words;

  document.getElementById(
    "languageQuestions"
  ).textContent=stats.questions;

  document.getElementById(
    "languageCorrect"
  ).textContent=stats.correct;

  const percent=
    stats.questions===0
    ? 0
    : Math.round(
        stats.correct/
        stats.questions*
        100
      );

  document.getElementById(
    "languagePercent"
  ).textContent=percent+"%";

  document.getElementById(
    "languageProgress"
  ).style.width=percent+"%";
}


/* ---------- PRONUNCIATION ---------- */

function speakKorean(){

  if(!("speechSynthesis" in window)){
    alert("Speech synthesis is not available on this browser.");
    return;
  }

  const speech=
    new SpeechSynthesisUtterance("공부하다");

  speech.lang="ko-KR";
  speech.rate=.75;

  speechSynthesis.speak(speech);
}


/* ---------- STREAK ---------- */

function updateLanguageStreak(){

  const state=get("languageStreak",{
    last:"",
    streak:0
  });

  const todayString=today();

  if(state.last===todayString){
    document.getElementById(
      "languageStreak"
    ).textContent=state.streak;

    return;
  }

  const yesterday=
    new Date(Date.now()-86400000)
      .toISOString()
      .slice(0,10);

  if(state.last===yesterday){
    state.streak++;
  }else{
    state.streak=1;
  }

  state.last=todayString;

  set("languageStreak",state);

  document.getElementById(
    "languageStreak"
  ).textContent=state.streak;
}

updateLanguageStats();
updateLanguageStreak();
