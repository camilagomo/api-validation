/**
 * Modelo de dados do carrinho de compras
 * Armazenamento em memória para estudos de teste de software
 */

// Carrinho em memória
let cart = [];

/**
 * Adiciona um produto ao carrinho
 * @param {Object} product - Produto a ser adicionado
 * @returns {Object} - Produto adicionado
 */
const addProduct = (product) => {
  const { productId, name, price, quantity } = product;
  
  // Validações básicas
  if (!productId || !name || !price || !quantity) {
    throw new Error('Todos os campos são obrigatórios: productId, name, price, quantity');
  }
  
  if (price <= 0 || quantity <= 0) {
    throw new Error('Preço e quantidade devem ser maiores que zero');
  }
  
  // Verifica se o produto já existe no carrinho
  const existingProductIndex = cart.findIndex(item => item.productId === productId);
  
  if (existingProductIndex !== -1) {
    // Atualiza a quantidade se o produto já existe
    cart[existingProductIndex].quantity += quantity;
    return cart[existingProductIndex];
  } else {
    // Adiciona novo produto
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

/**
 * Remove um produto do carrinho
 * @param {string} productId - ID do produto a ser removido
 * @returns {boolean} - true se removido com sucesso
 */
const removeProduct = (productId) => {
  const initialLength = cart.length;
  cart = cart.filter(item => item.productId !== productId);
  
  if (cart.length === initialLength) {
    throw new Error('Produto não encontrado no carrinho');
  }
  
  return true;
};

/**
 * Atualiza a quantidade de um produto no carrinho
 * @param {string} productId - ID do produto
 * @param {number} quantity - Nova quantidade
 * @returns {Object} - Produto atualizado
 */
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

/**
 * Lista todos os produtos do carrinho
 * @returns {Array} - Array de produtos no carrinho
 */
const getCart = () => {
  return [...cart];
};

/**
 * Calcula o total do carrinho
 * @returns {number} - Valor total do carrinho
 */
const getCartTotal = () => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Limpa o carrinho
 * @returns {boolean} - true se limpo com sucesso
 */
const clearCart = () => {
  cart = [];
  return true;
};

/**
 * Obtém um produto específico do carrinho
 * @param {string} productId - ID do produto
 * @returns {Object|null} - Produto encontrado ou null
 */
const getProduct = (productId) => {
  return cart.find(item => item.productId === productId) || null;
};

/**
 * Força o reset do carrinho (usado em testes)
 */
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
  _forceReset // exporta para uso em testes
}; 