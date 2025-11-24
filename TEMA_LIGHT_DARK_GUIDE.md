# Guia de Implementação - Sistema de Temas Light/Dark

## 📋 Visão Geral

Este documento descreve o padrão adotado para implementar temas Light e Dark nas páginas HTML do projeto VIDDIA.

---

## 🗂️ Estrutura de Arquivos

```
public/css/
├── app.css                          → Estilos base (sempre carregado)
├── dark.css                         → Estilos dark mode genéricos (sempre carregado)
├── pages/
│   ├── [nome-pagina]-light.css     → Estilos específicos light mode da página
│   └── [nome-pagina]-dark.css      → Estilos específicos dark mode da página
```

### Exemplo (página ranking):
```
public/css/pages/
├── ranking-light.css
└── ranking-dark.css
```

---

## 🎨 Como Funciona

### 1. Definição do Tema no HTML

O tema é definido através de uma classe na tag `<html>`:

```html
<!-- LIGHT MODE -->
<html lang="en" dir="ltr" class="light-mode">

<!-- DARK MODE -->
<html lang="en" dir="ltr" class="dark-mode">
```

### 2. Carregamento dos Arquivos CSS

No `<head>` da página HTML, carregue os arquivos na seguinte ordem:

```html
<head>
    <!-- ... outras tags meta ... -->

    <!-- 1. CSS Base (sempre carregado) -->
    <link type="text/css" href="../../public/css/app.css" rel="stylesheet">

    <!-- 2. CSS Específico da Página - Light Mode -->
    <link type="text/css" href="../../public/css/pages/[nome-pagina]-light.css" rel="stylesheet">

    <!-- 3. CSS Dark Mode (sempre carregado, mas só aplica se html.dark-mode) -->
    <link type="text/css" href="../../public/css/dark.css" rel="stylesheet">
    <link type="text/css" href="../../public/css/pages/[nome-pagina]-dark.css" rel="stylesheet">
</head>
```

---

## 📝 Padrão de Escrita dos CSS

### Arquivo Light Mode (`[nome-pagina]-light.css`)

Escreva os estilos **SEM** seletor de classe no `html`:

```css
/* ✅ CORRETO - Light Mode */
.minha-classe {
    background: #ffffff;
    color: #000000;
}

.outro-componente {
    border: 1px solid #e0e0e0;
}
```

### Arquivo Dark Mode (`[nome-pagina]-dark.css`)

Escreva os estilos **COM** o seletor `html.dark-mode`:

```css
/* ✅ CORRETO - Dark Mode */
html.dark-mode .minha-classe {
    background: #1a1a1a;
    color: #ffffff;
}

html.dark-mode .outro-componente {
    border: 1px solid #333333;
}
```

---

## 🎯 Diretrizes de Cores

### Light Mode
- **Backgrounds principais**: `#ffffff`, `#f5f7ff`, `#eef1ff`
- **Textos principais**: `#141b38`, `#1f2a56`, `#2c324a`
- **Textos secundários**: `#6c789c`, `#657098`
- **Bordas**: `rgba(81, 97, 150, 0.12)` a `rgba(81, 97, 150, 0.3)`
- **Sombras**: `rgba(22, 30, 78, 0.12)` a `rgba(33, 49, 120, 0.32)`

### Dark Mode
- **Backgrounds principais**: `#00050d`, `#161a26`, `#1a1f35`
- **Textos principais**: `#e2e8f0`, `#cbd5e1`, `#f2f9ff`
- **Textos secundários**: `rgba(148, 163, 184, 0.8)` a `rgba(148, 163, 184, 0.9)`
- **Bordas**: `rgba(96, 165, 250, 0.1)` a `rgba(96, 165, 250, 0.15)`
- **Sombras**: `rgba(0, 0, 0, 0.4)` a `rgba(0, 0, 0, 0.6)`

### Cores de Destaque (mantêm-se similares, com ajustes de brilho)
- **Primary Blue (Light)**: `#5465ff`, `#4650b8`
- **Primary Blue (Dark)**: `#60a5fa`, `#93c5fd`
- **Success Green (Light)**: `#2abf8a`
- **Success Green (Dark)**: `#34d399`
- **Warning/Coins (Light)**: `#f5a623`
- **Warning/Coins (Dark)**: `#fbbf24`

---

## 🔄 Passo a Passo para Adicionar Temas em Nova Página

### Passo 1: Extrair Estilos Inline
Se a página tem um `<style>` inline no `<head>`, copie todo o conteúdo.

### Passo 2: Criar Arquivo Light Mode
1. Crie: `public/css/pages/[nome-pagina]-light.css`
2. Cole os estilos extraídos
3. Organize e documente com comentários

### Passo 3: Criar Arquivo Dark Mode
1. Crie: `public/css/pages/[nome-pagina]-dark.css`
2. Copie a estrutura do arquivo light
3. Adicione `html.dark-mode` antes de cada seletor
4. Ajuste as cores seguindo as diretrizes acima

