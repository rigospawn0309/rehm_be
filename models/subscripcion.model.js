const { Schema, model } = require("mongoose");

const SubscripcionSchema = Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"]
  },
  operador: {
    type: String,
    required: [true, "El operador es obligatorio"],
    default: "SIN_OPERADOR"
  },
  subscriptores: {
    type: String,
    require: true
  },
  tipo: {
    type: String,
    required: [true, "Tipo de la subscripcion obligatorio"],
    default: "ANUAL",
    enum: {
      values: ["MENSUAL", "ANUAL", "DIARIA"],
      message: "{VALUE} no es valido"
    },
  },
  estado: {
    type: String,
    required: [true, "Estado de la subscripcion obligatorio"],
    default: "ACTIVA",
    enum: {
      values: ["NO_ACTIVA", "ACTIVA"],
      message: "{VALUE} no es valido"
    },
  },
  precio: {
    type: Number,
    require: true
  },
  precioPorPersona: {
    type: Number,
    require: true
  },
  fechaAlta: {
    type: Date,
    require:true
  },
  fechaRenovacion: {
    type: Date,
    require:true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "El estado es obligatorio"]
  },
});
// esta función permite filtrar el modelo subscripcion, quito de poder devolverlo entero y se guarda el modelo entero en DB
SubscripcionSchema.methods.toJSON = function () {
  const { __v, status, fechaCreacion, ...subscripcion } = this.toObject(); //pongo lo que no quiero mostrar
  return subscripcion; //filtrada
};

module.exports = model("Subscripcion", SubscripcionSchema);