/**
 * Controlador do carrinho de compras
 * Gerencia as requisições HTTP relacionadas ao carrinho
 */

const cartModel = require('../models/cartModel');

const getCart = (req, res) => {
  try {
    const cart = cartModel.getCart();
    const total = cartModel.getCartTotal();
    res.status(200).json({
      success: true,
      data: {
        items: cart,
        total: total,
        itemCount: cart.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
};

const addProduct = (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios',
        message: 'Todos os campos são obrigatórios: productId, name, price, quantity'
      });
    }
    const product = cartModel.addProduct({
      productId,
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    });
    res.status(201).json({
      success: true,
      message: 'Produto adicionado ao carrinho com sucesso',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao adicionar produto',
      message: error.message
    });
  }
};

const updateProductQuantity = (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (!quantity) {
      return res.status(400).json({
        success: false,
        error: 'Campo obrigatório',
        message: 'O campo quantity é obrigatório'
      });
    }
    const updatedProduct = cartModel.updateProductQuantity(productId, quantity);
    res.status(200).json({
      success: true,
      message: 'Quantidade atualizada com sucesso',
      data: updatedProduct
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: 'Erro ao atualizar quantidade',
      message: error.message
    });
  }
};

const removeProduct = (req, res) => {
  try {
    const { productId } = req.params;
    cartModel.removeProduct(productId);
    res.status(200).json({
      success: true,
      message: 'Produto removido do carrinho com sucesso'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: 'Erro ao remover produto',
      message: error.message
    });
  }
};

const getProduct = (req, res) => {
  try {
    const { productId } = req.params;
    const product = cartModel.getProduct(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado',
        message: 'O produto não foi encontrado no carrinho'
      });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
};

const clearCart = (req, res) => {
  try {
    cartModel.clearCart();
    res.status(200).json({
      success: true,
      message: 'Carrinho limpo com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
};

module.exports = {
  getCart,
  addProduct,
  updateProductQuantity,
  removeProduct,
  getProduct,
  clearCart
}; 