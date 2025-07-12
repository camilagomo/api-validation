/**
 * Testes da API do carrinho de compras
 * Testes de integração usando Jest e Supertest
 */

const request = require('supertest');
const app = require('../src/server');
const cartModel = require('../src/models/cartModel');

describe('API Carrinho de Compras', () => {
  let testProductId;

  // Limpa o carrinho antes de cada teste
  beforeEach(async () => {
    cartModel._forceReset();
    await request(app).delete('/api/cart/clear');
  });

  describe('GET /api/cart', () => {
    it('deve retornar carrinho vazio', async () => {
      const response = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toEqual([]);
      expect(response.body.data.total).toBe(0);
      expect(response.body.data.itemCount).toBe(0);
    });

    it('deve retornar produtos no carrinho', async () => {
      // Adiciona um produto primeiro
      const product = {
        productId: '123',
        name: 'Produto Teste',
        price: 29.99,
        quantity: 2
      };

      await request(app)
        .post('/api/cart')
        .send(product)
        .expect(201);

      // Verifica se o produto foi adicionado
      const response = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.total).toBe(59.98);
      expect(response.body.data.itemCount).toBe(1);
    });
  });

  describe('POST /api/cart', () => {
    it('deve adicionar um produto ao carrinho', async () => {
      const product = {
        productId: '123',
        name: 'Produto Teste',
        price: 29.99,
        quantity: 2
      };

      const response = await request(app)
        .post('/api/cart')
        .send(product)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Produto adicionado ao carrinho com sucesso');
      expect(response.body.data.productId).toBe('123');
      expect(response.body.data.name).toBe('Produto Teste');
      expect(response.body.data.price).toBe(29.99);
      expect(response.body.data.quantity).toBe(2);
    });

    it('deve atualizar quantidade se produto já existe', async () => {
      const product = {
        productId: '123',
        name: 'Produto Teste',
        price: 29.99,
        quantity: 2
      };

      // Adiciona o produto pela primeira vez
      await request(app)
        .post('/api/cart')
        .send(product)
        .expect(201);

      // Adiciona o mesmo produto novamente
      const response = await request(app)
        .post('/api/cart')
        .send(product)
        .expect(201);

      expect(response.body.data.quantity).toBe(4); // 2 + 2
    });

    it('deve retornar erro se campos obrigatórios estiverem faltando', async () => {
      const invalidProduct = {
        productId: '123',
        name: 'Produto Teste'
        // price e quantity faltando
      };

      const response = await request(app)
        .post('/api/cart')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Campos obrigatórios');
    });

    it('deve retornar erro se preço ou quantidade forem inválidos', async () => {
      const invalidProduct = {
        productId: '123',
        name: 'Produto Teste',
        price: -10,
        quantity: 0
      };

      const response = await request(app)
        .post('/api/cart')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/cart/:productId', () => {
    beforeEach(async () => {
      // Adiciona um produto para os testes
      const product = {
        productId: '123',
        name: 'Produto Teste',
        price: 29.99,
        quantity: 2
      };

      await request(app)
        .post('/api/cart')
        .send(product);

      testProductId = '123';
    });

    it('deve atualizar a quantidade de um produto', async () => {
      const response = await request(app)
        .put(`/api/cart/${testProductId}`)
        .send({ quantity: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Quantidade atualizada com sucesso');
      expect(response.body.data.quantity).toBe(5);
    });

    it('deve retornar erro se quantidade for inválida', async () => {
      const response = await request(app)
        .put(`/api/cart/${testProductId}`)
        .send({ quantity: 0 })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('deve retornar erro se produto não existir', async () => {
      const response = await request(app)
        .put('/api/cart/999')
        .send({ quantity: 5 })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Erro ao atualizar quantidade');
    });

    it('deve retornar erro se quantity não for fornecida', async () => {
      const response = await request(app)
        .put(`/api/cart/${testProductId}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Campo obrigatório');
    });
  });

  describe('DELETE /api/cart/:productId', () => {
    beforeEach(async () => {
      // Adiciona um produto para os testes
      const product = {
        productId: '123',
        name: 'Produto Teste',
        price: 29.99,
        quantity: 2
      };

      await request(app)
        .post('/api/cart')
        .send(product);

      testProductId = '123';
    });

    it('deve remover um produto do carrinho', async () => {
      const response = await request(app)
        .delete(`/api/cart/${testProductId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Produto removido do carrinho com sucesso');

      // Verifica se o produto foi realmente removido
      const cartResponse = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(cartResponse.body.data.items).toHaveLength(0);
    });

    it('deve retornar erro se produto não existir', async () => {
      const response = await request(app)
        .delete('/api/cart/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Erro ao remover produto');
    });
  });

  describe('GET /api/cart/:productId', () => {
    beforeEach(async () => {
      // Adiciona um produto para os testes
      const product = {
        productId: '123',
        name: 'Produto Teste',
        price: 29.99,
        quantity: 2
      };

      await request(app)
        .post('/api/cart')
        .send(product);

      testProductId = '123';
    });

    it('deve retornar um produto específico', async () => {
      const response = await request(app)
        .get(`/api/cart/${testProductId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.productId).toBe('123');
      expect(response.body.data.name).toBe('Produto Teste');
      expect(response.body.data.price).toBe(29.99);
      expect(response.body.data.quantity).toBe(2);
    });

    it('deve retornar erro se produto não existir', async () => {
      const response = await request(app)
        .get('/api/cart/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Produto não encontrado');
    });
  });

  describe('DELETE /api/cart/clear', () => {
    beforeEach(async () => {
      // Adiciona produtos para os testes
      const products = [
        {
          productId: '123',
          name: 'Produto 1',
          price: 29.99,
          quantity: 2
        },
        {
          productId: '456',
          name: 'Produto 2',
          price: 15.50,
          quantity: 1
        }
      ];

      for (const product of products) {
        await request(app)
          .post('/api/cart')
          .send(product);
      }
    });

    it('deve limpar o carrinho', async () => {
      const response = await request(app)
        .delete('/api/cart/clear')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Carrinho limpo com sucesso');

      // Verifica se o carrinho está vazio
      const cartResponse = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(cartResponse.body.data.items).toHaveLength(0);
      expect(cartResponse.body.data.total).toBe(0);
    });
  });

  describe('Rotas auxiliares', () => {
    it('deve retornar informações da API na rota raiz', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toBe('API REST - Carrinho de Compras E-commerce');
      expect(response.body.version).toBe('1.0.0');
      expect(response.body.documentation).toBe('/api-docs');
    });

    it('deve retornar status OK no health check', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
    });

    it('deve retornar 404 para rotas não encontradas', async () => {
      const response = await request(app)
        .get('/rota-inexistente')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Rota não encontrada');
    });
  });
}); 