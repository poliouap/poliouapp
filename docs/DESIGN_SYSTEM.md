# Poliouapp Design System

**Guia de Estilo & Diretrizes — v2.0 (Light & Dark)**

Este documento define a base visual, princípios e componentes do Poliouapp, garantindo consistência durante o desenvolvimento da interface. Esta versão atualiza a v1.0 com os tokens reais implementados no protótipo Lovable e adiciona a especificação completa do tema escuro.

---

## 1. Princípios de Design

A identidade visual do Poliouapp é inspirada na experiência tátil e focada de um Bullet Journal físico. Os pilares do design são:

- **Minimalismo Elegante** — Uso abundante de espaços em branco (negative space). A ausência de elementos é tão importante quanto os elementos presentes.
- **Intencionalidade** — Cada linha, botão ou texto tem um propósito claro. Sem distrações.
- **Tátil e Orgânico** — As cores quentes e a tipografia clássica remetem a papel de alta qualidade e tinta, reduzindo a fadiga visual comum em interfaces puramente digitais.
- **Foco no Conteúdo** — A interface "desaparece" para que o conteúdo (as tarefas e pensamentos do usuário) seja o destaque.
- **Consistência entre temas (novo)** — O tema escuro não é uma simples inversão de cores: mantém a mesma temperatura quente e os mesmos tons de destaque (verde, menta, terracota, lavanda, laranja, roxo), preservando a identidade Poliou em qualquer modo.

---

## 2. Cores — Tema Claro

O tema principal é Marfim e Preto quase-puro. Os valores abaixo foram recalibrados a partir da implementação real (protótipo Lovable), substituindo os tons aproximados da v1.0.

| Uso | Hex | Variável | Descrição |
|---|---|---|---|
| Fundo Principal | `#FAF6E8` | `bg-marfim` | Marfim quente — fundo de toda a aplicação (atualizado do `#F5F3E9` original). |
| Fundo da Sidebar | `#FDFBF6` | `bg-marfim-light` | Quase branco-marfim, levemente mais claro que o fundo principal — usado na sidebar e em inputs de caixa. |
| Fundo Ativo / Hover | `#F1EBDB` | `bg-marfim-dark` | Item de navegação ativo, avatar padrão, hovers sutis. |
| Superfície de Card | `#FFFFFF` | `bg-white` | Cards de conteúdo (dashboard, cadernos, tabela do habit tracker) — branco puro para destacar do fundo marfim. |
| Texto Principal / Ação | `#14110E` | `text-preto` / `bg-preto` | Preto quase-puro (não `#000`). Usado em títulos, texto principal e em todos os botões primários. |
| Texto Secundário | `#666666` | `text-gray-500` | Placeholders, legendas, subtítulos, dicas textuais. |
| Texto Terciário | `#9C9686` | `text-gray-400` | Metadados de baixa ênfase (ex.: contagem de itens em cards do dashboard). |
| Bordas | `#D4D0C5` | `border-gray-300` | Divisórias sutis, bordas de input e contornos de card. |
| Estado Desabilitado | `#9E9B91` | `bg-disabled` | Botões desabilitados (ex.: "Adicionar" antes de preencher o nome do hábito). |

### 2.1 Paleta de Destaque (Hábitos, Capas de Caderno, Tags)

Seis cores pastel usadas de forma consistente para diferenciar hábitos, capas de cadernos e badges. São as mesmas seis cores oferecidas no seletor de cor do modal "Novo hábito".

| Uso | Hex | Variável | Descrição |
|---|---|---|---|
| Verde Sálvia | `#9AB69F` | `accent-sage` | Capa de caderno, hábito, checkbox — tom 1 da paleta de destaque. |
| Menta / Teal | `#B1DBD5` | `accent-mint` | Tom 2 da paleta — usado em hábitos e tags. |
| Terracota | `#CE8D6F` | `accent-terracotta` | Tom 3 — capa de caderno "Trabalho", hábitos. |
| Lavanda | `#B0A4C9` | `accent-lavender` | Tom 4 — capa de caderno, hábito "Escrever no diário". |
| Laranja | `#DF8C6F` | `accent-orange` | Tom 5 — disponível no seletor de cor de hábitos. |
| Roxo | `#AD92C2` | `accent-purple` | Tom 6 — disponível no seletor de cor de hábitos. |

