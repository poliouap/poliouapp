# ADR 007: Fixação (Pinning) de Versões de Dependências

## Status
Aceito

## Contexto
O ecossistema Node.js (via NPM) utiliza, por padrão, o versionamento semântico flexível (inserindo `^` ou `~` no `package.json`). Isso significa que a cada nova instalação limpa ou rodada de CI/CD, pacotes podem ser atualizados para versões "minor" ou "patch" mais recentes automaticamente se o `package-lock.json` não for estritamente respeitado ou for excluído.

Embora atualizações automáticas de patch tragam correções de segurança, elas ocasionalmente introduzem regressões ou mudanças não documentadas que podem quebrar o sistema (o famoso "na minha máquina funciona").

## Decisão
1. **Pinagem Estrita:** Todas as dependências (tanto `dependencies` quanto `devDependencies`) devem ser fixadas (pinned) em versões exatas no `package.json`, removendo os prefixos `^` ou `~`.
2. **Atualizações Manuais:** A atualização de bibliotecas passará a ser um ato intencional e manual por parte dos desenvolvedores (ex: rodando ferramentas como `npm-check-updates` e testando as mudanças).

## Consequências
### Positivas
- **Determinismo:** A garantia de que todos os desenvolvedores e o ambiente de produção estão rodando exatamente o mesmo código de terceiros.
- **Prevenção de Quebras Silenciosas:** Uma regressão em uma biblioteca de terceiro nunca vai quebrar o build do projeto sem que o time tenha pedido pela atualização.

### Negativas
- **Débito Técnico Silencioso:** Como os pacotes não se atualizam sozinhos, correções críticas de segurança (patches) exigirão intervenção manual para serem aplicadas. O time precisará adotar uma rotina para auditar e atualizar os pacotes periodicamente.
