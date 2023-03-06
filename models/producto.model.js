const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  marca: {
    type: String,
    required: [true, "la Marca es obligatoria"],
  },
  modelo: {
    type: String,
    required: [true, "El Modelo es obligatorio"],
  },
  operador: {
    type: String,
    required: [true, "El operador es obligatorio"],
    default: "SIN_OPERADOR",
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: [true, "la categoria propietorio es obligatorio"],
  },
  descripcion: {
    type: String,
    require: true,
  },
  descripcionHTML: {
    type: String,
  },
  estado: {
    type: String,
    required: [true, "Estado del producto obligatorio"],
    default: "USADO",
    enum: {
      values: ["NUEVO", "USADO", "DESGUACE"],
      message: "{VALUE} no es valido",
    },
  },
  cantidad: {
    type: Number,
    require: true,
  },
  precioCompra: {
    type: Number,
    require: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "El estado es obligatorio"],
  },
});
// esta función permite filtrar el modelo producto, quito de poder devolverlo entero y se guarda el modelo entero en DB
ProductoSchema.methods.toJSON = function () {
  const { __v, status, fechaCreacion, ...producto } = this.toObject(); //pongo lo que no quiero mostrar
  return producto; //filtrada
};

module.exports = model("Producto", ProductoSchema);