---

## 3. Cores — Tema Escuro

Novo nesta versão. O tema escuro segue a mesma lógica tonal do tema claro (fundo → fundo secundário → fundo ativo → superfície de card), porém invertida em luminosidade e mantendo a temperatura quente (nunca cinza neutro nem preto puro).

| Uso | Hex | Variável | Descrição |
|---|---|---|---|
| Fundo Principal | `#17160F` | `dark-bg-marfim` | Inversão quente do marfim — nunca preto puro, mantém a mesma temperatura de cor do tema claro. |
| Fundo da Sidebar | `#1F1D17` | `dark-bg-marfim-light` | Levemente mais claro que o fundo principal, mesma relação tonal do tema claro. |
| Fundo Ativo / Hover | `#2B2820` | `dark-bg-marfim-dark` | Item de navegação ativo e hovers no tema escuro. |
| Superfície de Card | `#211F19` | `dark-bg-surface` | Cards elevados — mais claros que o fundo para criar profundidade sutil (sem sombras pesadas). |
| Texto Principal / Ação | `#F2EFE4` | `dark-text-preto` / `dark-bg-action` | Marfim quase-puro. Vira o texto principal **e** o fundo dos botões primários (inversão de contraste). |
| Texto Secundário | `#A39C8C` | `dark-text-gray` | Placeholders e legendas no tema escuro. |
| Texto Terciário | `#6E6A5E` | `dark-text-gray-dim` | Metadados de baixa ênfase no tema escuro. |
| Bordas | `#38352C` | `dark-border` | Divisórias e contornos — mais claras que a superfície para permanecerem visíveis. |
| Estado Desabilitado | `#56524A` | `dark-bg-disabled` | Botões desabilitados no tema escuro. |

### 3.1 Regra de Inversão de Contraste

No tema claro, botões primários usam fundo preto (`#14110E`) com texto marfim. No tema escuro essa relação se inverte: botões primários usam fundo marfim (`#F2EFE4`) com texto quase-preto (`#17160F`). Isso garante o mesmo nível de contraste e destaque em ambos os temas, sem depender de uma cor de "marca" saturada.

### 3.2 Paleta de Destaque no Tema Escuro

As seis cores de destaque (sálvia, menta, terracota, lavanda, laranja, roxo) permanecem com o mesmo matiz nos dois temas — não são escurecidas. Como já são tons pastel de saturação média, mantêm bom contraste tanto sobre o marfim claro quanto sobre o fundo escuro `#17160F`. Use-as em preenchimento sólido (como nas células marcadas do Habit Tracker) ou a 16–20% de opacidade sobre a superfície de card quando precisar de uma versão "tag" mais discreta.

---

## 4. Tipografia

A hierarquia tipográfica reforça a estética editorial e premium do aplicativo — confirmada em todas as telas do protótipo ("Olá, Luiz", "Meus Cadernos", "Habit Tracker", "Configurações" usam a serifada; nav, botões e corpo de texto usam a sans-serif).

### 4.1 Fontes

- **Títulos (Display/Headings):** Cormorant Garamond — fonte serifada clássica. Uso: páginas de login, títulos de página (H1/H2), títulos de modais, mensagens de boas-vindas.
- **Corpo e UI (Body/Interface):** Inter — fonte sans-serif limpa. Uso: navegação, inputs, botões, listas, badges, textos longos.

### 4.2 Hierarquia (Tailwind)

```
Heading 1 (h1): font-serif text-4xl md:text-5xl font-normal leading-tight text-preto
Heading 2 (h2): font-serif text-3xl font-normal text-preto
Heading 3 (modal / card title): font-sans text-lg font-semibold text-preto
Body (p): font-sans text-base text-preto leading-relaxed
Small / Microcopy: font-sans text-sm text-gray-500
Eyebrow / Label (ex.: 'QUINTA-FEIRA', 'NOME'): font-sans text-xs uppercase tracking-widest text-gray-500
```

