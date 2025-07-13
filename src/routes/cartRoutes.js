const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Listar todos os produtos do carrinho
router.get('/', cartController.getCart);

// Adicionar produto ao carrinho
router.post('/add', cartController.addProduct);

// Limpar o carrinho (deve vir antes das rotas dinâmicas)
router.delete('/clear', cartController.clearCart);

// Atualizar quantidade de um produto
router.put('/:productId/quantity', cartController.updateProductQuantity);

// Remover produto do carrinho
router.delete('/:productId', cartController.removeProduct);

// Buscar um produto específico do carrinho
router.get('/:productId', cartController.getProduct);

module.exports = router; 