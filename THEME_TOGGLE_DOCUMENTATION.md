# Documentação: Controle de Tema Dark/Light Mode

## Visão Geral

Implementação de um controle de alternância entre modo escuro (dark) e modo claro (light) integrado ao menu dropdown do avatar do usuário na página inicial do VIDDIA.

## Data de Implementação
2025-11-24

---

## Arquivos Modificados e Criados

### 1. Arquivo Modificado: `html/html/index.html`

#### Alteração 1: Estilos CSS do Switch Toggle (Linhas 77-137)
Adicionado bloco de estilos dentro do `<head>` para o switch toggle:

```html
<!-- Theme Toggle Switch Styles -->
<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .3s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }

  .slider.round {
    border-radius: 24px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  #theme-toggle-item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  html.dark-mode #theme-toggle-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
</style>
```

#### Alteração 2: Item no Dropdown do Avatar (Linhas 150-160)
Adicionado novo item no menu dropdown:

```html
<div class="dropdown-divider"></div>

<!-- Theme Toggle -->
<div class="dropdown-item d-flex align-items-center justify-content-between" style="cursor: pointer;" id="theme-toggle-item">
  <div class="d-flex align-items-center">
    <span class="material-icons mr-2" id="theme-icon">dark_mode</span>
    <span id="theme-label">Modo Escuro</span>
  </div>
  <label class="switch mb-0" style="margin-left: 16px;">
    <input type="checkbox" id="theme-toggle-checkbox" checked>
    <span class="slider round"></span>
  </label>
</div>

<div class="dropdown-divider"></div>
```

#### Alteração 3: Inclusão do Script (Linha 1164)
Adicionado script após o app.js:

```html
<!-- Theme Toggle -->
<script src="../../public/js/theme-toggle.js"></script>
```

---

### 2. Arquivo Criado: `public/js/theme-toggle.js`

Módulo JavaScript completo para gerenciar a alternância de temas:

```javascript
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
```

---

## Como Funciona

### 1. Inicialização
Quando a página carrega:
- O script verifica se existe uma preferência de tema salva no `localStorage`
- Se existir, aplica o tema salvo
- Se não existir, usa o tema atual do HTML (definido pela classe `dark-mode`) e salva como preferência

### 2. Alternância de Tema
Quando o usuário clica no toggle:
- A classe `dark-mode` é adicionada ou removida do elemento `<html>`
- O ícone e o texto são atualizados dinamicamente:
  - **Modo Escuro**: ícone `dark_mode` (lua) + texto "Modo Escuro"
  - **Modo Claro**: ícone `light_mode` (sol) + texto "Modo Claro"
- A nova preferência é salva no localStorage
- O switch visual (checkbox) é atualizado

### 3. Persistência
- **Chave do localStorage**: `viddia-theme-preference`
- **Valores possíveis**: `'dark'` ou `'light'`
- A preferência é mantida entre sessões do navegador

### 4. Integração com CSS
O tema funciona através da classe CSS `dark-mode` no elemento `<html>`:

```css
/* Modo escuro ativo quando a classe existe */
html.dark-mode {
  /* Estilos do modo escuro */
}
```

Os arquivos CSS existentes já estão preparados:
- `public/css/dark.css` - Contém todos os estilos para modo escuro
- `public/css/index-dark.css` - Estilos específicos da página index em modo escuro

---

## Como Usar

### Para o Usuário Final

1. Clique no avatar no canto superior direito
2. No menu dropdown que aparecer, localize o item "Modo Escuro" ou "Modo Claro"
3. Clique no item ou no switch para alternar o tema
4. O tema muda instantaneamente
5. Sua preferência fica salva automaticamente

### Para Desenvolvedores

#### Replicar em Outras Páginas

Para adicionar o controle de tema em outras páginas HTML:

1. **Copie os estilos CSS** do switch toggle para o `<head>` da página
2. **Adicione o HTML do toggle** no dropdown do avatar
3. **Inclua o script** antes do fechamento do `</body>`:
   ```html
   <script src="../../public/js/theme-toggle.js"></script>
   ```
4. Certifique-se de que os arquivos CSS de tema estão carregados:
   ```html
   <link type="text/css" href="../../public/css/dark.css" rel="stylesheet" />
   ```

#### Customizar Ícones ou Textos

Edite a função `updateToggleUI()` em `theme-toggle.js`:

```javascript
function updateToggleUI(theme) {
  const isDark = theme === THEMES.DARK;

  themeToggleCheckbox.checked = isDark;

  if (isDark) {
    themeIcon.textContent = 'seu_icone_escuro';  // Altere aqui
    themeLabel.textContent = 'Seu Texto Escuro'; // Altere aqui
  } else {
    themeIcon.textContent = 'seu_icone_claro';   // Altere aqui
    themeLabel.textContent = 'Seu Texto Claro';  // Altere aqui
  }
}
```

