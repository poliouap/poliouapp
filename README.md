# poliouapp

Este é um projeto composto por uma API **Backend** construída com Express e um **Frontend** web moderno com Next.js.

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão recomendada v18 ou superior)
- **npm** (gerenciador de pacotes do Node, instalado automaticamente com ele) ou **yarn**
- **Docker** (opcional, para execução local em containers)

---

## 🚀 Como rodar o projeto localmente

O projeto é dividido em duas partes principais: `backend` e `frontend`. Para rodar a aplicação completa, você precisará iniciar ambos os serviços.

### 1. Inicializando o Backend (Express)

O backend é uma API em Node.js rodando por padrão na porta `5000`.

1. Navegue para o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências necessárias:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor estará rodando em: [http://localhost:5000](http://localhost:5000).
Você pode testar se a API está ativa acessando a rota de saúde: [http://localhost:5000/health](http://localhost:5000/health).

---

### 2. Inicializando o Frontend (Next.js)

O frontend é uma aplicação React com Next.js rodando por padrão na porta `3000`.

1. Em um **novo terminal**, navegue para o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação frontend estará rodando em: [http://localhost:3000](http://localhost:3000).

---

## 🐳 Docker (Containerização)

O projeto está totalmente configurado para rodar com Docker através dos Dockerfiles em cada serviço.

### Construir e rodar as imagens localmente

#### Backend
```bash
cd backend
docker build -t poliouapp-backend .
docker run -p 5000:5000 poliouapp-backend
```

#### Frontend
```bash
cd frontend
docker build -t poliouapp-frontend .
docker run -p 3000:3000 poliouapp-frontend
```

---

## 🚀 Integração Contínua (CI/CD) com GitHub Actions

O repositório possui uma pipeline automatizada para compilar e publicar as imagens Docker no **Docker Hub** sempre que houver um commit/push na branch `main`.

### O que foi configurado:
- **`backend/Dockerfile`**: Configuração enxuta e otimizada com Node.js Alpine para a API.
- **`frontend/Dockerfile`**: Build multi-stage para Next.js visando manter o tamanho final da imagem o menor possível e otimizar o tempo de build em ambiente de produção.
- **`.github/workflows/docker-publish.yml`**: Pipeline automatizada que:
  1. Detecta pushes na branch `main`.
  2. Autentica com o Docker Hub.
  3. Compila e otimiza as imagens utilizando cache do GitHub Actions (`cache-from` / `cache-to`).
  4. Publica as imagens com a tag `latest` e também uma tag baseada no hash do commit (`SHA`).

### Como ativar em seu repositório GitHub:
Para que o workflow funcione corretamente, adicione as seguintes **Secrets** nas configurações do seu repositório no GitHub (`Settings > Secrets and variables > Actions`):

1. **`DOCKER_HUB_USERNAME`**: O seu nome de usuário do Docker Hub.
2. **`DOCKER_HUB_TOKEN`**: O seu Personal Access Token (PAT) do Docker Hub (gerado em *Account Settings > Security* no Docker Hub).

As imagens serão geradas no Docker Hub com os caminhos:
- `seu-usuario/poliouapp-backend`
- `seu-usuario/poliouapp-frontend`

---

## 📂 Estrutura do Repositório

```text
poliouapp/
├── .github/
│   └── workflows/ # Pipeline CI/CD do GitHub Actions
├── backend/       # API Express (Node.js) e Dockerfile
└── frontend/      # Aplicação web React (Next.js) e Dockerfile
```
