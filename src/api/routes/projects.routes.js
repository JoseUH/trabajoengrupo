const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllProjects,
  getProjectsByID,
  createProjects,
  deleteProjects,
  patchProjects,
} = require("../controllers/projects.controller");

router.get("/", getAllProjects);
router.get("/:id", getProjectsByID);
router.post("/"/* ,[isAuth] */, upload.single("image"), createProjects);
router.delete('/:id',[isAuth], upload.single("image"), deleteProjects);
router.patch('/:id',[isAuth], upload.single("image"), patchProjects)

module.exports = router;
