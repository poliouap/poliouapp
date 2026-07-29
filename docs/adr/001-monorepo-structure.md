# ADR 001: Arquitetura de Monorepo

## Status
Aceito

## Contexto
Estamos iniciando um novo projeto com uma equipe pequena (dois desenvolvedores). Precisamos decidir sobre a estrutura do projeto (Monorepo vs. Polyrepo) para equilibrar a velocidade de desenvolvimento, a manutenibilidade e a complexidade operacional.

## Decisão
Decidimos adotar uma estrutura inicial de **Monorepo** para este projeto. Todos os componentes do projeto (frontend, backend) residirão dentro de um único repositório de controle de versão.

## Consequências
### Positivas
- **Simplicidade:** Gerenciamento de dependências simplificado e configuração compartilhada entre os serviços.
- **Velocidade:** Ciclos de desenvolvimento mais rápidos, já que as alterações no frontend e no backend podem ser atômicas e facilmente coordenadas.
- **Menor Sobrecarga:** Não há necessidade de orquestração complexa de pipelines de CI/CD em vários repositórios neste estágio.

### Negativas
- **Tempos de Build:** À medida que a base de código cresce, os pipelines de CI/CD podem se tornar mais lentos se não forem cuidadosamente otimizados.
- **Escalabilidade do CI:** Eventualmente, precisaremos implementar ferramentas (como Turborepo ou Nx) para gerenciar builds incrementais e cache à medida que o projeto se expandir.

## Racional
Dado que nossa equipe atualmente consiste em apenas dois desenvolvedores, introduzir a complexidade de gerenciar vários repositórios, atualizações de dependências entre repositórios e fluxos de trabalho de CI/CD fragmentados não traz valor imediato. Um monorepo nos permite focar na entrega rápida de recursos enquanto mantemos nossa infraestrutura mínima. Podemos reavaliar esta decisão se o projeto crescer significativamente ou se o tamanho da nossa equipe aumentar.
