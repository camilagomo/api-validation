const request = require('supertest');
const app = require('../src/server');

describe('API do Carrinho de Compras', () => {
  beforeEach(async () => {
    // Limpa o carrinho antes de cada teste
    await request(app).delete('/api/cart/clear');
  });

  describe('GET /api/cart', () => {
    it('deve retornar carrinho vazio inicialmente', async () => {
      const response = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toEqual([]);
      expect(response.body.data.total).toBe(0);
      expect(response.body.data.itemCount).toBe(0);
    });
  });

  describe('POST /api/cart/add', () => {
    it('deve adicionar um produto ao carrinho com sucesso', async () => {
      const product = {
        productId: '1',
        name: 'Produto Teste',
        price: 29.99,
        quantity: 2
      };

      const response = await request(app)
        .post('/api/cart/add')
        .send(product)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Produto adicionado ao carrinho com sucesso');
      expect(response.body.data).toMatchObject(product);
    });

    it('deve retornar 400 quando campos obrigatórios estão faltando', async () => {
      const invalidProduct = {
        productId: '1',
        name: 'Produto Teste'
        // faltando price e quantity
      };

      const response = await request(app)
        .post('/api/cart/add')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Campos obrigatórios');
    });
  });

  describe('PUT /api/cart/:productId/quantity', () => {
    beforeEach(async () => {
      // Adiciona um produto primeiro
      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '1',
          name: 'Produto Teste',
          price: 29.99,
          quantity: 2
        });
    });

    it('deve atualizar quantidade do produto com sucesso', async () => {
      const response = await request(app)
        .put('/api/cart/1/quantity')
        .send({ quantity: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Quantidade atualizada com sucesso');
      expect(response.body.data.quantity).toBe(5);
    });

    it('deve retornar 400 quando quantidade está faltando', async () => {
      const response = await request(app)
        .put('/api/cart/1/quantity')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Campo obrigatório');
    });

    it('deve retornar 404 quando produto não existe', async () => {
      const response = await request(app)
        .put('/api/cart/999/quantity')
        .send({ quantity: 5 })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/cart/:productId', () => {
    beforeEach(async () => {
      // Adiciona um produto primeiro
      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '1',
          name: 'Produto Teste',
          price: 29.99,
          quantity: 2
        });
    });

    it('deve remover produto do carrinho com sucesso', async () => {
      const response = await request(app)
        .delete('/api/cart/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Produto removido do carrinho com sucesso');
    });

    it('deve retornar 404 quando produto não existe', async () => {
      const response = await request(app)
        .delete('/api/cart/999')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/cart/:productId', () => {
    beforeEach(async () => {
      // Adiciona um produto primeiro
      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '1',
          name: 'Produto Teste',
          price: 29.99,
          quantity: 2
        });
    });

    it('deve retornar detalhes do produto com sucesso', async () => {
      const response = await request(app)
        .get('/api/cart/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.productId).toBe('1');
      expect(response.body.data.name).toBe('Produto Teste');
    });

    it('deve retornar 404 quando produto não existe', async () => {
      const response = await request(app)
        .get('/api/cart/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Produto não encontrado');
    });
  });

  describe('DELETE /api/cart/clear', () => {
    beforeEach(async () => {
      // Adiciona produtos primeiro
      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '1',
          name: 'Produto Teste 1',
          price: 29.99,
          quantity: 2
        });

      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '2',
          name: 'Produto Teste 2',
          price: 19.99,
          quantity: 1
        });
    });

    it('deve limpar o carrinho com sucesso', async () => {
      const response = await request(app)
        .delete('/api/cart/clear')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Carrinho limpo com sucesso');

      // Verifica se o carrinho está vazio
      const cartResponse = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(cartResponse.body.data.items).toEqual([]);
      expect(cartResponse.body.data.total).toBe(0);
    });
  });

  describe('Cálculo do total do carrinho', () => {
    it('deve calcular o total corretamente com múltiplos produtos', async () => {
      // Adiciona primeiro produto
      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '1',
          name: 'Produto 1',
          price: 10.00,
          quantity: 2
        });

      // Adiciona segundo produto
      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '2',
          name: 'Produto 2',
          price: 15.50,
          quantity: 1
        });

      const response = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(response.body.data.items).toHaveLength(2);
      expect(response.body.data.total).toBe(35.50); // (10 * 2) + (15.50 * 1)
      expect(response.body.data.itemCount).toBe(2);
    });
  });

  describe('Atualização de quantidade de produtos', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/cart/add')
        .send({
          productId: '1',
          name: 'Produto Teste',
          price: 25.00,
          quantity: 1
        });
    });

    it('deve atualizar quantidade e recalcular o total', async () => {
      // Atualiza quantidade
      await request(app)
        .put('/api/cart/1/quantity')
        .send({ quantity: 3 })
        .expect(200);

      // Verifica o total do carrinho
      const response = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(response.body.data.total).toBe(75.00); // 25 * 3
      expect(response.body.data.items[0].quantity).toBe(3);
    });
  });
}); 