#### Alterar a Chave do localStorage

Modifique a constante no início do script:

```javascript
const THEME_STORAGE_KEY = 'sua-chave-personalizada';
```

---

## Detalhes Técnicos

### Estrutura do Código

**Padrão**: IIFE (Immediately Invoked Function Expression)
- Evita poluir o escopo global
- Encapsula variáveis e funções

**Compatibilidade**:
- Usa `classList` API (suportado por todos os navegadores modernos)
- Usa `localStorage` API
- Não requer bibliotecas externas

**Eventos**:
- `DOMContentLoaded`: Garante que o DOM está pronto antes de executar
- `click`: No item do dropdown e no checkbox
- `stopPropagation()`: Previne que o dropdown feche ao clicar no toggle

### Elementos DOM Utilizados

| ID | Tipo | Função |
|---|---|---|
| `theme-toggle-item` | `<div>` | Container principal do toggle |
| `theme-toggle-checkbox` | `<input>` | Checkbox do switch |
| `theme-icon` | `<span>` | Ícone Material Icons |
| `theme-label` | `<span>` | Texto do label |

### Classes CSS Importantes

| Classe | Aplicada em | Função |
|---|---|---|
| `.dark-mode` | `<html>` | Ativa o modo escuro |
| `.switch` | `<label>` | Container do switch toggle |
| `.slider` | `<span>` | Parte visual do slider |
| `.round` | `.slider` | Torna o slider arredondado |

---

## Testes Sugeridos

### Checklist de Teste

- [ ] Toggle alterna corretamente entre dark e light mode
- [ ] Ícone muda de `dark_mode` para `light_mode`
- [ ] Texto muda de "Modo Escuro" para "Modo Claro"
- [ ] Switch visual se move corretamente
- [ ] Preferência é salva no localStorage
- [ ] Ao recarregar a página, o tema salvo é aplicado
- [ ] Dropdown não fecha ao clicar no toggle
- [ ] Animações são suaves (300ms de transição)
- [ ] Hover funciona em ambos os temas
- [ ] Funciona em diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Funciona em dispositivos móveis

### Testar localStorage

Abra o console do navegador e execute:

```javascript
// Ver preferência salva
localStorage.getItem('viddia-theme-preference');

// Limpar preferência
localStorage.removeItem('viddia-theme-preference');

// Definir preferência manualmente
localStorage.setItem('viddia-theme-preference', 'dark');
localStorage.setItem('viddia-theme-preference', 'light');
```

---

## Possíveis Melhorias Futuras

1. **Transição Suave de Cores**
   - Adicionar `transition` nas propriedades CSS de cores

2. **Detecção de Preferência do Sistema**
   - Usar `prefers-color-scheme` media query como fallback

3. **Animação ao Trocar de Tema**
   - Fade-in/fade-out suave

4. **Atalho de Teclado**
   - Exemplo: `Ctrl/Cmd + Shift + D` para alternar

5. **Sincronização Entre Abas**
   - Usar `storage` event para sincronizar tema entre múltiplas abas

6. **Tema Automático por Horário**
   - Modo claro durante o dia, escuro à noite

---

## Troubleshooting

### O tema não muda ao clicar

**Possíveis causas:**
- Verificar se o script está carregado corretamente
- Verificar erros no console do navegador
- Confirmar que os IDs dos elementos correspondem ao JavaScript

**Solução:**
```javascript
// Adicionar console.log para debug
console.log('Theme Toggle initialized');
```

### O tema não persiste após recarregar

**Possíveis causas:**
- localStorage pode estar desabilitado no navegador
- Navegação em modo anônimo/privado

**Solução:**
- Verificar se localStorage está disponível:
```javascript
if (typeof(Storage) !== "undefined") {
  console.log("localStorage disponível");
} else {
  console.log("localStorage NÃO disponível");
}
```

### Estilos do modo escuro não aplicam

**Possíveis causas:**
- Arquivo `dark.css` não está carregado
- Caminho do arquivo CSS está incorreto
- Especificidade CSS muito baixa

**Solução:**
- Verificar se os arquivos CSS estão sendo carregados
- Inspecionar elemento no DevTools para ver quais estilos estão sendo aplicados

---

## Suporte

Para dúvidas ou problemas relacionados a esta implementação:
- Revisar este documento
- Verificar o console do navegador para erros
- Testar em modo de desenvolvedor do navegador

---

## Histórico de Versões

### v1.0.0 - 2025-11-24
- Implementação inicial do controle de tema
- Toggle no dropdown do avatar
- Persistência via localStorage
- Ícones e textos dinâmicos
- Estilos de switch animado

---

**Documentação criada por**: Claude (Anthropic)
**Projeto**: VIDDIA - 2025 Interface
**Versão do Projeto**: viddia_25_004
