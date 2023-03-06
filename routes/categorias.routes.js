const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller')



//api/categorias
router.get('/', categoriaController.getCategorias);
router.get('/:id', categoriaController.getCategoria);
router.post('/', categoriaController.postCategoria);
router.put('/:id', categoriaController.putCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;