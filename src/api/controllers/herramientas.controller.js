const { deleteFile } = require("../../middlewares/deleteFile");
const Herramienta = require("../models/herramientas.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllHerramientas = async (req, res, next) => {
  try {
    const allHerramientas = await Herramienta.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Herramientas: allHerramientas,
    });
  } catch (error) {
    return next(error);
  }
};


const getHerramientaByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const herramientaByID = await Herramienta.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Herramienta: herramientaByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createHerramientas = async (req, res, next) => {
  try {
    const newHerramientas = new Herramienta(req.body);
    if (req.file) {
      newHerramientas.ico = req.file.path;
    }
    const createdHerramientas = await newHerramientas.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      herramienta: createdHerramientas,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteHerramientas = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const herramientaBorrado = await Herramienta.findByIdAndDelete(id);
  
      return res.status(200).json(Borrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchHerramienta = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchHerramienta = new Herramienta(req.body);
  
      patchHerramienta._id = id;

      const herramientaData= await Herramienta.findById(id)

      patchHerramienta.autor =[...herramientaData.autor, ...patchHerramienta.autor]

      if (herramientaData.ico) {
        deleteFile(herramientaData.ico);
        }

      if (req.file) {
        patchHerramienta.ico = req.file.path;
      }
  
      const HerramientaDB = await Herramienta.findByIdAndUpdate(id, patchHerramienta);
      
      return res.status(200).json({ nuevo: patchHerramienta, vieja: HerramientaDB });
    } catch (error) {
      return next(error);
    }
  };


  const getHerramientaByZona = async (req, res, next) => {
    const zoneHerramienta = req.params.zona;
    try {
      const herramientaByZona = await Herramienta.find({zona: zoneHerramienta});
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        Herramienta: herramientaByZona,
      });
    } catch (error) {
      return next(error);
    }
  };

  

module.exports = { getAllHerramientas, getHerramientaByID, createHerramientas,patchHerramienta,deleteHerramientas,getHerramientaByZona};
