const { deleteFile } = require("../../middlewares/deleteFile");
const Carta = require("../models/cartas.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllCartas = async (req, res, next) => {
  try {
    const allCartas = await Carta.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Cartas: allCartas,
    });
  } catch (error) {
    return next(error);
  }
};


const getCartasByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cartasByID = await Carta.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Cartas: cartasByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createCartas = async (req, res, next) => {
  try {
    const newCartas = new Carta(req.body);
    if (req.file) {
      newCartas.imagen = req.file.path;
    }
    const createdCartas = await newCartas.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      Cartas: createdCartas,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCartas = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const cartaBorrado = await Carta.findByIdAndDelete(id);
  
      return res.status(200).json(cartaBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchCarta = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchCarta = new Carta(req.body);
  
      patchCarta._id = id;

      const cartaData= await Carta.findById(id)

      // patchCarta.autor =[...cuadroData.autor, ...patchCuadro.autor]

      if (cartaData.imagen) {
        deleteFile(cartaData.imagen);
        }

      if (req.file) {
        patchCarta.imagen = req.file.path;
      }
  
      const CartaDB = await Carta.findByIdAndUpdate(id, patchCarta);
      
      return res.status(200).json({ nuevo: patchCarta, vieja: CartaDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { getAllCartas, getCartasByID, createCartas,patchCarta,deleteCartas};
