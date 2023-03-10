const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');


router.delete('/deleteMe', productoController.deleteMe);

router
    .route('/')
    .get(productoController.getAllProductos);


router
    .route('/:id')
    .get(productoController.getProducto)
    .patch(productoController.updateProducto)
    .delete(productoController.deleteProducto);

module.exports = router;