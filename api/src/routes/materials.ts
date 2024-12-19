// @ts-ignore
const express = require("express");
//@ts-ignore
const MaterialsController = require("../controllers/materials");
// @ts-ignore
const router = express.Router();

router.get("/", MaterialsController.getMaterials);
// router.get("/:id", MaterialsController.getMaterial);
router.get("/:id", MaterialsController.getMaterialById); // For fetching material by ID
router.get("/material", MaterialsController.getMaterialByName);

module.exports = router;
