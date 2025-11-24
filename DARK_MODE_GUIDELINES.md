# Diretrizes para Implementação de Dark Mode

## 📋 Visão Geral

Este documento descreve o padrão estabelecido para implementação do Dark Mode em todas as páginas do sistema VIDDIA. O objetivo é manter consistência visual e facilitar a manutenção através de apenas **2 arquivos CSS principais**.

---

## 🎨 Estrutura de Arquivos CSS

### Arquivos Principais

1. **`app.css`** - Estilos do modo Light (padrão)
2. **`dark.css`** - Sobrescritas para modo Dark

### ❌ O que NÃO fazer

- ❌ Criar arquivos CSS específicos por página (ex: `ranking-light.css`, `ranking-dark.css`)
- ❌ Usar estilos inline com tags `<style>...</style>` dentro do HTML
- ❌ Criar variações de botões ou componentes diferentes por página

### ✅ O que fazer

- ✅ Adicionar estilos de páginas ao final do `app.css`
- ✅ Adicionar sobrescritas dark ao final do `dark.css`
- ✅ Respeitar o design system principal
- ✅ Permitir fácil customização de cores pelo cliente

---

## 🔧 Estrutura HTML Padrão

### Head Section

```html
<head>
    <!-- ... meta tags, fonts, etc ... -->

    <!-- Preloader -->
    <link type="text/css" href="../../public/vendor/spinkit.css" rel="stylesheet">

    <!-- Perfect Scrollbar -->
    <link type="text/css" href="../../public/vendor/perfect-scrollbar.css" rel="stylesheet">

    <!-- Material Design Icons -->
    <link type="text/css" href="../../public/css/material-icons.css" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link type="text/css" href="../../public/css/fontawesome.css" rel="stylesheet">

    <!-- Preloader -->
    <link type="text/css" href="../../public/css/preloader.css" rel="stylesheet">

    <!-- App CSS -->
    <link type="text/css" href="../../public/css/app.css" rel="stylesheet">

    <!-- Dark Mode Styles (loaded when html has class "dark-mode") -->
    <link type="text/css" href="../../public/css/dark.css" rel="stylesheet">
</head>
```

### HTML Tag para Dark Mode

```html
<!-- Light Mode (padrão) -->
<html lang="en" dir="ltr">

<!-- Dark Mode -->
<html lang="en" dir="ltr" class="dark-mode">
```

---

## 🎨 Paleta de Cores Dark Mode

### Backgrounds

```css
--dark-bg-primary: #00050d;      /* Background principal */
--dark-bg-secondary: #0f1218;    /* Background alternativo */
--dark-bg-card: #161a26;         /* Cards e containers */
--dark-bg-elevated: #1e293b;     /* Elementos elevados */
```

### Textos

```css
--dark-text-primary: #f2f9ff;              /* Títulos e textos principais */
--dark-text-secondary: #e2e8f0;            /* Textos secundários */
--dark-text-muted: rgba(226, 232, 240, 0.8);  /* Textos com opacidade */
--dark-text-subtle: rgba(148, 163, 184, 0.75); /* Textos sutis */
```

### Bordas e Divisores

```css
--dark-border-primary: rgba(71, 85, 105, 0.3);   /* Bordas principais */
--dark-border-subtle: rgba(71, 85, 105, 0.4);    /* Bordas sutis */
--dark-border-accent: rgba(96, 165, 250, 0.15);  /* Bordas com destaque */
```

### Cores de Destaque

```css
--dark-primary: #60a5fa;                    /* Azul primário */
--dark-primary-bg: rgba(59, 130, 246, 0.15); /* Background azul */
--dark-success: #34d399;                     /* Verde sucesso */
--dark-warning: #fbbf24;                     /* Amarelo warning */
```

---

## 📝 Padrão de Implementação

### Passo 1: Adicionar Estilos Light ao app.css

```css
/* ================================================
   [NOME DA PÁGINA] - LIGHT MODE
   ================================================ */

.page-specific-class {
    background: #f6f8fc;
    color: #0f1b33;
}

/* ... mais estilos ... */
```

### Passo 2: Adicionar Estilos Dark ao dark.css

```css
/* ================================================
   [NOME DA PÁGINA] - DARK MODE
   ================================================ */

html.dark-mode .page-specific-class {
    background: #00050d;
    color: #f2f9ff;
}

/* ... mais sobrescritas ... */
```

### Passo 3: Estilizar Navbar e Footer (IMPORTANTE!)

**SEMPRE** incluir estilos para navbar e footer no dark mode:

