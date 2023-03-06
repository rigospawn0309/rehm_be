const Producto = require("../models/producto.model");

//Get productos
exports.getProductos = async (req, res) => {
  try {
    const { limite = 10, desde = 0 } = req.params;
    const query = { status: true };

    // obtengo en primer caso el total de productos y el segundo el limite y el desde para filtrar
    // Hay que tener en cuenta que destructuro en array para obtener cada resultado de la promesa con su nombre
    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
      .populate('categoria','nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
    ]);
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener productos");
  }
};

//Get producto
exports.getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    let producto = await Producto.findById(id);

    if (!producto) {
      res.status(404).json({ msg: "El producto no existe" });
    }
    producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener producto");
  }
};

//Post producto
exports.postProducto = async (req, res) => {
  try {
    const { status, ...body } = req.body;
    const marca = req.body.marca.toUpperCase();
    const modelo = req.body.modelo.toUpperCase();
    const operador = req.body.operador.toUpperCase();
    const productoDB = await Producto.findOne({ modelo: body.modelo });

    if (productoDB) {
      return res.status(400).json({
        msg: `El producto con modelo ${productoDB.modelo} ya existe`,
      });
    }
    // Generar la data que quiero guardar
    const data = {
      ...body, // se envia primero el rest y luego el brand que esta modificado sino se guardaria lo que viene del body
      marca,
      modelo,
      operador,
    };
    console.log(data);
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear producto");
  }
};

//Put producto
exports.putProducto = async (req, res) => {
  try {
    console.log('putProducto() BODY(): ', req.body);
    const { id } =  req.params; 
    const { status, ...data } = req.body;
    if( data.marca){
        data.marca = data.marca.toUpperCase();
    }
    if( data.modelo){
        data.modelo = data.modelo.toUpperCase();
    }
    if( data.operador){
        data.operador = data.operador.toUpperCase();
    }
    const producto = await Producto.findByIdAndUpdate( id, data, {new: true})
     res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al actualizar producto");
  }
};

//Delete
exports.deleteProducto = async (req, res = response) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const producto = await Producto.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json({ producto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al Borrar producto");
  }
};
