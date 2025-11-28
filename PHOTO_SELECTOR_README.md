# Sistema de Seleção de Foto de Perfil

## Funcionalidade Implementada

Foi adicionado ao arquivo `html/html/student-modify-profile.html` um sistema completo de seleção de foto de perfil com as seguintes características:

### Recursos
- **Modal elegante** que abre ao clicar em "Alterar Foto"
- **Grid com 10 avatares abstratos** para seleção rápida
- **Upload de foto personalizada** (até 5MB)
- **Atualização em tempo real** da foto de perfil sem recarregar a página
- **Suporte a dark mode** automático
- **Animações suaves** de entrada/saída
- **Responsivo** para dispositivos móveis

### Como Funciona

1. **Abrir Modal**: Clique no botão "Alterar Foto" no card do perfil
2. **Escolher Avatar**: Clique em um dos 10 avatares abstratos na grade
3. **Upload Personalizado**: Clique na área de upload para enviar sua própria foto
4. **Confirmar**: Clique em "Confirmar" para aplicar a mudança
5. **Cancelar**: Clique em "Cancelar" ou pressione ESC para fechar sem salvar

### Substituir Placeholders de Avatares

Atualmente, o sistema usa imagens placeholder. Para adicionar os avatares reais:

#### Localização dos Arquivos
Coloque as 10 ilustrações abstratas em:
```
public/images/avatars/
```

#### Nomes dos Arquivos
Os arquivos devem seguir a nomenclatura:
- `avatar-01.png`
- `avatar-02.png`
- `avatar-03.png`
- `avatar-04.png`
- `avatar-05.png`
- `avatar-06.png`
- `avatar-07.png`
- `avatar-08.png`
- `avatar-09.png`
- `avatar-10.png`

#### Especificações Recomendadas
- **Formato**: PNG com fundo transparente (ou JPG)
- **Tamanho**: 400x400px ou maior (quadrado)
- **Peso**: Máximo 500KB por avatar
- **Estilo**: Ilustrações abstratas consistentes entre si

### Onde Encontrar os Placeholders no Código

No arquivo `student-modify-profile.html`, procure por:
```html
<div class="avatar-grid">
    <div class="avatar-option" data-avatar="1">
        <img src="../../public/images/avatars/avatar-01.png" alt="Avatar 1">
    </div>
    <!-- ... outros avatares ... -->
</div>
```

### Funcionalidades Adicionais Possíveis

Se você quiser expandir esta funcionalidade no futuro:

1. **Salvar no Backend**: Adicione código para enviar a seleção para o servidor
2. **Crop de Imagem**: Implemente uma ferramenta de recorte antes do upload
3. **Filtros**: Adicione filtros ou ajustes de cor
4. **Preview Múltiplo**: Mostre como ficará em diferentes tamanhos
5. **Histórico**: Permita que o usuário veja e restaure fotos anteriores

### Estrutura do Código

#### CSS (Linhas 49-241)
- Estilos do modal
- Grid de avatares
- Área de upload
- Animações e transições
- Suporte dark mode

#### HTML do Modal (Linhas 573-635)
- Estrutura do modal
- Grid de 10 avatares
- Seção de upload

#### JavaScript (Linhas 725-858)
- Controle de abertura/fechamento do modal
- Seleção de avatares
- Upload de imagens personalizadas
- Validação de tamanho de arquivo
- Atualização da foto de perfil

### Compatibilidade

Testado e compatível com:
- Chrome/Edge (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Navegadores móveis modernos

### Notas de Desenvolvimento

- O modal bloqueia o scroll da página quando aberto
- Aceita apenas arquivos de imagem (image/*)
- Limite de 5MB para uploads personalizados
- Fecha com ESC, clique fora, ou botão cancelar
- Requer confirmação para aplicar mudanças