### Passo 4: Atualizar o HTML
1. Adicione a classe no `<html>`:
   ```html
   <html lang="en" dir="ltr" class="light-mode">
   ```

2. Substitua o `<style>` inline pelos links dos CSS:
   ```html
   <!-- App CSS -->
   <link type="text/css" href="../../public/css/app.css" rel="stylesheet">

   <!-- Página - Light Mode -->
   <link type="text/css" href="../../public/css/pages/[nome]-light.css" rel="stylesheet">

   <!-- Dark Mode -->
   <link type="text/css" href="../../public/css/dark.css" rel="stylesheet">
   <link type="text/css" href="../../public/css/pages/[nome]-dark.css" rel="stylesheet">
   ```

### Passo 5: Criar Versão de Teste Dark
1. Copie o arquivo HTML (ex: `pagina.html` → `pagina-dark.html`)
2. Altere a classe para `dark-mode`:
   ```html
   <html lang="en" dir="ltr" class="dark-mode">
   ```

---

## 📊 Exemplo Completo: Página Ranking

### Estrutura de Arquivos
```
html/html/
├── student-ranking.html          → versão light
└── student-ranking-dark.html     → versão dark (para teste)

public/css/pages/
├── ranking-light.css
└── ranking-dark.css
```

### HTML (student-ranking.html)
```html
<!DOCTYPE html>
<html lang="en" dir="ltr" class="light-mode">
<head>
    <!-- ... meta tags ... -->

    <link type="text/css" href="../../public/css/app.css" rel="stylesheet">
    <link type="text/css" href="../../public/css/pages/ranking-light.css" rel="stylesheet">
    <link type="text/css" href="../../public/css/dark.css" rel="stylesheet">
    <link type="text/css" href="../../public/css/pages/ranking-dark.css" rel="stylesheet">
</head>
<body>
    <!-- conteúdo -->
</body>
</html>
```

### CSS Light (ranking-light.css)
```css
.student-ranking-page {
    background: linear-gradient(160deg, #f5f7ff 0%, #eef1ff 35%, #ffffff 100%);
}

.student-ranking-page .ranking-card {
    background: #ffffff;
    box-shadow: 0 32px 68px rgba(22, 30, 78, 0.12);
}
```

### CSS Dark (ranking-dark.css)
```css
html.dark-mode .student-ranking-page {
    background: linear-gradient(160deg, #0a0d1a 0%, #0f1218 35%, #00050d 100%);
}

html.dark-mode .student-ranking-page .ranking-card {
    background: #161a26;
    box-shadow: 0 32px 68px rgba(0, 0, 0, 0.5);
}
```

---

## 🚀 Troca Dinâmica de Tema (Futuro)

Para implementar um botão de troca de tema, adicione JavaScript:

```javascript
// Função para alternar tema
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';

    html.classList.remove(currentTheme);
    html.classList.add(newTheme);

    // Salvar preferência
    localStorage.setItem('theme', newTheme);
}

// Carregar tema salvo
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.documentElement.classList.add(savedTheme);
});
```

```html
<!-- Botão de troca de tema -->
<button onclick="toggleTheme()" class="theme-toggle">
    <span class="material-icons">dark_mode</span>
</button>
```

---

## ✅ Checklist de Implementação

Ao adicionar temas em uma nova página, verifique:

- [ ] Classe `light-mode` ou `dark-mode` adicionada no `<html>`
- [ ] Arquivo `[nome]-light.css` criado em `public/css/pages/`
- [ ] Arquivo `[nome]-dark.css` criado em `public/css/pages/`
- [ ] Links para os 4 CSS adicionados no `<head>` na ordem correta
- [ ] Estilos inline removidos do HTML
- [ ] Todos os seletores dark têm prefixo `html.dark-mode`
- [ ] Cores seguem as diretrizes estabelecidas
- [ ] Página testada em ambos os modos (light e dark)
- [ ] Responsividade mantida em ambos os temas

---

## 📁 Páginas Já Implementadas

- ✅ **student-ranking.html** - Página piloto com sistema de temas completo

## 📁 Próximas Páginas

- ⏳ student-dashboard.html
- ⏳ index.html
- ⏳ student-path.html
- ⏳ student-take-lesson.html
- ⏳ login.html

---

## 🤝 Contribuindo

Ao adicionar novas páginas ou componentes:

1. Sempre separe os estilos light e dark em arquivos diferentes
2. Mantenha a convenção de nomenclatura: `[nome-pagina]-light.css` e `[nome-pagina]-dark.css`
3. Documente cores novas ou padrões diferentes neste guia
4. Teste em ambos os temas antes de finalizar

---

**Última atualização:** 31 de Outubro de 2025
**Versão:** 1.0
**Página Piloto:** student-ranking.html
