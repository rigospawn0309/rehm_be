const Categoria = require("../models/categoria.model");

//Get categoria
exports.getCategorias = async (req, res) => {
  try {
    const { limite = 5, desde = 0 } = req.params;
    const query = { status: true };

    // obtengo en primer caso el total de categoria y el segundo el limite y el desde para filtrar
    // Hay que tener en cuenta que destructuro en array para obtener cada resultado de la promesa con su nombre
    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite)),
    ]);
    res.json(
      categorias
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener categorias");
  }
};

//Get categoria
exports.getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    let categoria = await Categoria.findById(id);

    if (!categoria) {
      res.status(404).json({ msg: "La categoria no existe" });
    }
    categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener categoria");
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
  }
};

//Put categoria
exports.putCategoria = async (req, res) => {
  try {
    console.log('putCategoria() BODY(): ', req.body);
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
  }
};

//Delete
exports.deleteCategoria = async (req, res = response) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json({ categoria });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al Borrar categoria");
  }
};
