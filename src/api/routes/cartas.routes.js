const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllCartas,
  getCartasByID,
  createCartas,
  deleteCartas,
  patchCarta,
} = require("../controllers/cartas.controller");

router.get("/", getAllCartas);
router.get("/:id", getCartasByID);
router.post("/",[isAuth], upload.single("imagen"), createCartas);
router.delete('/:id',[isAuth], upload.single("imagen"), deleteCartas);
router.patch('/:id',[isAuth], upload.single("imagen"), patchCarta)

module.exports = router;
