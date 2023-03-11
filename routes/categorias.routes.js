const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

router
    .route('/')
    .get(categoriaController.getCategorias)
    .post(categoriaController.postCategoria);


router
    .route('/:id')
    .get(categoriaController.getCategoria)
    .patch(categoriaController.putCategoria)
    .delete(categoriaController.deleteCategoria);

module.exports = router;