const speakBtn = document.getElementById('speakBtn');
const muteBtn = document.getElementById('muteBtn');
const leaveBtn = document.getElementById('leaveBtn');
const feedback = document.getElementById('feedback');
const meterFill = document.getElementById('meterFill');
const meetingTimer = document.getElementById('meetingTimer');
const crashOverlay = document.getElementById('crashOverlay');
const beep = document.getElementById('beep');
const bark = document.getElementById('bark');
const muteSound = document.getElementById('muteSound');
const unmuteSound = document.getElementById('unmuteSound');
const reactionSound = document.getElementById('reactionSound');
const reactionBtn = document.getElementById('reactionBtn');

const messages = [
  "You're on mute!",
  "Can you see my screen?",
  "Sorry, I was frozen.",
  "Let's circle back to that.",
  "Please mute if you're not speaking.",
  "We’ll follow up via email.",
  "There’s background noise.",
  "You’re breaking up..."
];

let meterValue = 0;
let muted = false;
let seconds = 0;
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    meetingTimer.textContent = `${mins}:${secs}`;
  }, 1000);
}

startTimer();

speakBtn.addEventListener('click', () => {
  if (muted) return;
  beep.play();
  meterValue = Math.min(100, meterValue + Math.floor(Math.random() * 15 + 5));
  meterFill.style.width = meterValue + '%';
  feedback.textContent = messages[Math.floor(Math.random() * messages.length)];
  if (Math.random() < 0.2) bark.play();
  if (Math.random() < 0.05) triggerCrash();
});

muteBtn.addEventListener('click', () => {
  muted = !muted;
  speakBtn.textContent = muted ? '🔇 Unmute' : '🎤 Mute';
  feedback.textContent = muted ? "You're muted." : "You're unmuted.";
  if (muted) muteSound.play();
  else unmuteSound.play();
});

leaveBtn.addEventListener('click', () => {
  alert("You cannot leave. You're the host now.");
});

reactionBtn.addEventListener('click', () => {
  reactionSound.play();
  const emoji = document.createElement('div');
  emoji.textContent = "🎉";
  emoji.style.position = 'fixed';
  emoji.style.left = Math.random() * 90 + '%';
  emoji.style.top = Math.random() * 70 + '%';
  emoji.style.fontSize = '2rem';
  emoji.style.zIndex = 9999;
  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 1500);
});

function triggerCrash() {
  crashOverlay.style.display = 'flex';
  setTimeout(() => {
    crashOverlay.style.display = 'none';
  }, 2000);
}