---

## 5. Componentes

### 5.1 Botões

- **Primário:** fundo preto quase-puro (`bg-[#14110E]`), texto marfim, `rounded-full`, padding generoso (`px-6 py-3`). Ex.: "+ Novo hábito", "Salvar perfil", "Adicionar".
- **Primário — estado desabilitado:** fundo cinza-marfim (`#9E9B91`), sem hover, cursor not-allowed. Usado no botão "Adicionar" do modal antes do nome ser preenchido.
- **Segmentado (Segmented Control):** cápsula com fundo branco/superfície e borda sutil; opção ativa recebe fundo preto quase-puro + texto marfim (ex.: toggle "Geral / Segurança" em Configurações).
- **Link / Text Button:** apenas texto (`text-preto`), sublinhado no hover. Ex.: "Cancelar" dentro de modais.

### 5.2 Campos de Formulário — dois padrões confirmados

O protótipo usa dois estilos de input, cada um com um contexto de uso claro:

**A) Estilo Linha de Caderno (Underline)**

Usado dentro de modais / fluxos rápidos, como "Novo hábito". Sem bordas laterais ou superiores — apenas uma borda inferior, reforçando a metáfora de caderno.

```
w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-preto transition-colors font-sans text-preto
```

**B) Estilo Caixa (Bordered Box)**

Usado em telas de formulário mais estruturadas, como Configurações → Perfil (campo "Nome"). Caixa retangular com cantos arredondados e fundo levemente destacado do branco do card.

```
w-full bg-marfim-light border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-preto transition-colors font-sans text-preto
```

**Labels (ambos os estilos)**

```
text-xs uppercase tracking-widest text-gray-500 mb-1 block
```

### 5.3 Sidebar de Navegação

- Largura fixa (~280px), fundo `bg-marfim-light` (`#FDFBF6`), levemente distinto do fundo principal da página.
- Logo: avatar circular com a inicial "P" + wordmark "Poliou" em sans-serif medium.
- Item de navegação ativo: `rounded-lg`, fundo `bg-marfim-dark` (`#F1EBDB`), ícone e texto em preto quase-puro; itens inativos em cinza.
- Rodapé fixo: avatar circular (iniciais sobre fundo `#F1EBDB`) + nome + rótulo de plano ("Plano Gratuito") + ícone de logout.

### 5.4 Cards

- **Card de Resumo (Dashboard):** `bg-white`, `rounded-2xl`, padding generoso, ícone dentro de badge circular com fundo escuro sólido, título em sans-serif semibold + subtítulo em cinza pequeno (contagem de itens).
- **Card de Widget "Em breve":** mesmo tratamento com borda tracejada (`border-dashed`) sobre fundo marfim, texto secundário centralizado — usado para placeholders de funcionalidades futuras.
- **Card de Caderno (capa):** retângulo vertical colorido (uma das 6 cores de destaque) simulando a lombada/capa de um caderno físico, com o título abaixo, fora do card, em sans-serif medium.
- **Card "Novo Caderno":** borda tracejada, ícone "+" centralizado, mesmo fundo do restante da página (sem preenchimento branco) — indica claramente uma ação, não conteúdo existente.

### 5.5 Habit Tracker (Tabela)

- Container: `bg-white`, `rounded-2xl`, com scroll horizontal para os dias do mês (barra de rolagem visível no rodapé da tabela).
- Cada hábito recebe uma cor de destaque (ponto colorido antes do nome) que se repete no preenchimento das células marcadas daquele hábito.
- Célula marcada: `rounded-md`, preenchimento sólido com a cor do hábito, ícone de check em contraste (preto/marfim conforme o tema).
- Célula vazia: `rounded-md`, fundo branco, borda cinza clara (`border-gray-300`).

### 5.6 Modal

