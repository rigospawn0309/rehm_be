const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

router
    .route('/')
    .get(productoController.getProductos)
    .post(productoController.postProducto);


router
    .route('/:id')
    .get(productoController.getProducto)
    .put(productoController.putProducto)
    .delete(productoController.deleteProducto);

module.exports = router;