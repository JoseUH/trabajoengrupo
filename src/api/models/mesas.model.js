const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MesaSchema = new Schema(
  {
    name: { type: String, required: true },
    zona: { type: String, required: true },
    comensales: { type: Number, required: true}
  },
  { timestamps: true }
);

const Mesa = mongoose.model("mesas", MesaSchema);

module.exports = Mesa;