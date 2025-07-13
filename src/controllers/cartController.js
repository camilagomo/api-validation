const cartModel = require('../models/cartModel');

// Obter todos os itens do carrinho
const getCart = (req, res) => {
  try {
    const items = cartModel.getItems();
    const total = cartModel.getTotal();
    const itemCount = cartModel.getItemCount();

    res.json({
      success: true,
      data: {
        items,
        total,
        itemCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Adicionar produto ao carrinho
const addToCart = (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;

    // Validação de campos obrigatórios
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios'
      });
    }

    const product = { productId, name, price, quantity };
    const addedProduct = cartModel.addItem(product);

    res.status(201).json({
      success: true,
      message: 'Produto adicionado ao carrinho com sucesso',
      data: addedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Obter produto específico do carrinho
const getCartItem = (req, res) => {
  try {
    const { productId } = req.params;
    const item = cartModel.getItem(productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Atualizar quantidade de produto
const updateQuantity = (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({
        success: false,
        error: 'Campo obrigatório'
      });
    }

    const updatedItem = cartModel.updateQuantity(productId, quantity);

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Quantidade atualizada com sucesso',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Remover produto do carrinho
const removeFromCart = (req, res) => {
  try {
    const { productId } = req.params;
    const removedItem = cartModel.removeItem(productId);

    if (!removedItem) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Produto removido do carrinho com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Limpar carrinho
const clearCart = (req, res) => {
  try {
    cartModel.clear();

    res.json({
      success: true,
      message: 'Carrinho limpo com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  getCartItem,
  updateQuantity,
  removeFromCart,
  clearCart
};
