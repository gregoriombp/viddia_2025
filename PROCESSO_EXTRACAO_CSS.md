# Processo de Extração de CSS por Página

## Objetivo
Dividir os arquivos CSS globais pesados (`app.css` e `dark.css`) em:
- **Estilos globais** → permanecem em `app.css` e `dark.css` (apenas componentes compartilhados entre múltiplas páginas)
- **Estilos específicos por página** → novos arquivos como `[pagename].css` e `[pagename]-dark.css`

---

## Processo Passo a Passo

### 1️⃣ Análise Inicial
Antes de começar a extração, você precisa:

1. **Ler o HTML da página** para identificar classes e IDs específicos
2. **Buscar essas classes em `app.css`** e anotar os números de linha
3. **Buscar essas classes em `dark.css`** e anotar os números de linha
4. **Verificar se os estilos são compartilhados** com outras páginas

#### Como verificar se um estilo é compartilhado:
- Use `grep -r "nome-da-classe" html/html/*.html` para ver em quantas páginas aparece
- Se aparece em **2+ páginas** → **MANTER NO GLOBAL** (app.css/dark.css)
- Se aparece em **1 página apenas** → **EXTRAIR** para CSS específico

---

### 2️⃣ Criar Arquivo CSS Específico (Tema Claro)

Crie o arquivo `[pagename].css` em `/public/css/`

**Estrutura do arquivo:**
```css
/* ========================================
   [PAGENAME].CSS - Estilos específicos da página [pagename].html
   Tema Claro
   ======================================== */

/* ==========================================
   SEÇÃO 1 - Nome da Seção
   ========================================== */

/* Cole aqui os estilos extraídos de app.css */
.classe-exemplo {
    /* estilos... */
}

/* ==========================================
   SEÇÃO 2 - Nome da Seção
   ========================================== */

/* Continue organizando por seções lógicas */
```

#### Dicas:
- Organize os estilos em seções lógicas (Hero, Cards, Forms, etc.)
- Mantenha a ordem original dos seletores
- Preserve comentários importantes do CSS original
- Adicione media queries no final do arquivo

---

### 3️⃣ Criar Arquivo CSS Específico (Tema Escuro)

Crie o arquivo `[pagename]-dark.css` em `/public/css/`

**Estrutura do arquivo:**
```css
/* ========================================
   [PAGENAME]-DARK.CSS - Estilos específicos da página [pagename].html
   Tema Escuro
   ======================================== */

/* ==========================================
   SEÇÃO 1 - Nome da Seção (Dark Mode)
   ========================================== */

html.dark-mode .classe-exemplo {
    /* estilos dark mode... */
}
```

#### Importante:
- Todos os seletores devem começar com `html.dark-mode`
- Mantenha a mesma ordem de seções do arquivo claro
- Apenas sobrescreva propriedades que mudam no dark mode

---

### 4️⃣ Atualizar o HTML

No `<head>` da página, adicione os imports na **ordem correta**:

```html
<!-- App CSS -->
<link type="text/css" href="../../public/css/app.css" rel="stylesheet" />

<!-- [Pagename] Specific Styles -->
<link type="text/css" href="../../public/css/[pagename].css" rel="stylesheet" />

<!-- Dark Mode Styles (loaded when html has class "dark-mode") -->
<link type="text/css" href="../../public/css/dark.css" rel="stylesheet" />

<!-- [Pagename] Specific Dark Mode Styles -->
<link type="text/css" href="../../public/css/[pagename]-dark.css" rel="stylesheet" />

<!-- Responsive CSS -->
<link type="text/css" href="../../public/css/responsive.css" rel="stylesheet" />
```

⚠️ **Ordem é importante:**
1. Global claro (`app.css`)
2. Específico claro (`[pagename].css`)
3. Global escuro (`dark.css`)
4. Específico escuro (`[pagename]-dark.css`)
5. Responsivo (`responsive.css`)

---

### 5️⃣ Remover do CSS Global

#### Em `app.css`:
1. Localize as seções extraídas usando os números de linha anotados
2. Use a ferramenta Edit para remover os blocos
3. **Cuidado:** Não remova estilos compartilhados!

#### Em `dark.css`:
1. Localize as seções dark mode extraídas
2. Remova os blocos correspondentes
3. **Cuidado:** Não remova overrides de componentes globais!

---

## Componentes que SEMPRE Ficam no Global

Estes componentes são usados em múltiplas páginas e **NUNCA** devem ser extraídos:

