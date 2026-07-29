# ADR 004: Estratégia de Autenticação

## Status
Aceito

## Contexto
Precisamos definir um mecanismo de autenticação para o cadastro e login de usuários. O objetivo é garantir segurança e simplicidade para a entrega do MVP, mantendo a flexibilidade para integrações futuras.

## Decisão
Adotaremos **JWT (JSON Web Tokens)** como mecanismo principal de autenticação durante a fase de MVP.

## Racional
O JWT é uma solução amplamente adotada, stateless, simples de implementar e que atende aos requisitos de segurança necessários para o MVP sem introduzir complexidade desnecessária.

## Roteiro de Evolução
- **MVP:** Autenticação baseada em JWT (emissão e validação própria).
- **Pós-MVP:** Integração com serviços de terceiros (ex: Google) utilizando **OAuth2** para oferecer logins sociais e maior conveniência ao usuário.
- **Ecossistema de Plugins:** A autenticação para plugins (consumo de APIs por terceiros) ainda não foi projetada e será definida após o amadurecimento da plataforma.

## Consequências
### Positivas
- **Agilidade:** Implementação rápida que permite focar nas funcionalidades de negócio do MVP.
- **Stateless:** Facilita o escalonamento horizontal, pois o backend não precisa armazenar estado de sessão em memória.

### Negativas
- **Gestão de Tokens:** Exige implementação robusta para invalidação de tokens (ex: blacklist ou tempo de expiração curto + refresh tokens).
- **Responsabilidade:** Toda a responsabilidade pela segurança da emissão e validação dos tokens recai sobre o nosso backend (diferente de delegar para um provedor de identidade).

## Considerações Finais
Esta decisão visa o equilíbrio entre segurança e velocidade. A migração ou adição de OAuth2 está prevista no roteiro de evolução e não deve causar impacto significativo se a arquitetura em camadas for respeitada, isolando a lógica de autenticação da regra de negócio.
