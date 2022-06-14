const { deleteFile } = require("../../middlewares/deleteFile");
const Projects = require("../models/Projects.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllProjects = async (req, res, next) => {
  try {
    const allProjects = await Projects.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Projects: allProjects,
    });
  } catch (error) {
    return next(error);
  }
};


const getProjectsByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ProjectsByID = await Projects.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Projects: ProjectsByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createProjects = async (req, res, next) => {
  try {
    const newProjects = new Projects(req.body);
    if (req.file) {
      newProjects.image.link = req.file.path;
    }
    const createdProjects = await newProjects.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      Projects: createdProjects,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProjects = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const ProjectsBorrado = await Projects.findByIdAndDelete(id);
  
      return res.status(200).json(ProjectsBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchProjects = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchProjects = new Projects(req.body);
  
      patchProjects._id = id;

      const ProjectsData= await Projects.findById(id)

      // patchProjects.autor =[...cuadroData.autor, ...patchCuadro.autor]

      if (ProjectsData.image.link) {
        deleteFile(ProjectsData.image.link);
        }

      if (req.file) {
        patchProjects.image.link = req.file.path;
      }
  
      const ProjectsDB = await Projects.findByIdAndUpdate(id, patchProjects);
      
      return res.status(200).json({ nuevo: patchProjects, vieja: ProjectsDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { getAllProjects, getProjectsByID, createProjects,patchProjects,deleteProjects};
