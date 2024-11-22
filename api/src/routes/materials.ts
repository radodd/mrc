// @ts-ignore
const express = require("express");
//@ts-ignore
const MaterialsController = require("../controllers/materials");
// @ts-ignore
const router = express.Router();

router.get("/", MaterialsController.getMaterials);
router.get("/:id", MaterialsController.getMaterial);
// router.post("/", ProductsController.createProduct);

module.exports = router;
