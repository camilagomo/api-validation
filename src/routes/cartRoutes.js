/**
 * Rotas do carrinho de compras
 * Define os endpoints da API com documentação Swagger
 */

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productId
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: ID único do produto
 *         name:
 *           type: string
 *           description: Nome do produto
 *         price:
 *           type: number
 *           description: Preço do produto
 *         quantity:
 *           type: integer
 *           description: Quantidade do produto
 *     CartResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             total:
 *               type: number
 *             itemCount:
 *               type: integer
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Lista todos os produtos do carrinho
 *     description: Retorna todos os produtos no carrinho com o total e contagem
 *     tags: [Carrinho]
 *     responses:
 *       200:
 *         description: Lista de produtos do carrinho
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', cartController.getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Adiciona um produto ao carrinho
 *     description: Adiciona um novo produto ao carrinho ou atualiza a quantidade se já existir
 *     tags: [Carrinho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', cartController.addProduct);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Limpa o carrinho
 *     description: Remove todos os produtos do carrinho
 *     tags: [Carrinho]
 *     responses:
 *       200:
 *         description: Carrinho limpo com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/clear', cartController.clearCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   get:
 *     summary: Obtém um produto específico do carrinho
 *     description: Retorna os detalhes de um produto específico no carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:productId', cartController.getProduct);

/**
 * @swagger
 * /api/cart/{productId}:
 *   put:
 *     summary: Atualiza a quantidade de um produto no carrinho
 *     description: Altera a quantidade de um produto específico no carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Nova quantidade do produto
 *     responses:
 *       200:
 *         description: Quantidade atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:productId', cartController.updateProductQuantity);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove um produto do carrinho
 *     description: Remove um produto específico do carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:productId', cartController.removeProduct);

module.exports = router; 