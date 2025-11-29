/**
 * NOT-LOGGED-STREAMING.JS
 * Gerenciamento de carrosséis e modal para experiência streaming
 * Página: index-not-logged.html
 */

(function() {
  'use strict';

  // Constants
  const SCROLL_PERCENTAGE = 0.7;
  const SCROLL_THRESHOLD = 1;
  const NAVBAR_TRANSITION_PROGRESS = 0.2;
  const SELECTORS = {
    carousel: '[data-carousel-id]',
    viewport: '.carousel-viewport',
    prevBtn: '.carousel-btn--prev',
    nextBtn: '.carousel-btn--next',
    courseCard: '.carousel-card',
    modal: '#login-modal',
    closeModal: '[data-close-modal]',
    header: '.mdk-header',
    headerLayout: '.mdk-header-layout',
    defaultNavbar: '#default-navbar'
  };

  /**
   * MÓDULO 1: GERENCIADOR DE CARROSSÉIS
   */
  const CarouselManager = {
    carousels: [],

    /**
     * Inicializa todos os carrosséis encontrados na página
     */
    init() {
      const carousels = document.querySelectorAll(SELECTORS.carousel);

      if (!carousels.length) {
        return;
      }

      carousels.forEach(carousel => {
        const instance = this.setupCarousel(carousel);
        if (instance) {
          this.carousels.push(instance);
        }
      });
    },

    /**
     * Configura um carrossel individual
     * @param {HTMLElement} carouselEl - Elemento raiz do carrossel
     * @returns {Object|null} Instância do carrossel ou null
     */
    setupCarousel(carouselEl) {
      const viewport = carouselEl.querySelector(SELECTORS.viewport);
      const prevBtn = carouselEl.querySelector(SELECTORS.prevBtn);
      const nextBtn = carouselEl.querySelector(SELECTORS.nextBtn);

      if (!viewport || !prevBtn || !nextBtn) {
        return null;
      }

      const instance = {
        viewport,
        prevBtn,
        nextBtn,
        observer: null
      };

      // Event listeners para os botões
      prevBtn.addEventListener('click', () => this.scroll(viewport, -1));
      nextBtn.addEventListener('click', () => this.scroll(viewport, 1));

      // Atualizar estado dos botões ao fazer scroll
      viewport.addEventListener('scroll', () =>
        this.updateButtons(prevBtn, nextBtn, viewport)
      );

      // ResizeObserver para atualizar botões quando viewport mudar de tamanho
      instance.observer = new ResizeObserver(() =>
        this.updateButtons(prevBtn, nextBtn, viewport)
      );
      instance.observer.observe(viewport);

      // Definir estado inicial dos botões
      this.updateButtons(prevBtn, nextBtn, viewport);

      return instance;
    },

    /**
     * Realiza scroll suave no viewport
     * @param {HTMLElement} viewport - Elemento scrollável
     * @param {number} direction - Direção: -1 (esquerda) ou 1 (direita)
     */
    scroll(viewport, direction) {
      if (!viewport) return;

      const scrollAmount = viewport.clientWidth * SCROLL_PERCENTAGE;

      viewport.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
      });
    },

    /**
     * Atualiza estado disabled dos botões baseado na posição do scroll
     * @param {HTMLElement} prevBtn - Botão anterior
     * @param {HTMLElement} nextBtn - Botão próximo
     * @param {HTMLElement} viewport - Elemento scrollável
     */
    updateButtons(prevBtn, nextBtn, viewport) {
      if (!viewport || !prevBtn || !nextBtn) return;

      const scrollLeft = viewport.scrollLeft;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;

      prevBtn.disabled = scrollLeft <= SCROLL_THRESHOLD;
      nextBtn.disabled = scrollLeft >= maxScroll - SCROLL_THRESHOLD;
    },

    /**
     * Limpa recursos dos carrosséis
     */
    destroy() {
      this.carousels.forEach(instance => {
        if (instance.observer) {
          instance.observer.disconnect();
        }
      });
      this.carousels = [];
    }
  };

  /**
   * MÓDULO 2: GERENCIADOR DE MODAL
   */
  const ModalManager = {
    currentModal: null,

    /**
     * Inicializa event listeners do modal
     */
    init() {
      this.attachCardListeners();
      this.attachCloseListeners();
      this.attachKeyboardListeners();
    },

    /**
     * Adiciona listeners nos cards de curso
     */
    attachCardListeners() {
      const courseCards = document.querySelectorAll(SELECTORS.courseCard);

      courseCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          this.open(SELECTORS.modal.substring(1));
        });
      });
    },

    /**
     * Adiciona listeners para fechar modal
     */
    attachCloseListeners() {
      const closeButtons = document.querySelectorAll(SELECTORS.closeModal);

      closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        });
      });
    },

    /**
     * Adiciona listener para tecla ESC
     */
    attachKeyboardListeners() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.currentModal) {
          this.close();
        }
      });
    },

    /**
     * Abre um modal pelo ID
     * @param {string} modalId - ID do modal a abrir
     */
    open(modalId) {
      const modal = document.getElementById(modalId);

      if (!modal) {
        return;
      }

      modal.classList.add('modal--visible');
      this.currentModal = modal;
      document.body.style.overflow = 'hidden';
    },

    /**
     * Fecha o modal atual
     */
    close() {
      if (!this.currentModal) {
        return;
      }

      this.currentModal.classList.remove('modal--visible');
      this.currentModal = null;
      document.body.style.overflow = '';
    }
  };

  /**
   * MÓDULO 3: GERENCIADOR DE HEADER
   */
  const HeaderManager = {
    /**
     * Inicializa comportamento do header
     */
    init() {
      const headerNode = document.querySelector(SELECTORS.header);
      const layoutNode = document.querySelector(SELECTORS.headerLayout);
      const componentNode = layoutNode || headerNode;

      if (!componentNode || !headerNode) {
        return;
      }

      componentNode.addEventListener('domfactory-component-upgraded', () => {
        if (!headerNode.mdkHeader) return;

        headerNode.mdkHeader.eventTarget.addEventListener('scroll', () => {
          const progress = headerNode.mdkHeader.getScrollState().progress;
          const navbarNode = headerNode.querySelector(SELECTORS.defaultNavbar);

          if (navbarNode) {
            navbarNode.classList.toggle('bg-transparent', progress <= NAVBAR_TRANSITION_PROGRESS);
          }
        });
      });
    }
  };

  /**
   * INICIALIZAÇÃO PRINCIPAL
   */
  function initialize() {
    try {
      CarouselManager.init();
      ModalManager.init();
      HeaderManager.init();
    } catch (error) {
      console.error('Erro ao inicializar sistema de streaming:', error);
    }
  }

  // Aguarda DOM estar carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Cleanup ao sair da página
  window.addEventListener('beforeunload', () => {
    CarouselManager.destroy();
  });

})();
