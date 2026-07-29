# ADR 002: Arquitetura em Camadas

## Status
Aceito

## Contexto
À medida que o projeto evolui, prevemos a necessidade de escalar para serviços adicionais (ex: gateway de pagamentos, sistemas de plugins open source). Atualmente, a estrutura deve ser flexível o suficiente para suportar essas futuras expansões sem causar um forte acoplamento, facilitando a extração de funcionalidades para microsserviços ou módulos independentes futuramente.

## Decisão
Adotaremos uma **Arquitetura em Camadas (Layered Architecture)**, onde cada camada terá responsabilidades bem definidas e será o mais independente possível das outras. As dependências devem fluir, preferencialmente, no sentido de "dentro para fora" (camada de domínio/negócio não deve conhecer detalhes de implementação de infraestrutura).

## Estrutura Proposta
- **Camada de Domínio (Core/Domain):** Contém as regras de negócio puras, entidades e lógica fundamental. Independente de frameworks ou I/O externo.
- **Camada de Aplicação (Use Cases):** Orquestra o fluxo de dados entre o domínio e as interfaces externas.
- **Camada de Infraestrutura/Interface (Adapter):** Implementações concretas de I/O, bancos de dados, APIs externas (pagamentos, etc.) e interfaces de usuário.

## Consequências
### Positivas
- **Desacoplamento:** Facilita a substituição de bibliotecas, bancos de dados ou frameworks.
- **Facilidade de Migração:** Funcionalidades de negócio podem ser extraídas para serviços separados (ex: serviço de pagamento) com impacto mínimo na lógica central, pois a dependência é baseada em contratos (interfaces).
- **Testabilidade:** A lógica de domínio torna-se altamente testável por ser isolada de preocupações externas.

### Negativas
- **Complexidade Inicial:** Introduz uma estrutura mais rígida e maior quantidade de código inicial ("boilerplate") comparado a uma arquitetura de script simples.
- **Curva de Aprendizado:** Exige disciplina da equipe para manter o desacoplamento e seguir as regras de dependência entre camadas.

## Racional
Para um projeto que almeja ser um ecossistema (loja de plugins, integração com serviços terceiros), manter o código desacoplado é crucial. A arquitetura em camadas fornece a base para "decentralizar" o conhecimento técnico do negócio, permitindo que, no futuro, possamos mover partes específicas do sistema para serviços independentes sem precisar reescrever toda a lógica de negócio.
