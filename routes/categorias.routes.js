const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');


router.delete('/deleteMe', categoriaController.deleteMe);

router
    .route('/')
    .get(categoriaController.getAllCategorias);


router
    .route('/:id')
    .get(categoriaController.getCategoria)
    .patch(categoriaController.updateCategoria)
    .delete(categoriaController.deleteCategoria);

module.exports = router;