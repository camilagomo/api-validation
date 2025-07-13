let cart = [];

function getCart() {
  return cart;
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function addProduct({ productId, name, price, quantity }) {
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
    return existing;
  }
  const product = { productId, name, price, quantity };
  cart.push(product);
  return product;
}

function updateProductQuantity(productId, quantity) {
  const product = cart.find(item => item.productId === productId);
  if (!product) throw new Error('Produto não encontrado');
  product.quantity = parseInt(quantity);
  return product;
}

function removeProduct(productId) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index === -1) throw new Error('Produto não encontrado');
  cart.splice(index, 1);
}

function getProduct(productId) {
  return cart.find(item => item.productId === productId);
}

function clearCart() {
  cart = [];
}

module.exports = {
  getCart,
  getCartTotal,
  addProduct,
  updateProductQuantity,
  removeProduct,
  getProduct,
  clearCart
}; 