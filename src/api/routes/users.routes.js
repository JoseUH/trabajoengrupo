const express = require("express");

const router = express.Router();

const { login, register, logout, getAllUsers, getUsersByID, deleteUsers, patchUser } = require("../controllers/users.controller.js");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", getAllUsers);
router.get("/:id", getUsersByID);
router.delete("/:id", deleteUsers);
router.patch("/:id", patchUser);


module.exports = router;