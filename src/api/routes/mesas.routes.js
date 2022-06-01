const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllMesas, getMesaByID, createMesas,patchMesa,deleteMesas,getMesaByZona
} = require("../controllers/mesas.controller");

router.get("/", getAllMesas);
router.get("/id/:id", getMesaByID);
router.get("/zona/:zona", getMesaByZona);
router.post("/",[isAuth], upload.single("imagen"), createMesas);
router.delete('/:id',[isAuth], upload.single("imagen"), deleteMesas);
router.patch('/:id',[isAuth], upload.single("imagen"), patchMesa)

module.exports = router;
