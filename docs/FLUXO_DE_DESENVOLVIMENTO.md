# Fluxo de Desenvolvimento - Poliouapp

Este documento define o padrão de ciclo de desenvolvimento de novas features para o projeto, garantindo que o planejamento e a execução andem juntos.

## 1. Prototipar Tela no Figma
- **Objetivo:** Ter a visão clara de como a feature vai ficar antes de escrever qualquer código.
- **Ações:**
  - Definir quais dados o usuário precisará visualizar ou preencher.
  - Utilizar o Design System do projeto para manter consistência (cores, botões, fontes).
  - Validar a usabilidade da tela.

## 2. Documentar no Swagger
- **Objetivo:** Definir o contrato da API baseado na tela desenhada.
- **Ações:**
  - Editar o arquivo `docs/swagger.yaml`.
  - Definir as rotas necessárias (ex: `POST /users`, `GET /products`).
  - Especificar quais campos são obrigatórios, tipos de dados e os status de erro/sucesso esperados.

## 3. Criar Tabela (Banco de Dados)
- **Objetivo:** Preparar a persistência de dados.
- **Ações:**
  - Abrir o `schema.prisma`.
  - Criar o modelo correspondente (ex: `model User { ... }`).
  - Rodar as migrations para aplicar as alterações no banco de dados PostgreSQL.

## 4. Fazer Rota (Backend)
- **Objetivo:** Criar a regra de negócio e expor a funcionalidade.
- **Ações:**
  - Criar o controller/rota no Express.
  - Conectar a rota ao Prisma para ler/gravar os dados.
  - Garantir que as validações e as respostas batem 100% com o que foi definido no passo 2 (Swagger).

## 5. Criar o Frontend
- **Objetivo:** Passar o design do Figma para código.
- **Ações:**
  - Criar a página no Next.js.
  - Implementar o HTML/CSS utilizando a biblioteca de estilos adotada.
  - Criar os estados da aplicação (ex: variáveis de loading, erros de validação).

## 6. Fazer a Implementação (Integração)
- **Objetivo:** Conectar o visual aos dados reais.
- **Ações:**
  - Implementar as chamadas `fetch` ou `axios` no frontend, apontando para a rota do backend recém criada.
  - Lidar com estados de sucesso (ex: redirecionar página) e erro (ex: exibir toast de erro).
  - Testar o fluxo ponta a ponta (Figma $\rightarrow$ Banco de Dados $\rightarrow$ Tela finalizada).
