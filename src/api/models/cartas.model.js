const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartaSchema = new Schema(
  {
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: false },
    tipo: { type: String, required: false }
  },
  { timestamps: true }
);

const Carta = mongoose.model("cartas", CartaSchema);

module.exports = Carta;