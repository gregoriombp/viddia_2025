# Instruções: Adicionar Controle de Tema Dark/Light

Este documento contém as instruções para adicionar o controle de alternância entre modo claro e escuro no menu dropdown do avatar em outras páginas do sistema.

## Pré-requisitos

1. A página deve ter o arquivo CSS dark mode carregado:
   ```html
   <link type="text/css" href="../../public/css/dark.css" rel="stylesheet" />
   ```

2. O elemento HTML deve ter a classe inicial `light-mode`:
   ```html
   <html lang="en" dir="ltr" class="light-mode">
   ```

## Passo 1: Adicionar o item no menu dropdown

Localize o menu dropdown do avatar (geralmente dentro de `<div class="dropdown-menu dropdown-menu-right">`) e adicione o seguinte código entre "Preferências" e "Logout":

```html
<div class="dropdown-divider"></div>
<a href="#" class="dropdown-item" id="theme-toggle">
  <i class="material-symbols-rounded icon-16pt mr-8pt" id="theme-icon">light_mode</i>
  <span id="theme-text">Modo Escuro</span>
</a>
<div class="dropdown-divider"></div>
```

### Estrutura completa do menu:

```html
<div class="dropdown-menu dropdown-menu-right">
  <a href="index.html" class="dropdown-item">Início</a>
  <a href="student-dashboard.html" class="dropdown-item">Dashboard</a>

  <a href="edit-account-profile.html" class="dropdown-item">Preferências</a>

  <div class="dropdown-divider"></div>
  <a href="#" class="dropdown-item" id="theme-toggle">
    <i class="material-symbols-rounded icon-16pt mr-8pt" id="theme-icon">light_mode</i>
    <span id="theme-text">Modo Escuro</span>
  </a>
  <div class="dropdown-divider"></div>

  <a href="login.html" class="dropdown-item">Logout</a>
</div>
```

## Passo 2: Adicionar o script JavaScript

Adicione o seguinte script antes do fechamento da tag `</body>` (após todos os outros scripts):

```html
<!-- Theme Toggle Script -->
<script>
  // Verificar preferência salva ou usar light mode como padrão
  const currentTheme = localStorage.getItem('theme') || 'light';
  const htmlElement = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  // Aplicar tema inicial
  function setTheme(theme) {
    if (theme === 'dark') {
      htmlElement.classList.remove('light-mode');
      htmlElement.classList.add('dark-mode');
      themeIcon.textContent = 'dark_mode';
      themeText.textContent = 'Modo Claro';
    } else {
      htmlElement.classList.remove('dark-mode');
      htmlElement.classList.add('light-mode');
      themeIcon.textContent = 'light_mode';
      themeText.textContent = 'Modo Escuro';
    }
    localStorage.setItem('theme', theme);
  }

  // Aplicar tema salvo ao carregar a página
  setTheme(currentTheme);

  // Toggle do tema ao clicar
  themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    const newTheme = htmlElement.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
  });
</script>
```

## Como funciona

1. **localStorage**: A preferência do usuário é salva no navegador usando `localStorage.getItem('theme')` e `localStorage.setItem('theme', theme)`

2. **Classes CSS**:
   - Modo claro: `class="light-mode"` no elemento `<html>`
   - Modo escuro: `class="dark-mode"` no elemento `<html>`

3. **Interface dinâmica**:
   - No modo claro: mostra ícone "light_mode" ☀️ e texto "Modo Escuro"
   - No modo escuro: mostra ícone "dark_mode" 🌙 e texto "Modo Claro"

4. **Persistência**: A preferência é mantida entre páginas e sessões do navegador

## Páginas onde aplicar

Você pode aplicar estas mesmas instruções em todas as páginas que possuem o menu dropdown do avatar, incluindo:

- student-dashboard.html
- student-course.html
- student-take-lesson.html
- edit-account-profile.html
- E outras páginas do aluno/usuário

## Notas importantes

- Os IDs (`theme-toggle`, `theme-icon`, `theme-text`) devem ser únicos em cada página
- O script deve ser adicionado após o carregamento do jQuery e Bootstrap
- Certifique-se de que o arquivo `dark.css` está carregado no `<head>` da página
- O ícone usa Material Symbols Rounded, certifique-se de que a fonte está carregada

## Exemplo de referência

Veja a implementação completa em:
`/html/html/student-path copy 2.html` (linhas 143-146 e 1530-1563)
