// Yükleme Ekranı
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 2000);
};

let timeLeft = 100;
let timerInterval;

function showModeSelection() {
    document.getElementById('menu').classList.remove('active');
    document.getElementById('mode-selection').classList.add('active');
}

function startGame(mode) {
    document.getElementById('mode-selection').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    startTimer();
    generateQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById('timer');
        timerEl.textContent = timeLeft;
        if(timeLeft <= 10) timerEl.classList.add('danger');
        if(timeLeft <= 0) { clearInterval(timerInterval); alert('Oyun Bitti!'); }
    }, 1000);
}

function generateQuestion() {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    document.getElementById('question-box').textContent = `${a} x ${b}`;
}
