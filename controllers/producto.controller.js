const Producto = require('../models/producto.model');
const base = require('./baseController');

exports.deleteMe = async (req, res, next) => {
    try {
        await Producto.findByIdAndUpdate(req.producto.id, {
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

exports.getAllProductos = base.getAll(Producto);
exports.getProducto = base.getOne(Producto);
exports.updateProducto = base.updateOne(Producto);
exports.deleteProducto = base.deleteOne(Producto);