// ── SCROLL PROGRESS BAR ──
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

// ── STARS ──
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let W, H, stars = [];

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function makeStar() {
  return {
    x: Math.random() * W,
    y: Math.random() * -H,
    size: Math.random() * 1.8 + 0.3,
    speed: Math.random() * 0.6 + 0.15,
    opacity: Math.random() * 0.7 + 0.2,
    twinkle: Math.random() * Math.PI * 2,
    golden: Math.random() < 0.2
  };
}
for (let i = 0; i < 160; i++) {
  const s = makeStar(); s.y = Math.random() * H; stars.push(s);
}

function animateStars() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach((s, i) => {
    s.y += s.speed;
    s.twinkle += 0.03;
    const op = s.opacity * (0.7 + 0.3 * Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = s.golden ? `rgba(201,169,110,${op})` : `rgba(240,228,212,${op})`;
    ctx.fill();
    if (s.y > H + 10) stars[i] = makeStar();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// ── ROSE PETALS ──
function spawnPetal() {
  const el = document.createElement('div');
  el.className = 'petal';
  el.style.left = (Math.random() * 110 - 5) + 'vw';
  const dur = Math.random() * 12 + 10;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = (Math.random() * 5) + 's';
  const sc = Math.random() * 0.7 + 0.6;
  el.style.transform = `scale(${sc})`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur + 5) * 1000);
}
setInterval(spawnPetal, 2500);

// ── TOUCH EFFECTS ──
const tapSymbols = ['❤', '♡', '✦', '·'];
document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  const r = document.createElement('div');
  r.className = 'ripple';
  const sz = 36;
  r.style.cssText = `width:${sz}px;height:${sz}px;top:${t.clientY - sz/2}px;left:${t.clientX - sz/2}px`;
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 900);

  if (Math.random() < 0.45) {
    const h = document.createElement('div');
    h.className = 'tap-heart';
    h.textContent = tapSymbols[Math.floor(Math.random() * tapSymbols.length)];
    h.style.cssText = `left:${t.clientX}px;top:${t.clientY}px;color:#c4856a;font-size:${0.9 + Math.random() * 0.6}rem`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 800);
  }
}, { passive: true });

// ── CONFETTI BURST ──
function launchConfetti() {
  const colors = ['#c4856a','#c9a96e','#f0e4d4','#8b5a48','#7a7090'];
  for (let i = 0; i < 55; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = (20 + Math.random() * 60) + 'vw';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = Math.random() < 0.5 ? '50%' : '1px';
      el.style.width = (4 + Math.random() * 5) + 'px';
      el.style.height = (4 + Math.random() * 5) + 'px';
      const dur = 1.5 + Math.random() * 2;
      el.style.animationDuration = dur + 's';
      el.style.animationDelay = (Math.random() * 0.4) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (dur + 0.5) * 1000);
    }, i * 18);
  }
}

// ── OPEN MAIN ──
function openMain() {
  const intro = document.getElementById('intro');
  const main  = document.getElementById('main');
  const music = document.getElementById('bgMusic');
  const bar   = document.getElementById('musicBar');

  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    main.classList.add('visible');
    bar.style.display = 'flex';
    launchConfetti();
    initScrollReveal();
  }, 900);
  music.play().catch(() => {});
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.reveal, .wish-card, .reason-item, .tl-item'
  );
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    if (!el.classList.contains('reveal')) {
      el.style.transitionDelay = (i % 6) * 0.08 + 's';
    }
    obs.observe(el);
  });
}

// ── SLIDESHOW ──
const photos = [
  { src: '1.jpg', caption: 'Kamu selalu bikin aku senyum 💕' },
  { src: '2.jpg', caption: 'Setiap momen sama kamu itu berharga' },
  { src: '3.jpg', caption: 'Kamu yang paling cantik di mataku' },
  { src: '4.jpg', caption: 'Bersama kamu aku merasa lengkap' },
  { src: '5.jpg', caption: 'Aku mau selalu di sisimu' },
  { src: '6.jpg', caption: 'Terima kasih sudah ada' },
  { src: '8.jpg', caption: 'Hari-hari indah bersamamu' },
  { src: '9.jpg', caption: 'Kamu adalah segalanya bagiku' }
];

const slideshowEl = document.getElementById('slideshow');
const dotsEl      = document.getElementById('dots');
const counterEl   = document.getElementById('slideCounter');
let currentSlide  = 0;
let slideTimer;

photos.forEach((p, i) => {
  const div = document.createElement('div');
  div.className = 'slide' + (i === 0 ? ' active' : '');
  div.innerHTML = `<img src="${p.src}" alt="foto ${i+1}" loading="lazy" /><div class="slide-caption">${p.caption}</div>`;
  slideshowEl.appendChild(div);

  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.onclick = () => goSlide(i);
  dotsEl.appendChild(dot);
});

