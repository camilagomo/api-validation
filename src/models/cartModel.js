let cart = [];

const addProduct = (product) => {
  const { productId, name, price, quantity } = product;
  if (!productId || !name || !price || !quantity) {
    throw new Error('Todos os campos são obrigatórios: productId, name, price, quantity');
  }
  if (price <= 0 || quantity <= 0) {
    throw new Error('Preço e quantidade devem ser maiores que zero');
  }
  const existingProductIndex = cart.findIndex(item => item.productId === productId);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
    return cart[existingProductIndex];
  } else {
    const newProduct = {
      productId,
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      addedAt: new Date().toISOString()
    };
    cart.push(newProduct);
    return newProduct;
  }
};

const removeProduct = (productId) => {
  const initialLength = cart.length;
  cart = cart.filter(item => item.productId !== productId);
  if (cart.length === initialLength) {
    throw new Error('Produto não encontrado no carrinho');
  }
  return true;
};

const updateProductQuantity = (productId, quantity) => {
  if (quantity <= 0) {
    throw new Error('Quantidade deve ser maior que zero');
  }
  const productIndex = cart.findIndex(item => item.productId === productId);
  if (productIndex === -1) {
    throw new Error('Produto não encontrado no carrinho');
  }
  cart[productIndex].quantity = parseInt(quantity);
  cart[productIndex].updatedAt = new Date().toISOString();
  return cart[productIndex];
};

const getCart = () => {
  return [...cart];
};

const getCartTotal = () => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const clearCart = () => {
  cart = [];
  return true;
};

const getProduct = (productId) => {
  return cart.find(item => item.productId === productId) || null;
};

const _forceReset = () => {
  cart = [];
};

module.exports = {
  addProduct,
  removeProduct,
  updateProductQuantity,
  getCart,
  getCartTotal,
  clearCart,
  getProduct,
  _forceReset
}; 