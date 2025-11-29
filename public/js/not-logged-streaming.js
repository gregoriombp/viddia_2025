/**
 * NOT-LOGGED-STREAMING.JS
 * Gerenciamento de carrosséis e modal para experiência streaming
 * Página: index-not-logged.html
 */

(function() {
  'use strict';

  /**
   * MÓDULO 1: GERENCIADOR DE CARROSSÉIS
   * Responsável por:
   * - Inicializar todos os carrosséis da página
   * - Gerenciar scroll horizontal com botões de navegação
   * - Atualizar estado dos botões (disabled) conforme scroll
   * - Observar redimensionamento para ajustar comportamento
   */
  const CarouselManager = {
    /**
     * Inicializa todos os carrosséis encontrados na página
     */
    init() {
      const carousels = document.querySelectorAll('[data-carousel-id]');

      if (carousels.length === 0) {
        console.warn('Nenhum carrossel encontrado na página');
        return;
      }

      carousels.forEach(carousel => {
        this.setupCarousel(carousel);
      });

      console.log(`${carousels.length} carrossel(is) inicializado(s)`);
    },

    /**
     * Configura um carrossel individual
     * @param {HTMLElement} carouselEl - Elemento raiz do carrossel
     */
    setupCarousel(carouselEl) {
      const viewport = carouselEl.querySelector('.carousel-viewport');
      const prevBtn = carouselEl.querySelector('.carousel-btn--prev');
      const nextBtn = carouselEl.querySelector('.carousel-btn--next');

      // Validação: garantir que os elementos existam
      if (!viewport || !prevBtn || !nextBtn) {
        console.warn('Estrutura incompleta do carrossel:', carouselEl);
        return;
      }

      // Event listeners para os botões
      prevBtn.addEventListener('click', () => {
        this.scroll(viewport, -1); // Scroll para esquerda
      });

      nextBtn.addEventListener('click', () => {
        this.scroll(viewport, 1); // Scroll para direita
      });

      // Atualizar estado dos botões ao fazer scroll
      viewport.addEventListener('scroll', () => {
        this.updateButtons(viewport, prevBtn, nextBtn);
      });

      // ResizeObserver para atualizar botões quando viewport mudar de tamanho
      // Importante para responsividade
      const resizeObserver = new ResizeObserver(() => {
        this.updateButtons(viewport, prevBtn, nextBtn);
      });
      resizeObserver.observe(viewport);

      // Definir estado inicial dos botões
      this.updateButtons(viewport, prevBtn, nextBtn);
    },

    /**
     * Realiza scroll suave no viewport
     * @param {HTMLElement} viewport - Elemento scrollável
     * @param {number} direction - Direção: -1 (esquerda) ou 1 (direita)
     */
    scroll(viewport, direction) {
      // Calcula quanto scrollar: 70% da largura visível
      // Isso garante que sempre mostramos novos cards sem cortar muito
      const scrollAmount = viewport.clientWidth * 0.7;

      viewport.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth' // Scroll suave nativo do navegador
      });
    },

    /**
     * Atualiza estado disabled dos botões baseado na posição do scroll
     * @param {HTMLElement} viewport - Elemento scrollável
     * @param {HTMLElement} prevBtn - Botão anterior
     * @param {HTMLElement} nextBtn - Botão próximo
     */
    updateButtons(viewport, prevBtn, nextBtn) {
      const scrollLeft = viewport.scrollLeft;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;

      // Desabilita botão prev se estiver no início
      // Margem de 1px para evitar problemas de arredondamento
      prevBtn.disabled = scrollLeft <= 1;

      // Desabilita botão next se estiver no fim
      nextBtn.disabled = scrollLeft >= maxScroll - 1;
    }
  };

  /**
   * MÓDULO 2: GERENCIADOR DE MODAL
   * Responsável por:
   * - Abrir/fechar modal de login
   * - Gerenciar cliques nos cards de curso
   * - Gerenciar fechamento via ESC, backdrop ou botão X
   * - Prevenir scroll do body quando modal está aberto
   */
  const ModalManager = {
    currentModal: null,

    /**
     * Inicializa event listeners do modal
     */
    init() {
      // Listeners nos cards de curso para abrir modal
      this.attachCardListeners();

      // Listeners para fechar modal (botão X e backdrop)
      this.attachCloseListeners();

      // Listener para tecla ESC
      this.attachKeyboardListeners();

      console.log('Modal Manager inicializado');
    },

    /**
     * Adiciona listeners nos cards de curso
     * Quando clicado, abre modal de login
     */
    attachCardListeners() {
      const courseCards = document.querySelectorAll('.carousel-card');

      courseCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault(); // Prevenir navegação padrão

          // Pode extrair informações do card se necessário
          const courseId = card.dataset.courseId || '';

          // Abrir modal de login
          this.open('login-modal');
        });
      });

      if (courseCards.length > 0) {
        console.log(`Listeners adicionados em ${courseCards.length} cards de curso`);
      }
    },

    /**
     * Adiciona listeners para fechar modal
     */
    attachCloseListeners() {
      const closeButtons = document.querySelectorAll('[data-close-modal]');

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
        console.error(`Modal com ID "${modalId}" não encontrado`);
        return;
      }

      // Adiciona classe para mostrar modal
      modal.classList.add('modal--visible');
      this.currentModal = modal;

      // Prevenir scroll do body enquanto modal está aberto
      document.body.style.overflow = 'hidden';

      console.log(`Modal "${modalId}" aberto`);
    },

    /**
     * Fecha o modal atual
     */
    close() {
      if (!this.currentModal) {
        return;
      }

      // Remove classe de visibilidade
      this.currentModal.classList.remove('modal--visible');

      // Limpa referência
      const modalId = this.currentModal.id;
      this.currentModal = null;

      // Restaurar scroll do body
      document.body.style.overflow = '';

      console.log(`Modal "${modalId}" fechado`);
    }
  };

  /**
   * INICIALIZAÇÃO PRINCIPAL
   * Aguarda o DOM estar pronto antes de inicializar os módulos
   */
  function initialize() {
    // Inicializa gerenciador de carrosséis
    CarouselManager.init();

    // Inicializa gerenciador de modal
    ModalManager.init();

    console.log('Sistema de streaming inicializado com sucesso');
  }

  // Aguarda DOM estar carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM já está pronto
    initialize();
  }

})();
