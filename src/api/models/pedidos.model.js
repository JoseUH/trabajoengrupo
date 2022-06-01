const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PedidosSchema = new Schema(
  {
    id_carta: [
      { type: Schema.Types.ObjectId, ref: "cartas", required: true },
    ],
    id_mesa: [
      { type: Schema.Types.ObjectId, ref: "mesas", required: true },
    ],
    precio: { type: Number, required: false },
    hora_creacion: { type: Date, default: Date.now, required: true },
    hora_compra: { type: Date, default: Date.now, required: true }
  },
  { timestamps: true }
);

const Pedidos = mongoose.model("pedidos", PedidosSchema);

module.exports = Pedidos;