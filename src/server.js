/**
 * Servidor principal da API REST
 * Configuração do Express com middleware de segurança e Swagger
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importação das rotas
const cartRoutes = require('./routes/cartRoutes');

// Configuração do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// Middleware CORS
app.use(cors());

// Middleware de logging
app.use(morgan('combined'));

// Middleware para parsing de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - Carrinho de Compras E-commerce',
      version: '1.0.0',
      description: 'API REST para gestão de carrinho de compras em e-commerce. Desenvolvida para estudos de teste de software.',
      contact: {
        name: 'Estudo de Teste de Software',
        email: 'estudo@teste.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    tags: [
      {
        name: 'Carrinho',
        description: 'Operações relacionadas ao carrinho de compras'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'API REST - Carrinho de Compras E-commerce',
    version: '1.0.0',
    description: 'API para gestão de carrinho de compras',
    documentation: '/api-docs',
    endpoints: {
      cart: '/api/cart'
    }
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Carrinho de Compras - Documentação'
}));

// Rotas da API
app.use('/api/cart', cartRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não foi encontrada`,
    availableRoutes: {
      documentation: '/api-docs',
      health: '/health',
      cart: '/api/cart'
    }
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`🔗 API disponível em: http://localhost:${PORT}/api/cart`);
  console.log(`💚 Health check em: http://localhost:${PORT}/health`);
});

module.exports = app; 