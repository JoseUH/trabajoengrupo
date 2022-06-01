const { deleteFile } = require("../../middlewares/deleteFile");
const Mesa = require("../models/mesas.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllMesas = async (req, res, next) => {
  try {
    const allMesas = await Mesa.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Mesas: allMesas,
    });
  } catch (error) {
    return next(error);
  }
};


const getMesaByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const mesaByID = await Mesa.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Mesa: mesaByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createMesas = async (req, res, next) => {
  try {
    const newMesas = new Cuadro(req.body);
    if (req.file) {
      newMesas.imagen = req.file.path;
    }
    const createdMesas = await newMesas.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      mesa: createdMesas,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteMesas = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const mesaBorrado = await Mesa.findByIdAndDelete(id);
  
      return res.status(200).json(Borrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchMesa = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchMesa = new Mesa(req.body);
  
      patchMesa._id = id;

      const mesaData= await Mesa.findById(id)

      patchMesa.autor =[...mesaData.autor, ...patchMesa.autor]

      if (mesaData.imagen) {
        deleteFile(mesaData.imagen);
        }

      if (req.file) {
        patchMesa.imagen = req.file.path;
      }
  
      const MesaDB = await Mesa.findByIdAndUpdate(id, patchMesa);
      
      return res.status(200).json({ nuevo: patchMesa, vieja: MesaDB });
    } catch (error) {
      return next(error);
    }
  };


  const getMesaByZona = async (req, res, next) => {
    const zoneMesa = req.params.zona;
    try {
      const mesaByZona = await Mesa.find({zona: zoneMesa});
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        Mesa: mesaByZona,
      });
    } catch (error) {
      return next(error);
    }
  };

  

module.exports = { getAllMesas, getMesaByID, createMesas,patchMesa,deleteMesas,getMesaByZona};
