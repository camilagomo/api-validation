const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  getCartItem,
  updateQuantity,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// GET /api/cart - Obter todos os itens do carrinho
router.get('/', getCart);

// POST /api/cart/add - Adicionar produto ao carrinho
router.post('/add', addToCart);

// DELETE /api/cart/clear - Limpar carrinho (deve vir antes de /:productId)
router.delete('/clear', clearCart);

// GET /api/cart/:productId - Obter produto específico
router.get('/:productId', getCartItem);

// PUT /api/cart/:productId/quantity - Atualizar quantidade
router.put('/:productId/quantity', updateQuantity);

// DELETE /api/cart/:productId - Remover produto
router.delete('/:productId', removeFromCart);

module.exports = router;
