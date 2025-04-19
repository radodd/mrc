// @ts-ignore
const express = require("express");
//@ts-ignore
const MaterialsController = require("../controllers/materials");
// @ts-ignore
const router = express.Router();

router.get("/", MaterialsController.getMaterials);
console.log("🔥 getMaterials route hit!");

// router.get("/:id", MaterialsController.getMaterial);
router.get("/slug/:slug", MaterialsController.getMaterialBySlug); // For fetching material by ID
// router.get("/material", MaterialsController.getMaterialByName);

module.exports = router;
