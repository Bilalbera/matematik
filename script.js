<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matematik Yarışı</title>
    <style>
        :root { --p: #6366f1; --bg: #0f172a; --text: #fff; }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
        .screen { display: none; text-align: center; width: 100%; padding: 20px; }
        .active { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        #loader { position: fixed; inset: 0; background: var(--bg); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 10; }
        .spinner { width: 50px; height: 50px; border: 5px solid #334; border-top: 5px solid var(--p); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        button { padding: 15px 30px; background: var(--p); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 1.2rem; }
        #game-area { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 90%; }
        .p-box { border: 2px solid #334; padding: 20px; border-radius: 15px; }
    </style>
</head>
<body>

    <div id="loader">
        <div class="spinner"></div>
        <p style="margin-top: 20px;">Bilal Bera Cantekin tarafından yapıldı</p>
    </div>

    <div id="menu" class="screen active">
        <h1>Matematik Yarışı</h1>
        <button onclick="showMode()">Oyuna Başla</button>
    </div>

    <div id="modes" class="screen">
        <button onclick="initGame('single')">Tek Oyuncu</button>
        <button onclick="initGame('multi')">İki Kişi (1v1)</button>
    </div>

    <div id="game" class="screen">
        <div id="timer" style="font-size: 2rem;">100</div>
        <h2 id="q">? x ?</h2>
        <div id="game-area">
            <div class="p-box">P1 Skor: <span id="s1">0</span></div>
            <div class="p-box">P2 Skor: <span id="s2">0</span></div>
        </div>
        <input type="number" id="ans" placeholder="Cevap" style="padding: 10px; font-size: 1.2rem;">
    </div>

    <script>
        setTimeout(() => document.getElementById('loader').style.display = 'none', 2000);
        
        let s1 = 0, s2 = 0, time = 100, ans = 0;
        
        function showMode() { document.getElementById('menu').classList.remove('active'); document.getElementById('modes').classList.add('active'); }
        
        function initGame(m) {
            document.getElementById('modes').classList.remove('active');
            document.getElementById('game').classList.add('active');
            nextQ();
            setInterval(() => {
                time--;
                document.getElementById('timer').innerText = time;
                if(time <= 10) document.getElementById('timer').style.color = 'red';
                if(time <= 0) alert('Oyun Bitti!');
            }, 1000);
        }

        function nextQ() {
            let a = Math.floor(Math.random()*12)+1;
            let b = Math.floor(Math.random()*12)+1;
            ans = a * b;
            document.getElementById('q').innerText = `${a} x ${b}`;
        }

        document.getElementById('ans').onkeypress = (e) => {
            if(e.key === 'Enter') {
                if(document.getElementById('ans').value == ans) s1++;
                document.getElementById('s1').innerText = s1;
                document.getElementById('ans').value = '';
                nextQ();
            }
        };
    </script>
</body>
</html>
