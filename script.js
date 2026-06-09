// Sayfa yüklendiğinde çalışacaklar
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    }, 2000); // Yükleme ekranı 2 saniye kalır
};

// Değişkenler
let timer;
let timeLeft = 100;
let currentMode = 'single';
let scores = { player1: 0, player2: 0 };
let currentAnswers = { player1: 0, player2: 0 };

// Menü Geçişleri
function showModeSelection() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('mode-selection').classList.remove('hidden');
}

function showMainMenu() {
    clearInterval(timer);
    document.getElementById('mode-selection').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}

// Oyunu Başlat
function startGame(mode) {
    currentMode = mode;
    scores = { player1: 0, player2: 0 };
    timeLeft = 100;
    
    document.getElementById('score1').innerText = "0";
    document.getElementById('score2').innerText = "0";
    document.getElementById('time-left').innerText = timeLeft;

    document.getElementById('mode-selection').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    if (mode === '1v1') {
        document.getElementById('player2-area').classList.remove('hidden');
        generateQuestion('player2');
    } else {
        document.getElementById('player2-area').classList.add('hidden');
    }

    generateQuestion('player1');
    
    // Süreyi başlat
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

// Soru Üretici (1 ile 10 arası çarpma)
function generateQuestion(player) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let correctAnswer = num1 * num2;
    
    currentAnswers[player] = correctAnswer;

    // Şıkları oluştur
    let options = [correctAnswer];
    while(options.length < 4) {
        let fakeAnswer = (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 10) + 1);
        if(!options.includes(fakeAnswer)) {
            options.push(fakeAnswer);
        }
    }
    
    // Şıkları karıştır
    options.sort(() => Math.random() - 0.5);

    // Ekrana yazdır
    let qElement = player === 'player1' ? 'q1' : 'q2';
    let optElement = player === 'player1' ? 'options1' : 'options2';
    
    document.getElementById(qElement).innerText = `${num1} x ${num2}`;
    
    let optionsHTML = '';
    options.forEach(opt => {
        optionsHTML += `<button class="opt-btn" onclick="checkAnswer('${player}', ${opt})">${opt}</button>`;
    });
    
    document.getElementById(optElement).innerHTML = optionsHTML;
}

// Cevap Kontrolü
function checkAnswer(player, selectedValue) {
    if (selectedValue === currentAnswers[player]) {
        scores[player] += 10; // Doğruysa 10 puan
    } else {
        scores[player] -= 5;  // Yanlışsa 5 puan düşür
    }

    // Puanı ekranda güncelle ve yeni soru sor
    let scoreElement = player === 'player1' ? 'score1' : 'score2';
    document.getElementById(scoreElement).innerText = scores[player];
    
    generateQuestion(player);
}

// Oyun Sonu
function endGame() {
    clearInterval(timer);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    let resultText = "";
    if (currentMode === 'single') {
        resultText = `Harika! Toplam Puanın: ${scores.player1}`;
    } else {
        if (scores.player1 > scores.player2) {
            resultText = `🏆 1. Oyuncu Kazandı!<br><br>Puan: ${scores.player1} - ${scores.player2}`;
        } else if (scores.player2 > scores.player1) {
            resultText = `🏆 2. Oyuncu Kazandı!<br><br>Puan: ${scores.player2} - ${scores.player1}`;
        } else {
            resultText = `Berabere!<br><br>Puanlar: ${scores.player1}`;
        }
    }

    document.getElementById('final-result').innerHTML = resultText;
}
