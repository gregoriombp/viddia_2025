# Guia de Responsividade VIDDIA 2025

## Índice
1. [Breakpoints Padrão](#breakpoints-padrão)
2. [Princípios de Design Responsivo](#princípios-de-design-responsivo)
3. [Estrutura de Media Queries](#estrutura-de-media-queries)
4. [Elementos Específicos](#elementos-específicos)
5. [Checklist de Implementação](#checklist-de-implementação)
6. [Boas Práticas](#boas-práticas)

---

## Breakpoints Padrão

### Desktop
```css
/* Acima de 1024px */
/* Layout padrão desktop - nenhuma media query necessária */
```

### Tablet
```css
/* 768px - 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Grid de 2 colunas */
  /* Espaçamentos reduzidos */
  /* Fontes ligeiramente menores */
}
```

### Mobile
```css
/* 576px - 768px */
@media (min-width: 576px) and (max-width: 768px) {
  /* Layout em coluna única */
  /* Elementos empilhados verticalmente */
  /* Botões em full-width */
}
```

### Mobile Pequeno
```css
/* Até 576px */
@media (max-width: 576px) {
  /* Espaçamentos ultra-compactos */
  /* Fontes reduzidas */
  /* Padding/margin mínimos */
}
```

### Dispositivos Extra Pequenos
```css
/* Até 375px - iPhone SE, etc */
@media (max-width: 375px) {
  /* Otimizações extremas */
  /* Elementos ainda menores */
  /* Remover elementos não essenciais */
}
```

### Modo Landscape
```css
/* Altura < 500px em landscape */
@media (max-height: 500px) and (orientation: landscape) {
  /* Redução de espaçamento vertical */
  /* Layout horizontal quando possível */
  /* Elementos dispostos lado a lado */
}
```

---

## Princípios de Design Responsivo

### 1. Mobile-First
- Comece com o design mobile e expanda para desktop
- Use `min-width` para adicionar funcionalidades em telas maiores

### 2. Conteúdo Flexível
- Use unidades relativas (`rem`, `em`, `%`, `vw`, `vh`)
- Evite larguras fixas em pixels sempre que possível

### 3. Priorização de Conteúdo
- Identifique conteúdo crítico vs. secundário
- Em telas menores, oculte elementos não essenciais

### 4. Touch-Friendly
- Botões e links com pelo menos 44x44px em mobile
- Espaçamento adequado entre elementos clicáveis
- Evite hover effects em dispositivos touch

---

## Estrutura de Media Queries

### Ordem Recomendada

```css
/* ==========================================
   ESTILOS BASE (Desktop > 1024px)
   ========================================== */

/* Seus estilos desktop aqui */

/* ==========================================
   TABLET (768px - 1024px)
   ========================================== */

@media (min-width: 768px) and (max-width: 1024px) {
  /* Ajustes para tablet */
}

/* ==========================================
   MOBILE (576px - 768px)
   ========================================== */

@media (min-width: 576px) and (max-width: 768px) {
  /* Ajustes para mobile médio */
}

/* ==========================================
   MOBILE PEQUENO (até 576px)
   ========================================== */

@media (max-width: 576px) {
  /* Ajustes para mobile pequeno */
}

/* ==========================================
   EXTRA PEQUENO (até 375px)
   ========================================== */

@media (max-width: 375px) {
  /* Ajustes para dispositivos muito pequenos */
}

/* ==========================================
   LANDSCAPE (altura < 500px)
   ========================================== */

@media (max-height: 500px) and (orientation: landscape) {
  /* Ajustes para modo paisagem */
}
```

---

## Elementos Específicos

### Hero Section

#### Desktop (> 1024px)
```css
.hero-title {
  font-size: 3.3rem;
  line-height: 1.2;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
}
```

#### Tablet (768px - 1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.15rem;
    max-width: 600px;
  }
}
```

#### Mobile (576px - 768px)
```css
@media (min-width: 576px) and (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
    padding: 0 16px;
  }

  .hero-subtitle {
    font-size: 1rem;
    padding: 0 16px;
  }
}
```

#### Mobile Pequeno (até 576px)
```css
@media (max-width: 576px) {
  .hero-title {
    font-size: 1.75rem;
    padding: 0 12px;
    line-height: 1.3;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    padding: 0 12px;
  }
}
```

#### Extra Pequeno (até 375px)
```css
@media (max-width: 375px) {
  .hero-title {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  .hero-subtitle {
    font-size: 0.875rem;
    margin-bottom: 24px;
  }
}
```

### Navbar

#### Desktop (> 1024px)
```css
.navbar {
  padding: 12px 24px;
  min-height: 64px;
}

.navbar-brand img {
  width: 120px;
}
```

#### Tablet (768px - 1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .navbar {
    padding: 10px 20px;
  }

  .navbar-brand img {
    width: 110px;
  }
}
```

#### Mobile (576px - 768px)
```css
@media (min-width: 576px) and (max-width: 768px) {
  .navbar {
    padding: 8px 16px;
    min-height: 56px;
  }

  .navbar-brand img {
    width: 100px;
  }
}
```

#### Mobile Pequeno (até 576px)
```css
@media (max-width: 576px) {
  .navbar {
    padding: 6px 12px;
    min-height: 52px;
  }

  .navbar-brand img {
    width: 95px;
  }
}
```

#### Extra Pequeno (até 375px)
```css
@media (max-width: 375px) {
  .navbar {
    padding: 4px 8px;
    min-height: 48px;
  }

  .navbar-brand img {
    width: 85px;
  }
}
```

### Botões

#### Desktop (> 1024px)
```css
.btn {
  padding: 14px 28px;
  font-size: 1rem;
  min-height: 48px;
}

.btn-md {
  padding: 12px 24px;
  font-size: 0.95rem;
}
```

#### Mobile (< 768px)
```css
@media (max-width: 768px) {
  /* Touch-friendly buttons */
  .btn {
    min-height: 44px;
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  /* Full-width em mobile quando apropriado */
  .hero-cta-wrapper .btn,
  .modal__footer .btn {
    width: 100%;
    justify-content: center;
  }
}
```

#### Mobile Pequeno (até 576px)
```css
@media (max-width: 576px) {
  .btn {
    padding: 10px 16px;
    font-size: 0.875rem;
  }
}
```

### Cards/Grid

#### Desktop (> 1024px)
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
```

#### Tablet (768px - 1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
```

#### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### Footer

#### Desktop (> 1024px)
```css
.footer {
  padding: 64px 48px;
}

.footer__logo {
  width: 120px;
}
```

#### Tablet (768px - 1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .footer {
    padding: 48px 32px;
  }
}
```

#### Mobile (576px - 768px)
```css
@media (min-width: 576px) and (max-width: 768px) {
  .footer {
    padding: 40px 24px;
  }

  .footer__logo {
    width: 100px;
  }
}
```

#### Mobile Pequeno (até 576px)
```css
@media (max-width: 576px) {
  .footer {
    padding: 32px 16px;
  }

  .footer__logo {
    width: 90px;
  }

  .footer__text {
    font-size: 0.875rem;
  }
}
```

### Modais

#### Desktop (> 1024px)
```css
.modal__dialog {
  width: 90%;
  max-width: 520px;
  padding: 40px;
}
```

#### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .modal__dialog {
    width: 95%;
    padding: 24px 20px;
  }

  .modal__header h2 {
    font-size: 1.5rem;
  }

  .modal__footer {
    flex-direction: column;
    gap: 12px;
  }

  .modal__footer .btn {
    width: 100%;
  }
}
```

#### Extra Pequeno (até 375px)
```css
@media (max-width: 375px) {
  .modal__dialog {
    width: 96%;
    padding: 20px 16px;
  }

  .modal__header h2 {
    font-size: 1.2rem;
  }
}
```

---

## Checklist de Implementação

### Antes de Começar
- [ ] Identificar breakpoints necessários para a página
- [ ] Revisar designs mobile e desktop
- [ ] Listar elementos que precisam de ajustes

### Durante a Implementação
- [ ] Criar estilos base (desktop first)
- [ ] Adicionar media query para tablet (768-1024px)
- [ ] Adicionar media query para mobile (576-768px)
- [ ] Adicionar media query para mobile pequeno (até 576px)
- [ ] Adicionar media query para extra pequeno (até 375px)
- [ ] Adicionar media query para landscape (altura < 500px)

### Elementos a Ajustar
- [ ] **Hero Section**: títulos, subtítulos, logos, CTAs
- [ ] **Navbar**: logo, links, altura, padding
- [ ] **Botões**: tamanho, padding, largura
- [ ] **Cards/Grid**: colunas, gap, tamanho
- [ ] **Imagens**: tamanho, aspect ratio
- [ ] **Formulários**: largura, altura de inputs
- [ ] **Modais**: largura, padding, botões
- [ ] **Footer**: padding, tamanho de logo, texto

### Testes
- [ ] Testar em Chrome DevTools (todos os breakpoints)
- [ ] Testar em dispositivo real iPhone SE (375px)
- [ ] Testar em dispositivo real iPhone 12/13/14 (390px)
- [ ] Testar em dispositivo real tablet (768px)
- [ ] Testar rotação landscape/portrait
- [ ] Verificar touch targets (mínimo 44x44px)
- [ ] Verificar overflow horizontal (não deve existir)

### Refinamento
- [ ] Ajustar espaçamentos se necessário
- [ ] Verificar legibilidade de textos
- [ ] Garantir hierarquia visual
- [ ] Otimizar performance (remover transitions desnecessárias em mobile)

---

## Boas Práticas

### 1. Typography Scaling

Use uma escala de tamanhos consistente:

```css
/* Desktop */
h1 { font-size: 3rem; }
h2 { font-size: 2.5rem; }
h3 { font-size: 2rem; }
p { font-size: 1rem; }

/* Mobile (576px) */
@media (max-width: 576px) {
  h1 { font-size: 1.75rem; }  /* ~58% do desktop */
  h2 { font-size: 1.5rem; }   /* ~60% do desktop */
  h3 { font-size: 1.25rem; }  /* ~62% do desktop */
  p { font-size: 0.9rem; }    /* ~90% do desktop */
}
```

### 2. Spacing Scaling

Use variáveis CSS para consistência:

```css
:root {
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  --spacing-xxl: 64px;
}

/* Mobile */
@media (max-width: 576px) {
  :root {
    --spacing-xs: 6px;
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
  }
}
```

### 3. Touch Targets

```css
/* Garantir mínimo 44x44px em mobile */
@media (max-width: 768px) {
  .btn,
  .nav-link,
  a,
  button {
    min-height: 44px;
    min-width: 44px;
    padding: 12px;
  }
}
```

### 4. Hover Effects

```css
/* Desabilitar hover em dispositivos touch */
@media (hover: hover) {
  .card:hover {
    transform: scale(1.05);
  }
}

/* Ou usar media query de largura */
@media (min-width: 1024px) {
  .card:hover {
    transform: scale(1.05);
  }
}
```

### 5. Performance

```css
/* Reduzir transições em mobile */
@media (max-width: 768px) {
  * {
    transition-duration: 0.2s;
  }

  /* Remover animações pesadas */
  .heavy-animation {
    animation: none;
  }
}
```

### 6. Overflow Prevention

```css
/* Prevenir scroll horizontal */
body,
html {
  overflow-x: hidden;
}

/* Garantir que elementos não ultrapassem viewport */
img,
video,
iframe {
  max-width: 100%;
  height: auto;
}
```

### 7. Container Padding

```css
.container {
  padding-left: 48px;
  padding-right: 48px;
}

@media (max-width: 1024px) {
  .container {
    padding-left: 32px;
    padding-right: 32px;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
}

@media (max-width: 375px) {
  .container {
    padding-left: 8px;
    padding-right: 8px;
  }
}
```

### 8. Image Optimization

```css
/* Aspect ratio fixo para evitar layout shift */
.image-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 9. Flexbox/Grid Responsivo

```css
/* Desktop: grid de 4 colunas */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Tablet: 2 colunas */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Mobile: 1 coluna */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### 10. Z-Index Management

```css
/* Definir camadas de z-index */
:root {
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
}

/* Garantir que modais fiquem acima em mobile */
@media (max-width: 768px) {
  .modal {
    z-index: var(--z-modal);
  }

  .modal__backdrop {
    z-index: var(--z-modal-backdrop);
  }
}
```

---

## Exemplos Práticos

### Exemplo 1: Hero Section Completo

```css
/* ==========================================
   HERO SECTION - BASE (Desktop)
   ========================================== */

.hero {
  padding: 120px 48px;
  text-align: center;
}

.hero__logo {
  width: 240px;
  margin-bottom: 32px;
}

.hero__title {
  font-size: 3.3rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 24px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero__subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 48px;
}

.hero__cta {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.hero__cta .btn {
  padding: 14px 32px;
  font-size: 1rem;
}

/* ==========================================
   HERO - TABLET (768px - 1024px)
   ========================================== */

@media (min-width: 768px) and (max-width: 1024px) {
  .hero {
    padding: 96px 32px;
  }

  .hero__logo {
    width: 200px;
    margin-bottom: 28px;
  }

  .hero__title {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .hero__subtitle {
    font-size: 1.15rem;
    max-width: 600px;
    margin-bottom: 40px;
  }

  .hero__cta .btn {
    padding: 12px 28px;
    font-size: 0.95rem;
  }
}

/* ==========================================
   HERO - MOBILE (576px - 768px)
   ========================================== */

@media (min-width: 576px) and (max-width: 768px) {
  .hero {
    padding: 72px 24px;
  }

  .hero__logo {
    width: 180px;
    margin-bottom: 24px;
  }

  .hero__title {
    font-size: 2rem;
    margin-bottom: 16px;
  }

  .hero__subtitle {
    font-size: 1rem;
    max-width: 500px;
    margin-bottom: 32px;
  }

  .hero__cta {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .hero__cta .btn {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
}

/* ==========================================
   HERO - MOBILE PEQUENO (até 576px)
   ========================================== */

@media (max-width: 576px) {
  .hero {
    padding: 56px 16px;
  }

  .hero__logo {
    width: 160px;
    margin-bottom: 20px;
  }

  .hero__title {
    font-size: 1.75rem;
    margin-bottom: 14px;
    line-height: 1.3;
  }

  .hero__subtitle {
    font-size: 0.95rem;
    margin-bottom: 28px;
  }

  .hero__cta .btn {
    max-width: 100%;
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}

/* ==========================================
   HERO - EXTRA PEQUENO (até 375px)
   ========================================== */

@media (max-width: 375px) {
  .hero {
    padding: 48px 12px;
  }

  .hero__logo {
    width: 140px;
    margin-bottom: 16px;
  }

  .hero__title {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  .hero__subtitle {
    font-size: 0.875rem;
    margin-bottom: 24px;
  }

  .hero__cta .btn {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
}

/* ==========================================
   HERO - LANDSCAPE (altura < 500px)
   ========================================== */

@media (max-height: 500px) and (orientation: landscape) {
  .hero {
    padding: 32px 24px;
  }

  .hero__logo {
    width: 120px;
    margin-bottom: 12px;
  }

  .hero__title {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }

  .hero__subtitle {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }

  .hero__cta {
    flex-direction: row;
    gap: 12px;
  }

  .hero__cta .btn {
    width: auto;
    min-width: 140px;
    padding: 8px 20px;
    font-size: 0.85rem;
  }
}
```

---

## Ferramentas de Teste

### Chrome DevTools
1. Abra DevTools (F12)
2. Clique no ícone de dispositivo móvel (Ctrl+Shift+M)
3. Teste nos seguintes tamanhos:
   - iPhone SE: 375x667
   - iPhone 12/13/14: 390x844
   - iPad: 768x1024
   - iPad Pro: 1024x1366
   - Desktop: 1920x1080

### Firefox Responsive Design Mode
1. Abra DevTools (F12)
2. Clique no ícone de dispositivo móvel (Ctrl+Shift+M)
3. Teste orientações portrait e landscape

### Testes em Dispositivos Reais
- iPhone SE (375px) - crítico
- iPhone 12/13/14 (390px)
- Samsung Galaxy S20/S21 (360px/412px)
- iPad (768px)
- iPad Pro (1024px)

---

## Resumo Final

### Arquitetura de Breakpoints

1. **Desktop (> 1024px)**: Estilos base, layout completo
2. **Tablet (768-1024px)**: Grid 2 colunas, espaçamentos reduzidos
3. **Mobile (576-768px)**: Coluna única, elementos empilhados
4. **Mobile Pequeno (até 576px)**: Ultra compacto
5. **Extra Pequeno (até 375px)**: Otimizações extremas
6. **Landscape (altura < 500px)**: Compressão vertical

### Prioridades

1. ✅ Garantir legibilidade em todos os tamanhos
2. ✅ Touch targets mínimos de 44x44px
3. ✅ Evitar scroll horizontal
4. ✅ Otimizar performance em mobile
5. ✅ Testar em dispositivos reais

### Workflow

1. Desenvolver versão desktop
2. Adicionar media queries do maior para o menor
3. Testar cada breakpoint
4. Refinar e ajustar
5. Testar em dispositivos reais

---

**Data de criação**: 2025-12-03
**Versão**: 1.0
**Projeto**: VIDDIA 2025 Interface
