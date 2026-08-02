// 実験ネコシリーズ — 共有スクリプト

(function () {
  const root = document.documentElement;
  const KEY = 'neko-lab-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.paw-toggle');
    if (toggle) {
      const knob = toggle.querySelector('.knob');
      const sync = () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (knob) knob.textContent = isDark ? '🌙' : '🐾';
      };
      sync();
      toggle.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
        localStorage.setItem(KEY, isDark ? 'light' : 'dark');
        sync();
      });
    }

    // カテゴリフィルタ（トップページ用）
    const chips = document.querySelectorAll('.chip');
    const cards = document.querySelectorAll('[data-field]');
    if (chips.length) {
      chips.forEach((chip) => {
        chip.addEventListener('click', () => {
          chips.forEach((c) => c.setAttribute('data-active', 'false'));
          chip.setAttribute('data-active', 'true');
          const target = chip.dataset.filter;
          cards.forEach((card) => {
            const show = target === 'all' || card.dataset.field === target;
            card.style.display = show ? '' : 'none';
          });
        });
      });
    }
  });
})();
