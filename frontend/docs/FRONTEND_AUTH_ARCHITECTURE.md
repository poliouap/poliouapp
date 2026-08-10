# Arquitetura e Setup do Frontend (Cadastro e Login)

Este documento descreve a arquitetura, as regras de design e a estrutura de pastas do fluxo de autenticação do **Poliouapp**, mantendo os princípios minimalistas e orgânicos (Design System), mas com uma tipografia 100% moderna (sans-serif).

---

## 1. O Design System Aplicado

A interface de login e cadastro segue uma estética limpa, focada no conteúdo e sem distrações visuais, inspirada na simplicidade de um caderno.

### Cores Principais
- **Fundo Principal (Marfim):** `#F5F3E9` (Evita a fadiga visual do branco puro).
- **Fundo Secundário (Marfim Escuro):** `#EBE8D8` (Para hovers sutis ou inputs desativados).
- **Texto Principal (Preto Suave):** `#1A1A1A`.
- **Texto Auxiliar e Placeholders:** `#666666`.
- **Botões e Ações Principais:** `#000000` (Preto absoluto para máximo contraste).
- **Bordas e Linhas:** `#D4D0C5`.

### Tipografia
- **Única Fonte:** Apenas **Inter** (sans-serif).
- Nenhuma fonte serifada é utilizada no projeto. Títulos, textos e inputs seguem a mesma família para manter um visual extremamente coeso e moderno.

### Estilo de Componentes (O "Caderno")
- **Inputs:** Não possuem bordas ao redor da caixa. Apresentam apenas uma linha inferior (`border-b border-[#D4D0C5]`), simulando a pauta de um caderno. Fundo transparente.
- **Labels:** Escritas em letras maiúsculas, com espaçamento largo entre as letras (uppercase tracking-widest) e na cor cinza (`#666666`), geralmente em tamanhos pequenos (`text-xs`).
- **Botões:** Fundo preto sólido com texto branco, cantos arredondados (estilo pílula) e hover sutil diminuindo a opacidade.

### Layout
- **Split-Screen 50/50:** Em telas maiores (desktop), a tela é dividida ao meio. A esquerda fica a identidade visual no fundo marfim. A direita, o formulário de login/cadastro centralizado e respirando em bastante espaço em branco (negative space).

---

## 2. Ferramentas e Bibliotecas Utilizadas

- **Next.js (App Router):** Roteamento das páginas `/login` e `/register`.
- **Tailwind CSS v4:** Para aplicação direta dos tokens de cor e espaçamentos.
- **React Hook Form:** Para gerenciar o estado dos formulários sem perda de performance.
- **Zod & @hookform/resolvers:** Para validar as regras (tamanho de senha, formato de email) sincronizadas com as exigências do Backend Express.
- **Lucide React:** Ícones para a interface (ex: mostrar/ocultar senha).

---

## 3. Estrutura de Pastas de Autenticação

Todos os arquivos residem em `frontend/src/`:

```text
src/
├── app/
│   ├── (auth)/                         # Agrupamento lógico das rotas de autenticação
│   │   ├── layout.tsx                  # Define o layout Split-Screen (50/50)
│   │   ├── login/page.tsx              # Página /login
│   │   └── register/page.tsx           # Página /register
│   ├── globals.css                     # Variáveis do Tailwind v4 (cores marfim e preto)
│   └── layout.tsx                      # Root layout importa apenas a fonte Inter
│
├── components/
│   ├── ui/                             # "Tijolos" do Design System
│   │   ├── input.tsx                   # Input pautado (border-b)
│   │   ├── button.tsx                  # Botão pílula preto (#000000)
│   │   └── label.tsx                   # Rótulo uppercase
│   │
│   └── auth/                           # Formulários integrados com React Hook Form
│       ├── login-form.tsx              
│       └── register-form.tsx           
│
├── lib/
│   ├── api.ts                          # Wrapper do Fetch API para o Backend na porta 5000
│   └── validations/
│       └── auth.ts                     # Regras do Zod (ex: email válido, senha >= 6 caracteres)
│
├── services/
│   └── auth.service.ts                 # Requisições POST para /auth/login e /auth/register
│
└── context/
    └── auth-context.tsx                # Gerencia o JWT e o estado "logado" do usuário
```

---

## 4. Fluxo de Dados (Login e Cadastro)

1. **Interação:** O usuário preenche os campos do formulário (ex: `login-form.tsx`).
2. **Validação em Tempo Real:** O `Zod` (`lib/validations/auth.ts`) valida instantaneamente as informações. Erros aparecem sob os inputs sem precisar carregar a página.
3. **Requisição:** Ao submeter dados válidos, o `services/auth.service.ts` envia um POST para o backend (`http://localhost:5000/auth/login`).
4. **Resposta e Estado:**
   - **Erro:** (Ex: "Credenciais inválidas") O frontend exibe uma mensagem clara de erro.
   - **Sucesso:** O backend retorna um `accessToken`. O `auth-context.tsx` armazena esse token de forma segura e redireciona o usuário para a área autenticada do app.
