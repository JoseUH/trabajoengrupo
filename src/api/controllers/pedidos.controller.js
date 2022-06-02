const { deleteFile } = require("../../middlewares/deleteFile");
const Pedido = require("../models/pedidos.model");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllPedidos = async (req, res, next) => {
  try {
    
    const allPedidos = await Pedido.find().populate("id_carta").populate("id_mesa");
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      pedidos: allPedidos,
    });
  } catch (error) {
    return next(error);
  }
};

const getPedidosByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pedidosByID = await Pedido.findById(id).populate("id_carta").populate("id_mesa");
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      pintor: pedidosByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createPedidos = async (req, res, next) => {
  try {
    const newPedidos = new Pedido(req.body);
    console.log(req.body);
    if (req.file) {
      newPedidos.foto = req.file.path;
    }
    const createdPedidos = await newPedidos.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      console: createdPedidos,
    });
  } catch (error) {
    return next(error);
  }
};

const deletePedidos = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const pintorBorrado = await Pedido.findByIdAndDelete(id);
  
      return res.status(200).json(pintorBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchPedido = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchPedido = new Pedido(req.body);
  
      patchPedido._id = id;

      
      const pedidosData= await Pedido.findById(id);

      patchPedido.id_carta =[...pedidosData.id_carta, ...patchPedido.id_carta];
      patchPedido.id_mesa =[...pedidosData.id_mesa, ...patchPedido.id_mesa];

     /*  if (pedidosData.foto) {
        
        deleteFile(pedidosData.foto);
        }

      if (req.file) {
        patchPedido.foto = req.file.path;
      }
   */
      const PedidoDB = await Pedido.findByIdAndUpdate(id, patchPedido);
      
      return res.status(200).json({ nuevo: patchPedido, vieja: PedidoDB });
    } catch (error) {

      return next(error);
    }
  }; 
  
module.exports = { getAllPedidos, getPedidosByID, createPedidos, patchPedido, deletePedidos };
