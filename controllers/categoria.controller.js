const Categoria = require('../models/categoria.model');;
const base = require('./baseController');

exports.deleteMe = async (req, res, next) => {
    try {
        await Categoria.findByIdAndUpdate(req.categoria.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

exports.getAllCategorias = base.getAll(Categoria);
exports.getCategoria = base.getOne(Categoria);
exports.updateCategoria = base.updateOne(Categoria);
exports.deleteCategoria = base.deleteOne(Categoria);