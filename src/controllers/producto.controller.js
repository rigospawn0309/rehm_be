const Producto = require("../models/producto.model");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

//Get productos
exports.getProductos = async (req, res, next) => {
  try {
    const populateProducto = Producto.find(req.query)
    .populate(
      "categoria",
      "nombre"
    )
    .where('status').equals(true);

    const features = new APIFeatures(populateProducto, req.query)
      .sort()
      .paginate();

    const producto = await features.query;
    res.status(200).json({
      status: "success",
      results: producto.length,
        productos: producto, //devuelve un array de objetos producto
    });
  } catch (error) {
    next(error);
  }
};

//Get producto
exports.getProducto = async (req, res, next) => {
  try {
      const producto = await Producto.findById(req.params.id)
      .populate(
          "categoria",
          "nombre"
      )
      .where('status').equals(true);

      if (!producto) {
          return next(new AppError(404, 'fail', 'No hay producto para este id'), req, res, next);
      }

      res.status(200).json({
          status: 'success',
          producto
      });
  } catch (error) {
      next(error);
  }
};

//Post producto
exports.postProducto = async (req, res, next) => {
  const { status, user, ...body} = req.body;
  const marca = req.body.marca.toUpperCase();
  const modelo = req.body.modelo.toUpperCase();
  const operador = req.body.operador.toUpperCase();
  try {
    const productoDB = await Producto.findOne({ modelo:body.modelo });
    if( productoDB ) {
      return res.status(400).json({
          msg: `El producto con modelo ${productoDB.modelo} ya existe`
      })
    }
    const data = {
      ...body, // se envia primero el rest y luego el bran que esta modificado sino se guardaria lo que viene del body
      marca,
      modelo,
      operador
  }
    const producto = await Producto.create(data);

    res.status(201).json({
        status: 'success',
        producto
    });

  } catch (error) {
      next(error);
  }
}

//Put producto
exports.putProducto = async (req, res,next) => {
  try {
    console.log("putProducto() BODY(): ", req.body);
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.marca) {
      data.marca = data.marca.toUpperCase();
    }
    if (data.modelo) {
      data.modelo = data.modelo.toUpperCase();
    }
    if (data.operador) {
      data.operador = data.operador.toUpperCase();
    }
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!producto) {
      return next(new AppError(404, 'fail', 'No hay producto para este id'), req, res, next);
    }
    res.status(200).json({
      status: 'success',
      producto
      });
    } catch (error) {
      next(error);
    }
};

//Delete Logico producto
exports.deleteProducto = async (req, res = response, next) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id, { status: false });

    if (!producto || producto.status === false) {
        return next(new AppError(404, 'fail', 'No existe producto con el id seleccionado'), req, res, next);
    }

    res.status(204).json({
        status: 'success',
        data: producto
    });
    } catch (error) {
        next(error);
    }
    };

//delete fisico producto
exports.deleteFisicoProducto = Model => async (req, res, next) => {
  try {
      const producto = await Model.findByIdAndDelete(req.params.id);

      if (!producto) {
          return next(new AppError(404, 'fail', 'No existe producto con el id seleccionado'), req, res, next);
      }

      res.status(204).json({
          status: 'success',
          data: null
      });
  } catch (error) {
      next(error);
  }
};