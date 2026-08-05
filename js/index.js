document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------
       EDIT ME: your 9 little reasons
    --------------------------------------------- */
    const reasons = [
        "You're getting prettier day by day.",
        "Your goofy personality even if we're far away.",
        "You always remember the small things I mention.",
        "You trust me completely.",
        "You make ordinary days feel like they matter.",
        "The way you ask for kisses even in video calls... it's really cute.",
        "You motivate me effortlessly on the days I feel down.",
        "Every plan, every random idea, you're always down for it.",
        "Making me feel like I’m an important person — that I matter",
    ];

    /* Fixed-ish star positions so they don't overlap (percent of screen) */
    const starPositions = [
        { top: '14%', left: '18%' },
        { top: '10%', left: '55%' },
        { top: '22%', left: '78%' },
        { top: '38%', left: '10%' },
        { top: '46%', left: '40%' },
        { top: '35%', left: '68%' },
        { top: '62%', left: '22%' },
        { top: '58%', left: '82%' },
        { top: '72%', left: '52%' },
    ];

    const startScreen = document.getElementById('startScreen');
    const starScene = document.getElementById('starScene');
    const letterScene = document.getElementById('letterScene');
    const sky = document.getElementById('sky');
    const startBtn = document.getElementById('startBtn');
    const toLetterBtn = document.getElementById('toLetterBtn');
    const progressText = document.getElementById('progressText');
    const starModal = document.getElementById('starModal');
    const modalNumber = document.getElementById('modalNumber');
    const modalText = document.getElementById('modalText');
    const modalClose = document.getElementById('modalClose');
    const envelope = document.getElementById('envelope');
    const tapHint = document.getElementById('tapHint');
    const letterPaper = document.getElementById('letterPaper');
    const letterBody = document.getElementById('letterBody');
    const replayBtn = document.getElementById('replayBtn');
    const bgMusic = document.getElementById('bgMusic');
    const floatingHearts = document.getElementById('floatingHearts');

    let foundCount = 0;

    /* ---------- helper: switch screens ---------- */
    function showScreen(el) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        el.classList.add('active');
    }

    /* ---------- floating hearts background ---------- */
    function spawnHeart() {
        const heart = document.createElement('span');
        heart.textContent = '💗';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';
        floatingHearts.appendChild(heart);
        setTimeout(() => heart.remove(), 13000);
    }
    setInterval(spawnHeart, 900);
    for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 300);

    /* ---------- build the 9 stars ---------- */
    starPositions.forEach((pos, i) => {
        const btn = document.createElement('button');
        btn.className = 'star-btn';
        btn.style.top = pos.top;
        btn.style.left = pos.left;
        btn.style.animationDelay = (i * 0.3) + 's';
        btn.innerHTML = `<span class="glyph">✦</span>`;
        btn.addEventListener('click', () => openStar(btn, i));
        sky.appendChild(btn);
    });

    function openStar(btn, i) {
        if (btn.classList.contains('found')) {
            // already found, just show it again
            modalNumber.textContent = i + 1;
            modalText.textContent = reasons[i];
            starModal.classList.remove('hidden');
            return;
        }
        btn.classList.add('found');
        foundCount++;
        progressText.textContent = `${foundCount} / 9 stars found`;

        modalNumber.textContent = i + 1;
        modalText.textContent = reasons[i];
        starModal.classList.remove('hidden');

        if (foundCount === reasons.length) {
            toLetterBtn.classList.remove('hidden');
        }
    }

    modalClose.addEventListener('click', () => {
        starModal.classList.add('hidden');
    });

    /* ---------- music + start ---------- */
    function ensureMusicPlaying() {
        if (bgMusic.paused) {
            bgMusic.volume = 0.6;
            bgMusic.play().catch(() => { /* browser blocked autoplay, ignore */ });
        }
    }

    startBtn.addEventListener('click', () => {
        ensureMusicPlaying();
        showScreen(starScene);
    });

    toLetterBtn.addEventListener('click', () => {
        ensureMusicPlaying();
        showScreen(letterScene);
    });

    /* ---------- envelope + letter ---------- */
    const letterParagraphs = [
        "Nine months ago I didn't know a few weeks could turn into forever, but somehow here we are.",
        "Every star you just found is real — a small piece of why I fell for you and why I keep falling, month after month.",
        "You make the ordinary days feel worth remembering, and the hard days feel a little lighter just because you're in them with me.",
        "So here's to nine months, and to every month after this one. I love you, today and always.",
    ];

    envelope.addEventListener('click', () => {
        if (envelope.classList.contains('open')) return;
        ensureMusicPlaying();
        envelope.classList.add('open');
        tapHint.classList.add('hidden');

        setTimeout(() => {
            letterBody.innerHTML = letterParagraphs.map(p => `<p>${p}</p>`).join('');
            letterPaper.classList.remove('hidden');
        }, 550);
    });

    replayBtn.addEventListener('click', () => {
        // reset everything and go back to the start
        foundCount = 0;
        progressText.textContent = '0 / 9 stars found';
        toLetterBtn.classList.add('hidden');
        document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('found'));
        envelope.classList.remove('open');
        tapHint.classList.remove('hidden');
        letterPaper.classList.add('hidden');
        showScreen(startScreen);
    });

});