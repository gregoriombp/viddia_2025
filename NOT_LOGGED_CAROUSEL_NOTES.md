## Ajustes no carrossel (index-not-logged.html)

- **Primeiro card visível sob a máscara**: adicionei `padding-left: 4%`/`scroll-padding-left: 4%` no `.carousel-viewport` para deslocar a fila inicial sem afetar a largura do track. As máscaras aumentaram para `calc(120px + 4%)` cobrindo a área de respiro.
- **Último card com folga**: `padding-right: calc(120px + 4%)` no viewport garante espaço antes da máscara direita; `scroll-padding-right: 4%` mantém a navegação suave.
- **Glow sem corte**: criei `::after` nos cards com `inset: -48px` e sombra ampla, ativada no hover. Mantive overflow liberado e aumentei o padding vertical do viewport para 64px/80px.
- **Menos espaçamento vertical**: reduzidos padding/margem de `.carousel-section` e `padding-bottom` da `.page-section` (80px) para aproximar os três carrosséis.
- **Responsivo**: em mobile, o viewport agora usa `padding: 24px 4% 40px 4%` com `scroll-padding` para manter o alinhamento lateral; espaçamentos do bloco foram encurtados.
- **Arquivos tocados**: `public/css/not-logged-streaming.css` (único ajuste de estilo). Nenhum JS modificado; `public/js/not-logged-streaming.js` permanece apenas gerindo scroll e modal.

Observação: revisei os CSS globais (app.css/dark.css) e não há overrides específicos para `.carousel-*` nesta página além do `not-logged-streaming.css`. JS não interfere no layout além do scroll suave.
