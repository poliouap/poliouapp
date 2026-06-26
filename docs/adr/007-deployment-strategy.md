# ADR 007: Estratégia de Deployment

## Status
Aceito

## Contexto
Precisamos definir como nossa aplicação será entregue (deploy) e como garantiremos que o ambiente de produção seja consistente com o ambiente de desenvolvimento, evitando problemas de "na minha máquina funciona".

## Decisão
Utilizaremos **Docker** como base para a containerização, **Docker Hub** como registro de imagens, **Vercel** para o deploy do frontend e **Railway** para o deploy do backend.

## Racional
- **Docker/Docker Hub:** A containerização garante que a aplicação rode exatamente da mesma forma em qualquer ambiente, eliminando discrepâncias de configuração (versões de Node.js, dependências do sistema). O Docker Hub serve como fonte única de verdade para nossas imagens.
- **Vercel (Frontend):** Especializada em aplicações Next.js, oferece excelente performance, CDN global e facilidade de integração contínua (CI/CD) para o frontend.
- **Railway (Backend):** Plataforma amigável para containers que simplifica o deploy de serviços backend, oferecendo facilidade na gestão de variáveis de ambiente e escalabilidade simples.

## Consequências
### Positivas
- **Consistência de Ambiente:** Docker garante que não teremos problemas de incompatibilidade entre desenvolvimento e produção.
- **Agilidade de Deploy:** A integração nativa das plataformas escolhidas (Vercel/Railway) com o nosso fluxo de CI/CD minimiza o trabalho manual de ops.
- **Independência:** O uso de containers torna a aplicação portável; caso seja necessário mudar de provedor de nuvem no futuro, a migração é simplificada.

### Negativas
- **Complexidade de CI/CD:** Exige manutenção dos `Dockerfiles` e dos pipelines de CI (GitHub Actions) para garantir que as imagens sejam geradas corretamente.
- **Custo:** Embora existam planos gratuitos/baratos, o custo pode aumentar conforme a escala e necessidade de recursos dos serviços.
