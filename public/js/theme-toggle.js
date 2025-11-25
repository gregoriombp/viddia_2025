(function () {
  'use strict';

  // Elementos DOM
  const html = document.documentElement;
  const themeToggleItem = document.getElementById('theme-toggle-item');
  const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  // Chave para localStorage
  const THEME_STORAGE_KEY = 'viddia-theme-preference';

  // Temas disponíveis
  const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
  };

  /**
   * Obtém o tema atual baseado na classe do html
   */
  function getCurrentTheme() {
    return html.classList.contains('dark-mode') ? THEMES.DARK : THEMES.LIGHT;
  }

  /**
   * Atualiza a interface do toggle baseado no tema
   */
  function updateToggleUI(theme) {
    const isDark = theme === THEMES.DARK;

    // Atualiza checkbox
    themeToggleCheckbox.checked = isDark;

    // Atualiza ícone e label
    if (isDark) {
      themeIcon.textContent = 'dark_mode';
      themeLabel.textContent = 'Modo Escuro';
    } else {
      themeIcon.textContent = 'light_mode';
      themeLabel.textContent = 'Modo Claro';
    }
  }

  /**
   * Aplica o tema ao documento
   */
  function applyTheme(theme) {
    if (theme === THEMES.DARK) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }

    // Atualiza a UI
    updateToggleUI(theme);

    // Salva a preferência
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  /**
   * Alterna entre os temas
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(newTheme);
  }

  /**
   * Carrega a preferência de tema salva ou usa o padrão
   */
  function loadThemePreference() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme) {
      // Usa o tema salvo
      applyTheme(savedTheme);
    } else {
      // Se não houver preferência salva, usa o tema atual do HTML
      const currentTheme = getCurrentTheme();
      updateToggleUI(currentTheme);
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    }
  }

  /**
   * Inicializa os event listeners
   */
  function initEventListeners() {
    // Evento no item inteiro do dropdown
    if (themeToggleItem) {
      themeToggleItem.addEventListener('click', function(e) {
        // Previne fechar o dropdown
        e.stopPropagation();
        toggleTheme();
      });
    }

    // Evento no checkbox
    if (themeToggleCheckbox) {
      themeToggleCheckbox.addEventListener('change', function(e) {
        e.stopPropagation();
        toggleTheme();
      });
    }
  }

  /**
   * Inicializa o módulo quando o DOM estiver pronto
   */
  function init() {
    // Carrega a preferência salva
    loadThemePreference();

    // Inicializa os event listeners
    initEventListeners();
  }

  // Executa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
