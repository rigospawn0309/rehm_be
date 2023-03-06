const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller')

//api/productos
router.get('/', productoController.getProductos);
router.get('/:id', productoController.getProducto);
router.post('/', productoController.postProducto);
router.put('/:id', productoController.putProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;