### De `app.css`:
- `.course-card` e variantes (usado em 11+ páginas)
- `.course-grid` (usado em 11+ páginas)
- `.page-separator` (usado em 8+ páginas)
- `.navbar`, `.nav-item`, `.nav-link`
- `.footer`
- `.btn`, `.btn-primary`, `.btn-secondary`, etc.
- `.avatar`
- `.mdk-header-layout`, `.page-content`
- `.container`, `.row`, `.col-*`
- Componentes de formulário (`.form-control`, `.form-group`, etc.)
- Modais (`.modal`, `.modal-dialog`, etc.)
- Dropdowns, tooltips, alerts

### De `dark.css`:
- Todas as versões dark dos componentes acima
- `html.dark-mode .course-card`
- `html.dark-mode .navbar`
- etc.

---

## Exemplo Completo: index.html

### Estilos Específicos Extraídos:
- **Dashboard Pills** → Somente index.html usa
- **Hero Section** (welcome/name) → Somente index.html
- **Welcome Panel** (vídeo + progresso) → Somente index.html
- **Video Thumbnail** → Somente index.html

### Estilos que Permaneceram Globais:
- **Course Cards** → Usado em 11+ páginas
- **Course Grid** → Usado em 11+ páginas
- **Page Separator** → Usado em 8+ páginas
- **Navbar/Footer** → Todas as páginas

### Resultado:
- **Removido de app.css:** ~300 linhas
- **Removido de dark.css:** ~95 linhas
- **Total economizado:** ~395 linhas no CSS global

---

## Checklist por Página

Ao processar cada página, siga este checklist:

- [ ] Analisei o HTML e identifiquei classes específicas
- [ ] Busquei essas classes em app.css e anotei linhas
- [ ] Busquei essas classes em dark.css e anotei linhas
- [ ] Verifiquei se os estilos são usados em outras páginas
- [ ] Criei `[pagename].css` com estilos específicos claros
- [ ] Criei `[pagename]-dark.css` com estilos específicos escuros
- [ ] Atualizei o `<head>` do HTML com os novos imports
- [ ] Removi os estilos extraídos de app.css
- [ ] Removi os estilos extraídos de dark.css
- [ ] Testei a página nos dois temas (claro e escuro)

---

## Dicas Importantes

1. **Sempre leia antes de editar** - Use a ferramenta Read antes de Edit
2. **Mantenha backup** - O git está rastreando as mudanças
3. **Teste após cada página** - Verifique se a página ainda renderiza corretamente
4. **Não quebre outras páginas** - Não remova estilos compartilhados
5. **Organize bem** - Use seções e comentários claros
6. **Media queries** - Extraia também as media queries específicas da página

---

## Nomenclatura dos Arquivos

| Página HTML | CSS Claro | CSS Escuro |
|-------------|-----------|------------|
| `index.html` | `index.css` | `index-dark.css` |
| `student-dashboard.html` | `student-dashboard.css` | `student-dashboard-dark.css` |
| `student-path.html` | `student-path.css` | `student-path-dark.css` |
| `student-course-preview.html` | `student-course-preview.css` | `student-course-preview-dark.css` |

**Padrão:** `[nome-do-arquivo-html-sem-extensao].css` e `[nome-do-arquivo-html-sem-extensao]-dark.css`

---

## Comandos Úteis

### Buscar uma classe em todos os HTMLs:
```bash
grep -r "nome-da-classe" html/html/*.html
```

### Contar ocorrências:
```bash
grep -r "nome-da-classe" html/html/*.html | wc -l
```

### Ver tamanho dos arquivos CSS:
```bash
wc -l public/css/app.css
wc -l public/css/dark.css
```

---

## Páginas Processadas

- [x] **index.html** - Concluído e Verificado ✅
  - Criados: `index.css` (598 linhas), `index-dark.css` (215 linhas)
  - Removido de app.css: ~320 linhas (incluindo media queries)
  - Removido de dark.css: ~95 linhas
  - Removido do HTML: ~130 linhas (estilos inline do bloco <style>)
  - Economizado: ~545 linhas do CSS global e inline
  - Status: Todos os estilos específicos extraídos, media queries movidas e estilos inline eliminados

- [x] **student-ranking.html** - Concluído
  - Criados: `student-ranking.css` (390 linhas), `student-ranking-dark.css` (213 linhas)
  - Removido de app.css: ~348 linhas
  - Removido de dark.css: ~172 linhas
  - Economizado: ~520 linhas do CSS global

- [ ] Próximas páginas a processar...

---

## Notas Finais

- Este processo ajuda a manter o código organizado e performático
- CSS menor = carregamento mais rápido
- Manutenção mais fácil quando estilos estão isolados por página
- Evita conflitos e sobrescritas desnecessárias

**Boa sorte com as próximas páginas!** 🚀
