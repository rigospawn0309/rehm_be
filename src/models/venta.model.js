const { Schema, model } = require("mongoose");

const VentaSchema = Schema({
  producto: {
        type: Schema.Types.ObjectId,
        ref: "Producto",
        required: [true, "la producto propietorio es obligatorio"]
  },
  plataforma: {
    type: String,
    required: [true, "La plataforma es obligatorio"],
    default: "DIRECTA"
  },
  plataformaFee: {
    type: Number,
    require: true,
    default: 0
  },
  metodoPago: {
    type: String,
    require: true
  },
  metodoPagoFee: {
    type: String,
    require: true,
    default: 0
  },
  precioVenta: {
    type: Number,
    require: true
  },
  precioEnvio: {
    type: Number,
    require: true
  },
  fechaVenta: {
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
// esta función permite filtrar el modelo Venta, quito de poder devolverlo entero y se guarda el modelo entero en DB
VentaSchema.methods.toJSON = function () {
  const { __v, status, fechaCreacion, ...venta } = this.toObject(); //pongo lo que no quiero mostrar
  return venta; //filtrada
};

module.exports = model("Venta", VentaSchema);