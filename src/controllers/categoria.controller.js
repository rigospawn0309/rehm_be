const Categoria = require("../models/categoria.model");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

//Get Categorias
exports.getCategorias = async (req, res, next) => {
  try {
    const populateCategoria = Categoria.find(req.query)
    .where('status').equals(true);

    const features = new APIFeatures(populateCategoria, req.query)
      .sort()
      .paginate();

    const categoria = await features.query;
    res.status(200).json({
      status: "success",
      results: categoria.length,
      categoria //devuelve un array de objetos Categoria
    })
  } catch (error) {
    next(error);
  } finally {
    console.log("Get Categorias");
  }
};

//Get Categoria
exports.getCategoria = async (req, res, next) => {
  try {
      const categoria = await Categoria.findById(req.params.id)
      .where('status').equals(true);

      if (!categoria) {
          return next(new AppError(404, 'fail', 'No hay categoria para este id'), req, res, next);
      }

      res.status(200).json({
          status: 'success',
          categoria
      });
  } catch (error) {
      next(error);
  } finally {
    console.log("Get Categoria");
  }
};

//Post categoria
exports.postCategoria = async (req, res) => {
  try {
    const { status, ...body } = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre: body.nombre });

    if (categoriaDB) {
      return res.status(400).json({
        msg: `El categoria con nombre ${categoriaDB.nombre} ya existe`,
      });
    }
    // Generar la data que quiero guardar
    const data = {
      ...body, // se envia primero el rest y luego el brand que esta modificado sino se guardaria lo que viene del body
      nombre
    };
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear categoria");
  } finally {
    console.log("Post Categorias");
  }
};

//Put categoria
exports.putCategoria = async (req, res) => {
  try {
    const { id } =  req.params; 
    const { status, ...data } = req.body;
    if( data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true})
     res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al actualizar categoria");
  }finally {
    console.log("Put Categorias");
  }
};

//Delete Logico Categoria
exports.deleteCategoria = async (req, res = response, next) => {
  try {  
  const categoria = await Categoria.findByIdAndUpdate( req.params.id , {status: false},{new: true});
    if (!categoria) {
      return next(new AppError(404, 'fail', 'No existe Categoria con el id seleccionado'), req, res, next);
  }
    res.json({Eliminado:categoria});
  } catch (error) {
    next(error);
  }finally {
    console.log("Eliminación logíca Categorias");
  }
};

//Delete fisico Categoria
exports.deleteFisicoCategoria = async (req, res, next) => {
  try {
      const categoria = await Categoria.findByIdAndDelete(req.params.id);

      if (!categoria) {
          return next(new AppError(404, 'fail', 'No existe categoria con el id seleccionado'), req, res, next);
      }
      res.json({Eliminado:categoria});
  } catch (error) {
      next(error);
  }finally {
    console.log("Eliminación fisica Categorias");
  }
};