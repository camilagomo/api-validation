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

## 🗄️ Armazenamento

- **Tipo**: Memória (variáveis/constantes)
- **Persistência**: Não há persistência - dados são perdidos ao reiniciar o servidor
- **Formato**: JSON

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── server.js          # Servidor principal
│   ├── routes/
│   │   └── cartRoutes.js  # Rotas do carrinho
│   ├── controllers/
│   │   └── cartController.js # Controladores do carrinho
│   └── models/
│       └── cartModel.js   # Modelo de dados do carrinho
├── tests/
│   └── cart.test.js       # Testes da API
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

## 📝 Notas

- Esta API é destinada apenas para estudos de teste de software
- Não há persistência de dados (armazenamento em memória)
- Não há autenticação implementada
- Os dados são perdidos ao reiniciar o servidor

## 👨‍💻 Desenvolvimento

Para desenvolvimento local, a API estará disponível em:
- **URL**: `http://localhost:3000`
- **Swagger**: `http://localhost:3000/api-docs` 