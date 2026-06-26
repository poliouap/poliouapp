# ADR 006: Estratégia de Testes

## Status
Aceito

## Contexto
Precisamos definir nossa estratégia de testes automatizados para garantir a qualidade, confiabilidade e facilidade de manutenção do sistema conforme ele evolui.

## Decisão
Adotaremos **Vitest** para testes unitários e de integração, e **Cypress** para testes ponta-a-ponta (E2E).

## Racional
- **Vitest:** Escolhido por oferecer uma experiência de desenvolvimento superior, ser extremamente rápido e ter integração nativa e simples com projetos baseados em Vite/ES modules, sendo menos complexo e mais performático que o Jest para nossa stack atual.
- **Cypress:** Escolhido por ser uma ferramenta consolidada no mercado para testes E2E, oferecendo uma ótima experiência de depuração, documentação vasta e facilidade para simular fluxos reais do usuário no navegador.

## Consequências
### Positivas
- **Velocidade de Feedback:** Testes rápidos (Vitest) permitem ciclos de feedback imediatos.
- **Confiabilidade:** Testes E2E (Cypress) garantem que os fluxos críticos de negócio funcionam como esperado em um ambiente similar ao de produção.
- **Padronização:** Ferramentas amplamente adotadas pela comunidade facilitam a contratação e a busca por suporte.

### Negativas
- **Complexidade de Manutenção (E2E):** Testes E2E podem ser frágeis e demorados se não forem focados apenas em fluxos críticos de negócio.
- **Ambiente de Teste:** Exige configuração adequada para garantir que o ambiente de testes (banco de dados, serviços externos) seja isolado e reproduzível.
