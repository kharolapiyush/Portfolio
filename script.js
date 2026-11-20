// ============ TIMELINE SCRUBBER ============
(() => {
  const slider = document.getElementById('journeySlider');
  const fill = document.getElementById('scrubberFill');
  const yearEl = document.getElementById('scrubberYear');
  const textEl = document.getElementById('scrubberText');
  const ticks = document.querySelectorAll('.scrubber-ticks span');
  if (!slider) return;

  const milestones = [
    { year: '2022', text: 'Completed CBSE Class X at St. Clare’s Convent School.' },
    { year: '2024', text: 'Completed CBSE Class XII at Baluni Public School and began studying Computer Science and Engineering at Graphic Era Hill University.' },
    { year: '2026', text: 'Joined the Apple & Infosys iOS Student Developer Program and began building native iOS apps with Swift and Xcode.' },
  ];

  function update(){
    const val = parseInt(slider.value, 10);
    const pct = (val / Number(slider.max)) * 100;
    fill.style.width = pct + '%';
    const m = milestones[val];
    yearEl.textContent = m.year;
    textEl.textContent = m.text;
    ticks.forEach((t, i) => t.classList.toggle('active', i === val));
  }
  slider.addEventListener('input', update);
  update();
})();

// ============ FOOTER SIGNATURE REVEAL ============
(() => {
  const sig = document.getElementById('footerSignature');
  if (!sig) return;
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sig.classList.add('signed');
        io2.disconnect();
      }
    });
  }, { threshold: 0.5 });
  io2.observe(sig);
})();

// ============ SPLASH: crack open + reveal ============
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  setTimeout(() => splash.classList.add('crack-open'), 1900);
  setTimeout(() => splash.classList.add('hide'), 2550);
  setTimeout(() => startTypewriter(), 2600);
});

// ============ TYPEWRITER TAGLINE ============
function startTypewriter(){
  const el = document.getElementById('typewriterTarget');
  if (!el) return;
  const full = el.getAttribute('data-full-text') || el.textContent;
  el.textContent = '';
  el.style.borderRight = '2px solid #e0457b';
  let i = 0;
  function type(){
    if (i <= full.length){
      el.textContent = full.slice(0, i);
      i++;
      setTimeout(type, 14);
    } else {
      setTimeout(() => { el.style.borderRight = 'none'; }, 400);
    }
  }
  type();
}

// ============ CUSTOM CURSOR + GOLD DUST TRAIL ============
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
let lastDust = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';

  const now = Date.now();
  if (now - lastDust > 45) {
    lastDust = now;
    spawnDust(mouseX, mouseY);
  }
});

function spawnDust(x, y){
  const d = document.createElement('div');
  d.className = 'dust';
  const dx = (Math.random() - 0.5) * 30;
  const dy = -20 - Math.random() * 30;
  d.style.setProperty('--dx', dx + 'px');
  d.style.setProperty('--dy', dy + 'px');
  d.style.left = x + 'px';
  d.style.top = y + 'px';
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 950);
}

function animateRing(){
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .chip, .cert-card, .project-card, .skill-tags span, .p-visual').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

// Magnetic buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.25}px, ${y*0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

// ============ SCROLL PROGRESS ============
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
});

// ============ NAV MOBILE TOGGLE ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// ============ PROJECT CARD FLIPS ============
document.querySelectorAll('.project-card').forEach(card => {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');
  const showHighlight = front.querySelector('[data-flip]');
  const showDetails = back.querySelector('[data-flip]');

  function flip(showBack) {
    card.classList.toggle('flipped', showBack);
    front.inert = showBack;
    back.inert = !showBack;
    (showBack ? showDetails : showHighlight).focus({ preventScroll: true });
  }

  showHighlight.addEventListener('click', () => flip(true));
  back.addEventListener('click', () => flip(false));
});

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ============ TILT ON PROJECT CARDS ============
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (card.classList.contains('flipped')) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1400px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1400px) rotateY(0) rotateX(0) translateY(0)';
  });
});

// ============ PARALLAX ============
const parallaxEls = document.querySelectorAll('.parallax-el');
function updateParallax(){
  const scrollY = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
  requestAnimationFrame(updateParallax);
}
updateParallax();

// ============ AMBIENT FLOATING GOLD PARTICLES (canvas) ============
(() => {
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makeParticles(n){
    return Array.from({length: n}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.6,
      vy: -0.08 - Math.random() * 0.18,
      vx: (Math.random() - 0.5) * 0.06,
      alpha: 0.15 + Math.random() * 0.35,
    }));
  }
  particles = makeParticles(46);

  function draw(){
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,100,150,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ============ LIVE GITHUB STATS ============
const githubUsername = 'kharolapiyush';

(async () => {
  const count = document.getElementById('statRepos');
  const status = document.getElementById('statReposStatus');
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('GitHub profile unavailable');
    const data = await response.json();
    if (!Number.isInteger(data.public_repos) || data.public_repos < 0) {
      throw new Error('Invalid public repository count');
    }
    animateCount(count, data.public_repos);
  } catch {
    status.textContent = 'GitHub repository count unavailable';
  }
})();

(async () => {
  const grid = document.getElementById('heatmapGrid');
  const status = document.getElementById('heatmapSub');
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) throw new Error('GitHub contributions unavailable');
    const { contributions } = await response.json();
    if (!Array.isArray(contributions) || !contributions.length) {
      throw new Error('Missing contribution calendar');
    }

    const cells = document.createDocumentFragment();
    let total = 0;
    for (const { date, count, level } of contributions) {
      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      cell.dataset.level = level;
      cell.title = `${date}: ${count} contribution${count === 1 ? '' : 's'}`;
      cells.appendChild(cell);
      total += count;
    }
    grid.replaceChildren(cells);
    status.textContent = `${total} contributions in the last year`;
  } catch {
    status.textContent = 'Contribution history unavailable. Visit GitHub for current activity.';
  }
})();

function animateCount(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}
