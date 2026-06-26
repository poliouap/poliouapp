# ADR 003: Estratégia de API REST

## Status
Aceito

## Contexto
Precisamos definir o padrão de comunicação entre o frontend e o backend. Avaliamos GraphQL e REST. O GraphQL é reconhecido pela sua flexibilidade em consultar subconjuntos de dados (queries granulares), enquanto o REST foca em recursos e endpoints definidos.

## Decisão
Adotaremos **REST API** como padrão de comunicação para nossa aplicação.

## Racional
O padrão de acesso a dados da nossa aplicação consiste majoritariamente em consumir o conjunto completo de dados de um recurso por requisição. Não há uma necessidade frequente ou significativa de consultar subconjuntos granulares de campos. Como o GraphQL introduz uma camada extra de complexidade (validação de schemas, resolver de campos, etc.) que não traria benefícios claros para o nosso caso de uso, o REST se mostra mais eficiente, simples de implementar e mais alinhado com a nossa arquitetura atual.

## Consequências
### Positivas
- **Simplicidade:** Menor sobrecarga técnica e complexidade de implementação no servidor e cliente.
- **Cacheability:** Melhor aproveitamento de mecanismos de cache HTTP padrão.
- **Ecosistema:** Ferramentas robustas e maduras para documentação (ex: OpenAPI/Swagger) e testes.

### Negativas
- **Over-fetching:** Em cenários futuros onde possamos precisar apenas de campos específicos, o REST pode retornar mais dados do que o necessário, comparado ao GraphQL.
- **Flexibilidade:** Menor flexibilidade para o cliente definir exatamente o que deseja consumir sem criar novos endpoints ou parâmetros de query.

## Considerações Futuras
Se, com a introdução da loja de plugins ou novos serviços, o padrão de consumo de dados mudar drasticamente para requisições de subconjuntos granulares e complexos, reavaliaremos a adoção de GraphQL ou implementações híbridas.
