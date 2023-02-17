const express = require('express')
const {
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    getProductDetail,
    createProductReview,
    getProductReviews,
    deleteReview,
    deleteManyProduct
} = require('../controller/productController')
const {isAuthenticatedUser} = require('../middleware/auth')

const {authorizeRoles} = require('../middleware/auth')
const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

router.route('/products').get(getAllProduct)

/**
 * @swagger
 *  tags: [Products]
 *   
 * /api/v1/products:
 *  get:
 *      summary: This api is used to get all products 
 *      tags: [Products]
 *      description: This api is used to get all Products
 *      responses: 
 *        200: 
 *          description: To test get Method,
 *          content: {
 *              "application/json": {
 *                  schema: {
 *                      type: 'object',
 *                      properties: {
 *                          success: {
 *                              type: "boolean",
 *                              example: true
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 * /api/v1/product/{id}:
 *  get:
 *      summary: This api is used to get single product
 *      tags: [Products]
 *      description: This api is used to get single Product
 *      parameters: 
 *        - name: id
 *          in: path
 *          schema: 
 *              type: string
 *              example: 627e142891eba91d707974e6
 *          required: true
 *          description: The product id
 *      responses:
 *       200: 
 *          description: To test get Method,
 *          content: {
 *              "application/json": {
 *                  schema: {
 *                      type: 'object',
 *                      properties: {
 *                          success: {
 *                              type: "boolean",
 *                              example: true
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 * /api/v1/product/new:
 *  post: 
 *      summary: This api is used to create new product
 *      tags: [Products]
 *      description: This api is used to create new Product
 *      parameters: 
 *        - name: images
 *          in: body
 *          schema: 
 *              type: array
 *              example: [https://cf.shopee.vn/file/8b9c7bca30e24f57eee6da1bd89a4c3f]
 *          required: true
 *          description: The product images
 *        - name: name
 *          in: body
 *          schema:
 *              type: string
 *              example: laptop gaming
 *          required: true
 *          description: The name product
 *      responses:
 *       200: 
 *          description: To test get Method,
 *          content: {
 *              "application/json": {
 *                  schema: {
 *                      type: 'object',
 *                      properties: {
 *                          success: {
 *                              type: "boolean",
 *                              example: true
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *                      
 *                      
 *      
 */
router.route('/product/:id').get(getProductDetail)
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"), createProduct)
router
    .route('/admin/product/:id')
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.route('/admin/muitiple/product').post(isAuthenticatedUser,authorizeRoles("admin"),deleteManyProduct)

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser,getProductReviews).delete(isAuthenticatedUser, deleteReview)



module.exports = router