function updateCounter() {
  if (counterEl) counterEl.textContent = `${currentSlide + 1} / ${photos.length}`;
}

function goSlide(n) {
  document.querySelectorAll('.slide')[currentSlide].classList.remove('active');
  document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
  currentSlide = (n + photos.length) % photos.length;
  document.querySelectorAll('.slide')[currentSlide].classList.add('active');
  document.querySelectorAll('.dot')[currentSlide].classList.add('active');
  updateCounter();
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(currentSlide + 1), 4500);
}

slideTimer = setInterval(() => goSlide(currentSlide + 1), 4500);
updateCounter();

let touchStartX = 0;
slideshowEl.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
slideshowEl.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
}, { passive: true });

// ── QUOTES ROTATOR ──
const quotes = [
  { text: 'Kamu bukan hanya seseorang yang aku cintai, kamu adalah alasan aku tersenyum setiap pagi.', author: '— untuk kamu' },
  { text: 'Di antara jutaan kemungkinan di dunia ini, aku bersyukur jalanku berakhir ke kamu.', author: '— untuk kamu' },
  { text: 'Cinta bukan seberapa keras kamu jatuh, tapi seberapa tulus kamu bangkit untuknya.', author: '— untuk kamu' },
  { text: 'Bersamamu, bahkan hari-hari biasa terasa seperti hadiah yang paling istimewa.', author: '— untuk kamu' },
  { text: 'Aku tidak perlu sempurna, selama ada kamu yang menerima aku apa adanya.', author: '— untuk kamu' }
];

let qIndex = 0;
const qText   = document.getElementById('quoteText');
const qAuthor = document.getElementById('quoteAuthor');
const qDots   = document.querySelectorAll('.qdot');

function showQuote(i) {
  qText.classList.add('fade');
  qAuthor.classList.add('fade');
  setTimeout(() => {
    qIndex = (i + quotes.length) % quotes.length;
    qText.textContent   = quotes[qIndex].text;
    qAuthor.textContent = quotes[qIndex].author;
    qText.classList.remove('fade');
    qAuthor.classList.remove('fade');
    qDots.forEach((d, j) => d.classList.toggle('active', j === qIndex));
  }, 500);
}

qDots.forEach((d, i) => d.addEventListener('click', () => {
  clearInterval(quoteTimer);
  showQuote(i);
  quoteTimer = setInterval(() => showQuote(qIndex + 1), 5000);
}));

let quoteTimer = setInterval(() => showQuote(qIndex + 1), 5000);
if (qDots.length) qDots[0].classList.add('active');

// ── MUSIC ──
const audio       = document.getElementById('bgMusic');
const barsEl      = document.getElementById('musicBars');
const playBtnEl   = document.getElementById('playBtn');
const progressFill = document.getElementById('progressFill');
const musicTime   = document.getElementById('musicTime');
let playing = true;

function toggleMusic() {
  if (playing) {
    audio.pause();
    playBtnEl.innerHTML = '&#9654;';
    barsEl.classList.add('paused');
  } else {
    audio.play();
    playBtnEl.innerHTML = '&#9646;&#9646;';
    barsEl.classList.remove('paused');
  }
  playing = !playing;
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2,'0')}`;
}

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
  if (musicTime) musicTime.textContent = fmtTime(audio.currentTime) + ' / ' + fmtTime(audio.duration);
});

document.getElementById('progressWrap').addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  if (audio.duration) audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

// ── TIMER ──
const startDate = new Date('2026-02-05T00:00:00');
let prevSec = -1;

function updateTimer() {
  const diff      = Date.now() - startDate;
  const totalSec  = Math.floor(diff / 1000);
  const sec       = totalSec % 60;
  const totalMin  = Math.floor(totalSec / 60);
  const min       = totalMin % 60;
  const totalHour = Math.floor(totalMin / 60);
  const hour      = totalHour % 24;
  const totalDays = Math.floor(totalHour / 24);
  const months    = Math.floor(totalDays / 30);
  const days      = totalDays % 30;

  document.getElementById('t-months').textContent  = String(months).padStart(2,'0');
  document.getElementById('t-days').textContent    = String(days).padStart(2,'0');
  document.getElementById('t-hours').textContent   = String(hour).padStart(2,'0');
  document.getElementById('t-minutes').textContent = String(min).padStart(2,'0');

  const secEl = document.getElementById('t-seconds');
  secEl.textContent = String(sec).padStart(2,'0');
  if (sec !== prevSec) {
    secEl.classList.remove('pop');
    void secEl.offsetWidth;
    secEl.classList.add('pop');
    setTimeout(() => secEl.classList.remove('pop'), 250);
    prevSec = sec;
  }
}
updateTimer();
setInterval(updateTimer, 1000);