- Overlay: fundo preto quase-puro a ~75% de opacidade sobre o conteúdo da página (`bg-[#14110E]/75`).
- Card do modal: mesma cor de fundo marfim da página (não branco) — `rounded-2xl`, padding generoso, sombra suave, botão de fechar (X) no canto superior direito.
- Seletor de cor (ex.: "Novo hábito"): grade de círculos (~40px) com as 6 cores de destaque; a cor selecionada recebe um anel/borda preta ao redor.
- Rodapé do modal: ação secundária em texto ("Cancelar") à esquerda da ação primária em botão pill ("Adicionar").

### 5.7 Seletor de Tema (Configurações)

- Três cartões lado a lado (Claro / Escuro / Sistema), cada um `rounded-xl` com borda fina, ícone (sol / lua / monitor) dentro de um círculo no topo e o rótulo centralizado abaixo.
- Estado selecionado: borda em preto quase-puro (2px); estado padrão: borda em `bg-marfim-dark` (`#F1EBDB`).

---

## 6. Layouts Comuns

- **Páginas de Autenticação (Login/Cadastro):** layout "Split Screen" (50/50 em telas grandes). Lado esquerdo com tipografia forte e proposta de valor; lado direito com formulário centralizado e amplo espaço em branco.
- **Shell do App (Dashboard, Cadernos, Habit Tracker, Configurações):** sidebar fixa (~280px) + área de conteúdo com container centralizado, respiro generoso (padding 40–48px) e cabeçalho com eyebrow (dia da semana) + título serifado.
- **Páginas Internas (O Caderno):** conteúdo altamente focado no centro (container estreito, ex.: `max-w-2xl`). Navegação extremamente discreta.

## 7. Micro-interações e Animações

- **Fade-ins:** elementos de texto aparecendo suavemente ao carregar a página.
- **Transições:** mudanças de cor em botões e bordas de input devem sempre ter transições suaves (`transition-all duration-200`).
- **Modal:** overlay com fade + card com leve scale-in (95% → 100%).
- **Foco (Acessibilidade):** navegação por teclado deve exibir contornos visíveis claros, preservando a estética marfim/preto em ambos os temas.

---

## 8. Referência Rápida de Implementação (Next.js / Tailwind v4)

Atualize seu `globals.css` com os tokens dos dois temas. O tema escuro é ativado por uma classe `.dark` no elemento raiz (padrão `next-themes`).

```css
/* SRC/APP/GLOBALS.CSS */
@import "tailwindcss";

@theme inline {
  --font-serif: "Cormorant Garamond", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Tema claro (padrão) */
  --color-marfim: #FAF6E8;
  --color-marfim-light: #FDFBF6;
  --color-marfim-dark: #F1EBDB;
  --color-surface: #FFFFFF;
  --color-preto: #14110E;
  --color-gray-500: #666666;
  --color-gray-400: #9C9686;
  --color-border: #D4D0C5;
  --color-disabled: #9E9B91;

  /* Paleta de destaque — igual nos dois temas */
  --color-accent-sage: #9AB69F;
  --color-accent-mint: #B1DBD5;
  --color-accent-terracotta: #CE8D6F;
  --color-accent-lavender: #B0A4C9;
  --color-accent-orange: #DF8C6F;
  --color-accent-purple: #AD92C2;
}

.dark {
  --color-marfim: #17160F;
  --color-marfim-light: #1F1D17;
  --color-marfim-dark: #2B2820;
  --color-surface: #211F19;
  --color-preto: #F2EFE4;
  --color-gray-500: #A39C8C;
  --color-gray-400: #6E6A5E;
  --color-border: #38352C;
  --color-disabled: #56524A;
}

body {
  background-color: var(--color-marfim);
  color: var(--color-preto);
  transition: background-color 0.2s, color 0.2s;
}
```

> **Observação:** em ambos os temas, o botão primário e o texto principal usam a mesma variável `--color-preto` — é essa inversão de valor (quase-preto no claro, quase-marfim no escuro) que mantém a consistência de contraste entre os modos sem precisar de classes condicionais extras nos componentes.

---

*Poliouapp Design System v2.0 — Light & Dark*
