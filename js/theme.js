/**
 * Rasx Tools - Dedicated Theme Controller (Light & Dark Mode)
 * Ultra-fast, zero-dependency, works both in HTTP server and file:// environments.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'rasx_theme';
  let lastToggleTime = 0;

  function getSystemPreference() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {}
    return 'light';
  }

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch (e) {}
    return getSystemPreference();
  }

  function getSunIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  }

  function getMoonIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon moon-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  }

  function applyTheme(theme, save = true) {
    const validTheme = theme === 'dark' ? 'dark' : 'light';
    const root = document.documentElement;

    root.setAttribute('data-theme', validTheme);
    if (validTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    if (save) {
      try {
        localStorage.setItem(STORAGE_KEY, validTheme);
      } catch (e) {}
    }

    updateUI(validTheme);

    // Notify listeners
    try {
      window.dispatchEvent(new CustomEvent('rasx-theme-changed', { detail: { theme: validTheme } }));
    } catch (e) {}

    console.log('[Rasx Theme] Active theme:', validTheme);
    return validTheme;
  }

  function toggleTheme() {
    const now = Date.now();
    // Guard against duplicate event firing within 200ms
    if (now - lastToggleTime < 200) {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }
    lastToggleTime = now;

    const currentTheme = document.documentElement.getAttribute('data-theme') || getStoredTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    return applyTheme(newTheme, true);
  }

  function updateUI(theme) {
    const isDark = theme === 'dark';
    const titleText = isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode';
    const ariaText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    const selectors = [
      '#themeToggleBtn',
      '#modalThemeToggleBtn',
      '#footerThemeToggleBtn',
      '.theme-toggle-btn'
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((btn) => {
        btn.setAttribute('title', titleText);
        btn.setAttribute('aria-label', ariaText);

        const iconContainer = btn.querySelector('.theme-toggle-icon');
        const textContainer = btn.querySelector('.theme-toggle-text');

        if (iconContainer) {
          iconContainer.innerHTML = isDark ? getSunIcon() : getMoonIcon();
        } else {
          btn.innerHTML = isDark ? getSunIcon() : getMoonIcon();
        }

        if (textContainer) {
          textContainer.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }

        btn.classList.toggle('is-dark', isDark);
      });
    });
  }

  function bindEvents() {
    const selectors = [
      '#themeToggleBtn',
      '#modalThemeToggleBtn',
      '#footerThemeToggleBtn',
      '.theme-toggle-btn'
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((btn) => {
        if (!btn._themeBound) {
          btn._themeBound = true;
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) {
              e.stopImmediatePropagation();
            }
            toggleTheme();
          });
        }
      });
    });

    updateUI(document.documentElement.getAttribute('data-theme') || 'light');
  }

  // Initial immediate application
  const initialTheme = getStoredTheme();
  applyTheme(initialTheme, false);

  // Listen for system theme changes if user hasn't set custom manual preference
  try {
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        try {
          const manualPref = localStorage.getItem(STORAGE_KEY);
          if (!manualPref) {
            applyTheme(e.matches ? 'dark' : 'light', false);
          }
        } catch (err) {}
      });
    }
  } catch (e) {}

  // Cross-tab synchronization
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
      applyTheme(e.newValue, false);
    }
  });

  // Attach button listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindEvents);
  } else {
    bindEvents();
  }

  // Global API
  window.RasxTheme = {
    get: function () {
      return document.documentElement.getAttribute('data-theme') || 'light';
    },
    set: applyTheme,
    toggle: toggleTheme,
    updateUI: updateUI,
    bindEvents: bindEvents
  };

  window.toggleTheme = toggleTheme;
})();
