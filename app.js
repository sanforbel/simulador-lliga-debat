// 1) Temes aleatoris
const topics = [
"Xarxes socials i educació",
"Prohibir el mòbil a l'aula",
"Canvi climàtic: accions o polítiques",
"IA a l'escola: oportunitat o risc",
"Turisme de masses i sostenibilitat"
];
const spinBtn = document.getElementById('spin');
const topicEl = document.getElementById('topic');
spinBtn.addEventListener('click', () => {
topicEl.textContent = 'Tema: ' + topics[Math.floor(Math.random()*topics.length)];
});


// 2) Micròfon (getUserMedia)
const recBtn = document.getElementById('recBtn');
const stopBtn = document.getElementById('stopBtn');
const playback = document.getElementById('playback');
const micStatus = document.getElementById('micStatus');
let mediaRecorder; let chunks = [];


async function initMic(){
try {
const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
mediaRecorder = new MediaRecorder(stream);
mediaRecorder.ondataavailable = e => chunks.push(e.data);
mediaRecorder.onstop = () => {
const blob = new Blob(chunks, { type:'audio/webm' });
chunks = []; playback.src = URL.createObjectURL(blob);
};
micStatus.textContent = 'Micròfon: preparat ✅';
} catch(e){
micStatus.textContent = 'Micròfon: denegat o error ❌ ('+e.name+')';
recBtn.disabled = true;
}
}
initMic();


recBtn.onclick = () => { if(mediaRecorder){ mediaRecorder.start(); recBtn.disabled=true; stopBtn.disabled=false; } };
stopBtn.onclick = () => { if(mediaRecorder){ mediaRecorder.stop(); recBtn.disabled=false; stopBtn.disabled=true; } };


// 3) Avaluació fake (sense backend): només per veure la UI
const evaluateBtn = document.getElementById('evaluate');
const textInput = document.getElementById('textInput');
const result = document.getElementById('result');
function quickScore(txt){
const w = txt.trim().split(/\s+/).length;
const hasConn = /(per tant|a més|d'una banda|en conclusió|no obstant)/i.test(txt);
let s = 3; if(w>60) s+=2; if(hasConn) s+=3; return Math.min(10,s);
}


evaluateBtn.onclick = () => {
let t = textInput.value; if(!t || t.length<10) t = 'Mini argument de prova.';
const s = quickScore(t);
result.innerHTML = `<div class="card"><h3>Puntuació (demo): ${s}/10</h3>
<ul>
<li><strong>Tesi</strong> clara al principi.</li>
<li>Usa <strong>connectors</strong> (per tant, a més...).</li>
<li>Aporta <strong>evidències</strong> i exemples.</li>
<li>Tanca amb <strong>conclusió</strong>.</li>
</ul></div>`;
};
