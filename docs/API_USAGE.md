# Como Consultar a API do Poliouapp

Este guia ensina como fazer requisições para a API do projeto utilizando ferramentas comuns como **cURL**, **Fetch API (JavaScript)** e a própria interface do **Swagger**.

Antes de testar, certifique-se de que o backend está rodando:
```bash
cd backend
npm start
# O servidor rodará em http://localhost:5000
```

---

## 1. Usando a Interface do Swagger (Recomendado para Testes Manuais)

A forma mais fácil de entender e testar a API é usando nossa interface gráfica:

1. Acesse no seu navegador: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
2. Clique no endpoint desejado (ex: `POST /auth/register`).
3. Clique no botão **"Try it out"**.
4. Modifique o JSON de exemplo com os dados que deseja enviar e clique em **"Execute"**.
5. A resposta do servidor (Server response) aparecerá logo abaixo.

---

## 2. Exemplos de Consultas (cURL e JavaScript)

Abaixo estão os exemplos de como fazer as requisições via terminal (cURL) ou diretamente pelo código do Frontend (Next.js usando `fetch`).

### Endpoint: Registrar Usuário
- **URL**: `POST http://localhost:5000/auth/register`
- **O que faz**: Cria um novo usuário no sistema.

**Via cURL (Terminal):**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luiz",
    "email": "luiz@example.com",
    "password": "SenhaForte123"
  }'
```

**Via Fetch (Frontend / JavaScript):**
```javascript
async function registerUser() {
  const response = await fetch('http://localhost:5000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Luiz',
      email: 'luiz@example.com',
      password: 'SenhaForte123'
    })
  });

  const data = await response.json();
  console.log(data);
}
```

---

### Endpoint: Fazer Login
- **URL**: `POST http://localhost:5000/auth/login`
- **O que faz**: Autentica o usuário e devolve um token de acesso.

**Via cURL (Terminal):**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "luiz@example.com",
    "password": "SenhaForte123"
  }'
```

**Via Fetch (Frontend / JavaScript):**
```javascript
async function loginUser() {
  const response = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'luiz@example.com',
      password: 'SenhaForte123'
    })
  });

  const data = await response.json();
  
  if (response.ok) {
    console.log("Token de acesso:", data.token);
    // Salvar token no localStorage ou cookies
    // localStorage.setItem('token', data.token);
  } else {
    console.error("Erro no login:", data);
  }
}
```
