# Documentação dos Testes - API do Carrinho de Compras

## Visão Geral

Este documento descreve todos os testes implementados para a API REST do carrinho de compras, explicando o que cada teste valida e por que é importante.

## Estrutura dos Testes

### 1. **GET /api/cart** - Listar Carrinho
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve retornar carrinho vazio inicialmente`
- **O que valida:** Verifica se o carrinho inicia vazio
- **Expectativas:**
  - Status HTTP 200
  - `success: true`
  - `items: []` (array vazio)
  - `total: 0`
  - `itemCount: 0`
- **Por que é importante:** Garante que o carrinho sempre inicia em um estado limpo

---

### 2. **POST /api/cart/add** - Adicionar Produto
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve adicionar um produto ao carrinho com sucesso`
- **O que valida:** Adição correta de produtos
- **Dados de teste:**
  ```json
  {
    "productId": "1",
    "name": "Produto Teste",
    "price": 29.99,
    "quantity": 2
  }
  ```
- **Expectativas:**
  - Status HTTP 201
  - `success: true`
  - `message: "Produto adicionado ao carrinho com sucesso"`
  - Dados do produto retornados corretamente
- **Por que é importante:** Funcionalidade principal da API

#### Teste: `deve retornar 400 quando campos obrigatórios estão faltando`
- **O que valida:** Validação de campos obrigatórios
- **Dados inválidos:**
  ```json
  {
    "productId": "1",
    "name": "Produto Teste"
    // faltando price e quantity
  }
  ```
- **Expectativas:**
  - Status HTTP 400
  - `success: false`
  - `error: "Campos obrigatórios"`
- **Por que é importante:** Previne dados inválidos no sistema

---

### 3. **PUT /api/cart/:productId/quantity** - Atualizar Quantidade
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve atualizar quantidade do produto com sucesso`
- **O que valida:** Atualização correta de quantidades
- **Dados de teste:** `{ "quantity": 5 }`
- **Expectativas:**
  - Status HTTP 200
  - `success: true`
  - `message: "Quantidade atualizada com sucesso"`
  - `data.quantity: 5`
- **Por que é importante:** Permite ajustar quantidades no carrinho

#### Teste: `deve retornar 400 quando quantidade está faltando`
- **O que valida:** Validação de campo obrigatório
- **Dados inválidos:** `{}`
- **Expectativas:**
  - Status HTTP 400
  - `success: false`
  - `error: "Campo obrigatório"`
- **Por que é importante:** Previne atualizações sem quantidade

#### Teste: `deve retornar 404 quando produto não existe`
- **O que valida:** Tratamento de produto inexistente
- **ProductId:** `999` (inexistente)
- **Expectativas:**
  - Status HTTP 404
  - `success: false`
- **Por que é importante:** Garante comportamento correto para produtos inexistentes

---

### 4. **DELETE /api/cart/:productId** - Remover Produto
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve remover produto do carrinho com sucesso`
- **O que valida:** Remoção correta de produtos
- **Expectativas:**
  - Status HTTP 200
  - `success: true`
  - `message: "Produto removido do carrinho com sucesso"`
- **Por que é importante:** Permite remover itens indesejados

#### Teste: `deve retornar 404 quando produto não existe`
- **O que valida:** Tratamento de produto inexistente na remoção
- **ProductId:** `999` (inexistente)
- **Expectativas:**
  - Status HTTP 404
  - `success: false`
- **Por que é importante:** Garante comportamento correto para produtos inexistentes

---

### 5. **GET /api/cart/:productId** - Buscar Produto Específico
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve retornar detalhes do produto com sucesso`
- **O que valida:** Busca correta de produto específico
- **Expectativas:**
  - Status HTTP 200
  - `success: true`
  - `data.productId: "1"`
  - `data.name: "Produto Teste"`
- **Por que é importante:** Permite consultar detalhes de um produto específico

#### Teste: `deve retornar 404 quando produto não existe`
- **O que valida:** Tratamento de produto inexistente na busca
- **ProductId:** `999` (inexistente)
- **Expectativas:**
  - Status HTTP 404
  - `success: false`
  - `error: "Produto não encontrado"`
- **Por que é importante:** Garante comportamento correto para produtos inexistentes

---

### 6. **DELETE /api/cart/clear** - Limpar Carrinho
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve limpar o carrinho com sucesso`
- **O que valida:** Limpeza completa do carrinho
- **Setup:** Adiciona 2 produtos antes do teste
- **Expectativas:**
  - Status HTTP 200
  - `success: true`
  - `message: "Carrinho limpo com sucesso"`
  - Carrinho vazio após limpeza (`items: []`, `total: 0`)
- **Por que é importante:** Permite resetar o carrinho completamente

---

### 7. **Cálculo do Total** - Validação de Cálculos
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve calcular o total corretamente com múltiplos produtos`
- **O que valida:** Cálculo correto do total do carrinho
- **Setup:**
  - Produto 1: `price: 10.00, quantity: 2` (subtotal: 20.00)
  - Produto 2: `price: 15.50, quantity: 1` (subtotal: 15.50)
- **Expectativas:**
  - `total: 35.50` (20.00 + 15.50)
  - `itemCount: 2`
  - `items.length: 2`
- **Por que é importante:** Garante cálculos corretos para o e-commerce

---

### 8. **Atualização de Quantidade** - Recalculo de Total
**Arquivo:** `tests/cart.test.js`

#### Teste: `deve atualizar quantidade e recalcular o total`
- **O que valida:** Recalculo automático do total após atualização
- **Setup:** Produto com `price: 25.00, quantity: 1`
- **Ação:** Atualiza para `quantity: 3`
- **Expectativas:**
  - `total: 75.00` (25.00 × 3)
  - `items[0].quantity: 3`
- **Por que é importante:** Garante que o total seja sempre atualizado

---

## Cobertura de Testes

### Cenários Positivos ✅
- [x] Adicionar produto com sucesso
- [x] Atualizar quantidade com sucesso
- [x] Remover produto com sucesso
- [x] Buscar produto específico
- [x] Limpar carrinho
- [x] Calcular total corretamente
- [x] Recalcular total após atualização

### Cenários Negativos ✅
- [x] Campos obrigatórios faltando
- [x] Produto inexistente (404)
- [x] Quantidade faltando na atualização
- [x] Carrinho vazio inicial

### Validações de Negócio ✅
- [x] Cálculo correto de totais
- [x] Contagem correta de itens
- [x] Mensagens de erro apropriadas
- [x] Status HTTP corretos

---

## Como Executar os Testes

```bash
# Executar todos os testes
npm test

# Executar com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

---

## Tecnologias Utilizadas

- **Jest:** Framework de testes
- **Supertest:** Biblioteca para testar APIs HTTP
- **Express:** Framework web para a API
- **Node.js:** Runtime JavaScript

---

## Estrutura de Arquivos

```
tests/
├── cart.test.js    # Testes da API do carrinho
└── testes.md       # Esta documentação
```

---

## Manutenção dos Testes

### Adicionando Novos Testes
1. Identifique o cenário a ser testado
2. Adicione o teste no arquivo `cart.test.js`
3. Atualize esta documentação
4. Execute os testes para garantir que passam

### Boas Práticas
- ✅ Testes isolados (cada teste é independente)
- ✅ Limpeza do carrinho antes de cada teste
- ✅ Validação de status HTTP corretos
- ✅ Verificação de mensagens de erro
- ✅ Testes de casos positivos e negativos
- ✅ Documentação clara do que está sendo testado

---

*Última atualização: Janeiro 2024* 