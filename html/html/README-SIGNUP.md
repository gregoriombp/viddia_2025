# Páginas de Cadastro - VIDDIA

## 📄 Páginas Disponíveis

### 1. [singup.html](singup.html) - Tela Inicial
**Função:** Coleta do e-mail corporativo

**Fluxo:**
1. Usuário digita e-mail corporativo
2. Clica em "Continuar"
3. Vê mensagem: "Você recebeu um e-mail, clique no link para continuar"
4. **O fluxo para aqui** (não avança mais)

**Indicador de Passos:** 2 dots (Step 1 → Email Enviado)

---

### 2. [singup-final.html](singup-final.html) - Continuação do Fluxo
**Função:** Formulário de dados pessoais (pós-verificação de e-mail)

**Fluxo:**
1. Página **inicia direto no Step 3** (dados pessoais)
2. Usuário preenche:
   - Nome completo
   - Data de nascimento
   - Escolhe avatar (ou faz upload de foto)
3. Clica em "Finalizar Cadastro"
4. Vê tela de sucesso com resumo dos dados

**Indicador de Passos:** 2 dots (Email Verificado → Dados Pessoais)

---

## 🔄 Como Visualizar o Fluxo Completo

### Opção 1: Navegação Manual
1. Abra **singup.html** no navegador
2. Digite um e-mail qualquer (formato válido)
3. Clique em "Continuar"
4. Veja a mensagem de e-mail enviado
5. Abra **singup-final.html** em outra aba/janela
6. Preencha os dados e finalize

### Opção 2: Abrir Direto
- **singup.html** - Para ver a tela de entrada de e-mail
- **singup-final.html** - Para ver o formulário de dados pessoais

---

## ⚠️ Importante

**Estas páginas são apenas PROTÓTIPOS ilustrativos:**
- ❌ Não enviam e-mails reais
- ❌ Não validam tokens
- ❌ Não salvam dados em banco
- ✅ Demonstram o fluxo visual
- ✅ Validam formatos (e-mail, data, etc.)
- ✅ Mostram todas as etapas da interface

---

## 🎨 Design & Funcionalidades

### Recursos Visuais
- ✨ Animações suaves entre telas
- 🌙 Suporte a dark mode (já ativo)
- 📱 Design responsivo
- 🎯 Indicadores de progresso
- ⚠️ Mensagens de erro inline

### Funcionalidades do Formulário
- Validação de e-mail em tempo real
- Seleção de avatar com carrossel (20 opções)
- Upload de foto personalizada (PNG/JPG até 5MB)
- Preview de foto antes de enviar
- Campo de data com seletor nativo

---

## 📝 Alterações Realizadas

### Mudanças no Fluxo Original

**Antes (com código de verificação):**
```
Step 1: E-mail → Step 2: Código 6 dígitos → Step 3: Dados Pessoais
```

**Depois (com link de verificação):**
```
Step 1: E-mail → Mensagem "E-mail enviado" [PARA AQUI]

[Nova página: singup-final.html]
Step 3: Dados Pessoais → Tela de Sucesso
```

### O Que Foi Removido
- ❌ Step 2 (campo de código de 6 dígitos)
- ❌ Botão "Reenviar código"
- ❌ Validação de código numérico
- ❌ Integração com APIs backend

### O Que Foi Adicionado
- ✅ Mensagem de "E-mail enviado" com ícone
- ✅ Link para "reenviar" (apenas visual)
- ✅ Divisão em duas páginas HTML separadas
- ✅ Indicador de apenas 2 passos ao invés de 3

---

## 🗂️ Estrutura de Arquivos

```
html/html/
├── singup.html           # Tela 1: Entrada de e-mail
├── singup-final.html     # Tela 2: Dados pessoais
├── verify-email.html     # Referência (não usada no fluxo)
└── README-SIGNUP.md      # Este arquivo
```

---

## 🚀 Para Implementação Real

Quando conectar ao backend:
1. Conecte `singup.html` à API de envio de e-mail
2. Configure `verify-email.html` para validar tokens
3. Remova `singup-final.html` e use redirecionamento
4. Implemente salvamento de dados no banco

Veja [/api/README.md](../../api/README.md) para detalhes técnicos.
