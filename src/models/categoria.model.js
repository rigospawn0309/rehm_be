const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatoria"],
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "El estado es obligatorio"],
  }
});
// esta función permite filtrar el modelo categoria, quito de poder devolverlo entero y se guarda el modelo entero en DB
CategoriaSchema.methods.toJSON = function () {
  const { __v, status, ...categoria } = this.toObject(); //pongo lo que no quiero mostrar
  return categoria; //filtrada
};

module.exports = model("Categoria", CategoriaSchema);