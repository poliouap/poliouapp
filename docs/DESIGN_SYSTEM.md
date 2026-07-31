# Poliouapp Design System

Este documento define a base visual, princípios e componentes do **Poliouapp**, garantindo consistência durante o desenvolvimento da interface por qualquer membro da equipe.

## 1. Princípios de Design

A identidade visual do Poliouapp é inspirada na experiência tátil e focada de um *Bullet Journal* físico. Os pilares do design são:

*   **Minimalismo Elegante:** Uso abundante de espaços em branco (negative space). A ausência de elementos é tão importante quanto os elementos presentes.
*   **Intencionalidade:** Cada linha, botão ou texto tem um propósito claro. Sem distrações.
*   **Tátil e Orgânico:** As cores quentes e a tipografia clássica remetem a papel de alta qualidade e tinta, reduzindo a fadiga visual comum em interfaces puramente digitais.
*   **Foco no Conteúdo:** A interface "desaparece" para que o conteúdo (as tarefas e pensamentos do usuário) seja o destaque.

---

## 2. Cores (Paleta)

O tema principal é **Marfim e Preto**. Evitamos brancos puros (ofuscantes) e pretos puros (muito contrastantes) para criar uma experiência de leitura mais suave.

| Uso | Cor Hexadecimal | Variável Tailwind (Sugestão) | Descrição |
| :--- | :--- | :--- | :--- |
| **Fundo Principal** | `#F5F3E9` | `bg-marfim` | Um tom de marfim quente, lembrando papel pólen. |
| **Fundo Secundário** | `#EBE8D8` | `bg-marfim-dark` | Para *hover* sutis ou fundos de inputs bloqueados. |
| **Texto Principal** | `#1A1A1A` | `text-preto` | Preto suave, cor principal para títulos e textos. |
| **Texto Secundário** | `#666666` | `text-gray-500` | Para placeholders, dicas textuais e textos menos importantes. |
| **Bordas** | `#D4D0C5` | `border-gray-300` | Para divisórias sutis e bordas de formulários. |
| **Destaque (Ação)** | `#000000` | `bg-black` | Botões primários (Preto absoluto para máximo contraste de ação). |

---

## 3. Tipografia

A hierarquia tipográfica reforça a estética editorial e premium do aplicativo.

### 3.1. Fontes

*   **Títulos (Display/Headings):** **Cormorant Garamond** (Fonte Serifada Clássica).
    *   *Uso:* Páginas de login, títulos de seções, mensagens de boas-vindas. Possui um leve agrupamento de letras para um visual mais refinado.
*   **Corpo e UI (Body/Interface):** **Inter** (Fonte Sans-Serif Limpa e Moderna).
    *   *Uso:* Inputs, botões, listas de tarefas, links e textos longos.

### 3.2. Hierarquia (Tailwind)

*   **Heading 1 (h1):** `font-serif text-4xl md:text-5xl font-normal leading-tight text-preto`
*   **Heading 2 (h2):** `font-serif text-3xl font-normal text-preto`
*   **Body (p):** `font-sans text-base text-preto leading-relaxed`
*   **Small / Microcopy:** `font-sans text-sm text-gray-500`

---

## 4. Componentes Base

O design dos componentes segue a regra do minimalismo: linhas simples, sem sombras pesadas ou gradientes complexos.

### 4.1. Botões

*   **Primário:**
    *   Fundo preto sólido (`bg-black`).
    *   Texto branco (`text-white`), fonte sans-serif.
    *   Cantos arredondados estilo pílula ou levemente arredondados (`rounded-full` ou `rounded-lg`).
    *   Preenchimento generoso (`px-8 py-3`).
    *   Exemplo de transição: Leve opacidade ao passar o mouse (`hover:bg-black/80`).
*   **Link/Text Button:**
    *   Apenas texto (`text-preto`), geralmente sublinhado (`underline`) ou com sublinhado no hover (`hover:underline`).
    *   Fonte sans-serif pequena e em negrito sutil (`text-sm font-medium`).

### 4.2. Campos de Formulário (Inputs)

Os campos de entrada devem lembrar linhas de um caderno.
*   **Estilo Visual:** Sem bordas laterais ou superiores. Apenas uma borda inferior (bottom border).
*   **Classes Tailwind base:** `w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-preto transition-colors font-sans text-preto`.
*   **Labels:** Em caixa alta, com espaçamento entre letras (tracking) e tamanho reduzido, flutuando acima ou integradas de forma clean. `text-xs uppercase tracking-widest text-gray-500 mb-1 block`.

### 4.3. Layouts Comuns

*   **Páginas de Autenticação (Login/Cadastro):**
    *   Layout "Split Screen" (50/50 em telas grandes).
    *   Lado Esquerdo: Tipografia forte, proposta de valor, fundo marfim.
    *   Lado Direito: Formulário centralizado, limpo, muito espaço em branco ao redor.
*   **Páginas Internas (O Caderno):**
    *   Conteúdo altamente focado no centro (container estreito, ex: `max-w-2xl`).
    *   Menu de navegação lateral (sidebar) ou superior extremamente discreto para não roubar a atenção do conteúdo.

---

## 5. Micro-interações e Animações

Como a interface é muito estática visualmente, as animações trazem vida.
*   **Fade-ins:** Elementos de texto aparecendo suavemente ao carregar a página.
*   **Transições:** Mudanças de cor em botões e bordas de input devem sempre ter transições suaves (`transition-all duration-200`).
*   **Foco (Accessibility):** Quando navegando pelo teclado, elementos focados devem ter contornos visíveis claros, preservando a estética preta/marfim.

---

## 6. Referência Rápida de Implementação (Next.js / Tailwind)

Para aplicar este design system no Tailwind CSS (v4), atualize seu `globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --color-marfim: #F5F3E9;
  --color-preto: #1A1A1A;
  --font-serif: "Cormorant Garamond", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

body {
  background-color: var(--color-marfim);
  color: var(--color-preto);
}
```
