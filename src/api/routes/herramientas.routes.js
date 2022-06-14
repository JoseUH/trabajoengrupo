const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllHerramientas, getHerramientaByID, createHerramientas,patchHerramienta,deleteHerramientas,getHerramientaByZona
} = require("../controllers/herramientas.controller");

router.get("/", getAllHerramientas);
router.get("/id/:id", getHerramientaByID);
router.get("/zona/:zona", getHerramientaByZona);
router.post("/"/* ,[isAuth] */, upload.single("ico"), createHerramientas);
router.delete('/:id',[isAuth], upload.single("ico"), deleteHerramientas);
router.patch('/:id',[isAuth], upload.single("ico"), patchHerramienta)

module.exports = router;
