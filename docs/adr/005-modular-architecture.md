# ADR 005: Migração para Arquitetura Modular e TypeScript

## Status
Aceito

## Contexto
O projeto iniciou com uma proposta de arquitetura em camadas (Layered Architecture - ADR 002) usando JavaScript puro. No entanto, o time de desenvolvimento é enxuto (2 pessoas) e o escopo do Folio é altamente baseado em domínios específicos (Autenticação, Cadernos, Logs). Além disso, a falta de tipagem forte estava abrindo margem para erros, especialmente lidando com o Prisma ORM e os payloads do frontend.

## Decisão
1. **Adotar TypeScript:** Todo o backend será reescrito e mantido em TypeScript para garantir tipagem forte, melhor autocompletar e maior segurança durante o desenvolvimento.
2. **Arquitetura Modular (Feature-based):** Em vez de organizar os arquivos pelo tipo técnico (controllers, services, routes), organizaremos pelo domínio do negócio (módulos). 

## Estrutura Proposta
```text
backend/
├── prisma/               # Configuração de persistência (schema)
├── src/
│   ├── app.ts            # Configuração do Express (middlewares, routes import)
│   ├── server.ts         # Ponto de entrada (inicia o servidor HTTP)
│   ├── core/             # Lógicas globais e compartilhadas
│   │   ├── config/
│   │   └── middlewares/
│   └── modules/          # Domínios de negócio
│       ├── auth/
│       ├── notebook/
│       └── logs/
```

## Consequências
### Positivas
- **Prevenção de Merge Conflicts:** Desenvolvedores trabalhando em domínios diferentes (ex: Auth vs Notebooks) tocarão em pastas completamente separadas.
- **Segurança de Tipagem:** O uso de TypeScript integrado com Prisma gerará tipos automáticos (Type Safety) de ponta a ponta.
- **Separação de Express e Server:** Separar `app.ts` de `server.ts` facilita a criação de testes de integração no futuro.

### Negativas
- **Curva inicial:** O TypeScript exige configuração inicial extra.
