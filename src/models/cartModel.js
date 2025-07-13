// Modelo do carrinho de compras
class CartModel {
  constructor() {
    this.items = [];
  }

  // Adicionar produto ao carrinho
  addItem(product) {
    const existingItem = this.items.find(item => item.productId === product.productId);

    if (existingItem) {
      // Sobrescreve os dados do produto, não soma a quantidade
      existingItem.name = product.name;
      existingItem.price = product.price;
      existingItem.quantity = product.quantity;
    } else {
      this.items.push({ ...product });
    }

    return product;
  }

  // Obter todos os itens do carrinho
  getItems() {
    return this.items;
  }

  // Obter item específico por productId
  getItem(productId) {
    return this.items.find(item => item.productId === productId);
  }

  // Atualizar quantidade de um produto
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return null;
  }

  // Remover produto do carrinho
  removeItem(productId) {
    const index = this.items.findIndex(item => item.productId === productId);
    if (index !== -1) {
      return this.items.splice(index, 1)[0];
    }
    return null;
  }

  // Limpar carrinho
  clear() {
    this.items = [];
    return true;
  }

  // Calcular total do carrinho
  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Obter quantidade total de itens
  getItemCount() {
    return this.items.length;
  }
}

module.exports = new CartModel();
