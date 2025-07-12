const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.post('/', cartController.addProduct);
router.delete('/clear', cartController.clearCart);
router.get('/:productId', cartController.getProduct);
router.put('/:productId', cartController.updateProductQuantity);
router.delete('/:productId', cartController.removeProduct);

module.exports = router; 