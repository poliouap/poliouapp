# ADR 001: Gestão de Sessão no Frontend com Cookies e Next.js Middleware

**Data:** 11 de Agosto de 2026  
**Status:** Aceito  
**Autor:** Antigravity (Assistente de IA)

## Contexto

Com a implementação do fluxo de autenticação (Cadastro e Login) no Poliouapp, precisamos decidir como o frontend (Next.js) irá armazenar o token JWT do usuário e os dados de perfil (Nome, Email) após um login bem-sucedido. 

A arquitetura do Next.js (App Router) nos impõe um desafio: algumas rotas e validações acontecem no lado do servidor (Server-Side via Middleware), enquanto outras interações são geridas no lado do cliente (Client-Side Components). 

Nós tínhamos duas opções principais para armazenar o Token JWT e garantir que rotas protegidas (como `/dashboard`) não pudessem ser acessadas sem login:
1. **LocalStorage:** Comum em React puro (SPAs), porém inacessível para o servidor/Middleware do Next.js.
2. **Cookies:** Acessíveis tanto pelo navegador (Javascript) quanto pelo servidor (Middleware) em cada requisição.

## Decisão

Nós decidimos adotar a seguinte abordagem híbrida para o Poliouapp:

1. **Armazenamento do Token em Cookies:** 
   O Token JWT retornado pela API no momento do login (ou cadastro) será salvo em um Cookie não-HttpOnly (ex: `poliouapp.token`). Isso permitirá que o Next.js Middleware faça a leitura imediata desse cookie.
2. **Uso de Middleware para Proteção de Rotas:** 
   Utilizaremos o `middleware.ts` do Next.js para interceptar requisições. Se o cookie `poliouapp.token` não existir em rotas protegidas, o servidor fará um redirecionamento instantâneo (HTTP 307/308) para a tela de `/login`, eliminando o "flicker" (piscar de tela) e prevenindo o download de bundles desnecessários por usuários não autorizados.
3. **Armazenamento Provisório de Dados do Usuário:** 
   Como não possuímos no momento uma rota `GET /auth/me` no backend para reidratar os dados do usuário, o objeto do usuário (Nome, E-mail) será salvo no *LocalStorage* (ou também em Cookie) para hidratar o `AuthContext` rapidamente na montagem do aplicativo.

## Consequências (Trade-offs)

### Pontos Positivos
* **Segurança e UX (Flicker-free):** O redirecionamento acontece no servidor na velocidade da luz (Edge/Node), antes mesmo da página HTML ser entregue ao navegador do usuário.
* **Prontidão para o Futuro:** Ter o token em um cookie facilita futuras transições para Server Components puros ou SSR (Server-Side Rendering), já que o Next.js poderá consumir os cookies com `cookies().get()`.
* **Desempenho:** Cookies são enviados automaticamente em requisições, facilitando a injeção do Token.

### Pontos Negativos / Riscos Mapeados
* **Limite de Tamanho:** Cookies possuem um limite estrito de 4KB por domínio. Se o payload do Token ficar gigantesco (muitas roles, permissões embutidas), ele pode ser cortado.
* **Falsa Positiva de Autenticação:** Como não validaremos a expiração do token via API no primeiro momento da visita, o Middleware pode deixar passar um token "morto", cabendo à primeira chamada de API no cliente (que falhar com HTTP 401) ejetar o usuário. 
* **Dados Defasados (Stale Data):** Ao confiar no LocalStorage para dados como o "Nome", se o usuário alterar seu perfil em outro dispositivo, o nome antigo continuará na tela até um novo login. 

## Passos Futuros
* Criar uma rota `GET /api/auth/me` no backend. Quando isso ocorrer, aboliremos o salvamento do objeto de usuário no frontend e confiaremos apenas no Cookie do Token, batendo nessa rota na inicialização do `AuthContext` para buscar os dados sempre frescos.
