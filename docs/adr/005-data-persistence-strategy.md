# ADR 005: Estratégia de Persistência de Dados

## Status
Aceito

## Contexto
Precisamos definir qual banco de dados e qual camada de acesso a dados (ORM/Query Builder) utilizaremos. Nossa arquitetura em camadas (ADR 002) exige que o acesso a dados seja abstraído da lógica de negócio, garantindo que as regras de domínio não fiquem acopladas a queries específicas ou esquemas de banco de dados.

## Decisão
Adotaremos **PostgreSQL** como banco de dados relacional e **Prisma ORM** como ferramenta de abstração e acesso a dados.

## Racional
### PostgreSQL
- **Confiabilidade e ACID:** PostgreSQL é amplamente reconhecido pela sua integridade de dados, conformidade com ACID e robustez, sendo ideal para aplicações que exigem consistência (essencial para dados de usuários, transações, etc.).
- **Versatilidade:** Suporta dados relacionais complexos, além de recursos para documentos (JSONB), o que oferece flexibilidade caso surjam necessidades de dados semi-estruturados no futuro.

### Prisma ORM
- **Type Safety (Segurança de Tipos):** O Prisma gera automaticamente tipos TypeScript baseados no esquema do banco de dados. Isso reduz drasticamente erros de runtime, pois qualquer alteração no esquema é refletida imediatamente no código, garantindo que a camada de aplicação esteja sempre sincronizada com o banco.
- **Developer Experience (DX):** O Prisma oferece uma API intuitiva e fluida para realizar queries, facilitando o desenvolvimento e reduzindo o tempo gasto com queries complexas de SQL puro sem perder a capacidade de realizar otimizações quando necessário.
- **Abstração (Camada de Infraestrutura):** O Prisma encaixa-se perfeitamente na nossa Arquitetura em Camadas (ADR 002), atuando como a camada de Adapter. As regras de negócio interagem com modelos gerados pelo Prisma, mantendo a lógica de domínio isolada dos detalhes de implementação do banco.

## Consequências
### Positivas
- **Produtividade:** A combinação de autocompletar e verificação de tipos do Prisma aumenta a velocidade de desenvolvimento e confiança na refatoração.
- **Manutenibilidade:** O modelo de dados centralizado no `schema.prisma` facilita a gestão de migrações e a compreensão da estrutura do banco por toda a equipe.

### Negativas
- **Abstração (Leaky Abstractions):** Embora o Prisma facilite, ORMs podem ocasionalmente esconder comportamentos de performance (ex: o problema do N+1). A equipe deve manter a disciplina de monitorar as queries geradas.
- **Dependência:** Introduz uma dependência na biblioteca do Prisma, embora esta seja facilmente substituível ou complementável por queries SQL brutas caso necessário.

## Considerações Finais
Esta escolha equilibra a robustez e integridade do PostgreSQL com a agilidade e segurança de tipos proporcionadas pelo Prisma, criando uma fundação sólida e escalável para o nosso projeto, alinhada com as melhores práticas de desenvolvimento com TypeScript.
