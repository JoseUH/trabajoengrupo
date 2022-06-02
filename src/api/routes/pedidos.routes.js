
const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllPedidos,
  getPedidosByID,
  createPedidos,
  deletePedidos,
  patchPedido,
} = require("../controllers/pedidos.controller");

router.get("/", getAllPedidos);
router.get("/:id",  getPedidosByID);
router.post("/"/* ,[isAuth] */, createPedidos);
router.delete('/:id',[isAuth], deletePedidos);
router.patch('/:id',[isAuth]/*, upload.single("foto") */, patchPedido)

module.exports = router;
