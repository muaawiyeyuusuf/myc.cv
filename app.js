(function() {
  // Mobile menu toggle
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }

  // Dark / light theme toggle
  const themeBtn = document.getElementById('themeToggle');
  const sun = document.getElementById('sunIcon');
  const moon = document.getElementById('moonIcon');

  const isDark = () => document.documentElement.classList.contains('dark');
  const setTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if (sun && moon) {
      sun.classList.toggle('hidden', !dark);
      moon.classList.toggle('hidden', dark);
    }
  };

  // Load stored theme or system pref
  const stored = localStorage.getItem('theme');
  if (stored) setTheme(stored === 'dark');
  else setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (themeBtn) themeBtn.addEventListener('click', () => setTheme(!isDark()));

  // Intersection Observer for reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
