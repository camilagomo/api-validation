# API REST - Carrinho de Compras E-commerce

Esta é uma API REST desenvolvida em JavaScript com Express para gestão de carrinho de compras em um e-commerce. O projeto foi criado para estudos de teste de software.

## 🚀 Funcionalidades

- ✅ Adicionar produto ao carrinho
- ✅ Remover produto do carrinho  
- ✅ Alterar quantidade de produtos no carrinho
- ✅ Listar produtos do carrinho

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório ou baixe os arquivos
2. Instale as dependências:
```bash
npm install
```

## 🚀 Como executar

### Desenvolvimento (com hot reload)
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

## 🔍 Qualidade de Código

### Executar linting
```bash
npm run lint
```

### Corrigir problemas de linting automaticamente
```bash
npm run lint:fix
```

## 📚 Documentação da API

### Swagger UI
Acesse a documentação interativa da API em:
```
http://localhost:3000/api-docs
```

## 🔗 Endpoints da API

### Base URL: `http://localhost:3000`

#### 1. Listar produtos do carrinho
- **GET** `/api/cart`
- **Descrição**: Retorna todos os produtos no carrinho

#### 2. Adicionar produto ao carrinho
- **POST** `/api/cart`
- **Body**:
```json
{
  "productId": "123",
  "name": "Produto Exemplo",
  "price": 29.99,
  "quantity": 2
}
```

#### 3. Atualizar quantidade de produto
- **PUT** `/api/cart/:productId`
- **Body**:
```json
{
  "quantity": 5
}
```

#### 4. Remover produto do carrinho
- **DELETE** `/api/cart/:productId`

#### 5. Limpar carrinho
- **DELETE** `/api/cart/clear`

## 🗄️ Armazenamento

- **Tipo**: Memória (variáveis/constantes)
- **Persistência**: Não há persistência - dados são perdidos ao reiniciar o servidor
- **Formato**: JSON

## 🔄 CI/CD

O projeto utiliza um workflow único de CI/CD no GitHub Actions, que executa automaticamente:

- **Lint:** Verifica a qualidade do código com ESLint
- **Testes:** Executa todos os testes automatizados com Jest e Supertest
- **Auditoria de Segurança:** Roda `npm audit` para identificar vulnerabilidades
- **Deploy:** Faz deploy automático para o Heroku (apenas na branch `main`)

O pipeline é executado em cada push ou pull request para as branches `main` e `develop`. O deploy só ocorre em pushs para a branch `main`.

O arquivo do workflow está em `.github/workflows/ci-cd.yml`.

## 📁 Estrutura do Projeto

```
├── .github/
│   └── workflows/
│       ├── api-tests.yml      # Testes automatizados
│       ├── code-quality.yml   # Qualidade de código
│       └── deploy.yml         # Deploy automático
├── src/
│   ├── server.js              # Servidor principal
│   ├── routes/
│   │   └── cartRoutes.js      # Rotas do carrinho
│   ├── controllers/
│   │   └── cartController.js  # Controladores do carrinho
│   └── models/
│       └── cartModel.js       # Modelo de dados do carrinho
├── tests/
│   └── cart.test.js           # Testes da API
├── .eslintrc.json             # Configuração ESLint
├── jest.config.js             # Configuração Jest
├── codecov.yml                # Configuração Codecov
├── package.json
└── README.md
```

## 🔧 Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **Swagger**: Documentação da API
- **CORS**: Middleware para CORS
- **Helmet**: Segurança
- **Morgan**: Logging
- **Jest**: Framework de testes
- **Supertest**: Testes de integração
- **ESLint**: Linting de código
- **GitHub Actions**: CI/CD

## 📝 Notas

- Esta API é destinada apenas para estudos de teste de software
- Não há persistência de dados (armazenamento em memória)
- Não há autenticação implementada
- Os dados são perdidos ao reiniciar o servidor

## 👨‍💻 Desenvolvimento

Para desenvolvimento local, a API estará disponível em:
- **URL**: `http://localhost:3000`
- **Swagger**: `http://localhost:3000/api-docs`

## 🚀 Deploy

Para configurar o deploy automático:

1. Configure os secrets no GitHub:
   - `HEROKU_API_KEY`
   - `HEROKU_APP_NAME`
   - `HEROKU_EMAIL`

2. O deploy será executado automaticamente após push para a branch `main`

## 📊 Cobertura de Testes

Os relatórios de cobertura são gerados automaticamente e enviados para o Codecov após cada push.