```css
/* ================================================
   NAVBAR & HEADER - DARK MODE
   ================================================ */

html.dark-mode .mdk-header--bg-light {
    background-color: #0f1218 !important;
}

html.dark-mode .navbar-light {
    background-color: #161a26 !important;
}

html.dark-mode .navbar-light.bg-white {
    background-color: #161a26 !important;
    border-bottom-color: rgba(71, 85, 105, 0.3) !important;
}

html.dark-mode .navbar-light .navbar-brand img {
    filter: brightness(0) invert(1);
}

html.dark-mode .navbar-light .nav-link {
    color: rgba(226, 232, 240, 0.8);
}

html.dark-mode .navbar-light .nav-link:hover,
html.dark-mode .navbar-light .nav-link:focus {
    color: #f2f9ff;
}

html.dark-mode .navbar-light .dropdown-menu {
    background-color: #161a26;
    border: 1px solid rgba(71, 85, 105, 0.3);
}

html.dark-mode .navbar-light .dropdown-item {
    color: rgba(226, 232, 240, 0.8);
}

html.dark-mode .navbar-light .dropdown-item:hover,
html.dark-mode .navbar-light .dropdown-item:focus {
    background-color: rgba(59, 130, 246, 0.1);
    color: #f2f9ff;
}

html.dark-mode .navbar-light .dropdown-divider {
    border-top-color: rgba(71, 85, 105, 0.3);
}

/* ================================================
   FOOTER - DARK MODE
   ================================================ */

html.dark-mode .bg-white.border-top-2 {
    background-color: #161a26 !important;
    border-top-color: rgba(71, 85, 105, 0.3) !important;
}

html.dark-mode .bg-white.border-top-2 .brand img {
    filter: brightness(0) invert(1);
}

html.dark-mode .bg-white.border-top-2 .text-70 {
    color: rgba(226, 232, 240, 0.7) !important;
}

html.dark-mode .bg-white.border-top-2 .text-50 {
    color: rgba(226, 232, 240, 0.5) !important;
}

html.dark-mode .bg-white.border-top-2 a.text-70:hover {
    color: rgba(226, 232, 240, 0.9) !important;
}
```

---

## ✅ Checklist de Implementação

Ao implementar dark mode em uma nova página, seguir este checklist:

- [ ] Remover todos os blocos `<style>...</style>` do HTML
- [ ] Remover referências a arquivos CSS específicos da página
- [ ] Adicionar estilos light ao final do `app.css`
- [ ] Adicionar estilos dark ao final do `dark.css`
- [ ] **Incluir estilos para navbar no dark mode**
- [ ] **Incluir estilos para footer no dark mode**
- [ ] Adicionar referência ao `dark.css` no `<head>`
- [ ] Testar a página em ambos os modos (com e sem `class="dark-mode"` no `<html>`)
- [ ] Verificar contraste de textos (acessibilidade)
- [ ] Verificar se botões seguem o design system padrão
- [ ] Verificar se logos ficam invertidos corretamente (`filter: brightness(0) invert(1)`)

---

## 🎯 Exemplos de Implementação

### Exemplo 1: student-ranking.html

✅ **Implementado corretamente:**
- Estilos movidos para `app.css` e `dark.css`
- Sem CSS inline
- Navbar e footer estilizados no dark mode
- Apenas referências a `app.css` e `dark.css`

### Exemplo 2: student-take-lesson.html

✅ **Implementado corretamente:**
- 485 linhas de estilos inline removidas
- Estilos organizados em `app.css` e `dark.css`
- Navbar e footer com estilos dark mode
- Suporte completo a dark mode

---

## 🚨 Erros Comuns a Evitar

1. **Esquecer de estilizar navbar e footer**
   - ❌ Resultado: Header e footer ficam brancos em dark mode
   - ✅ Solução: Sempre incluir estilos de navbar e footer

2. **Criar arquivos CSS específicos**
   - ❌ Resultado: Dificulta manutenção e customização
   - ✅ Solução: Usar apenas `app.css` e `dark.css`

3. **Usar estilos inline**
   - ❌ Resultado: Cliente não consegue customizar facilmente
   - ✅ Solução: Mover tudo para arquivos CSS externos

4. **Não inverter logos**
   - ❌ Resultado: Logos escuras invisíveis em dark mode
   - ✅ Solução: `filter: brightness(0) invert(1)` para logos

5. **Cores hardcoded diferentes por página**
   - ❌ Resultado: Inconsistência visual
   - ✅ Solução: Usar paleta de cores padrão

---

## 📞 Suporte

Para dúvidas ou sugestões sobre este guideline, consulte as páginas já implementadas como referência:
- `student-ranking.html` / `student-ranking-dark.html`
- `student-take-lesson.html`

---

**Última atualização:** 2025-01-08
**Versão:** 1.0
