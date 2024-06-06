import express from "express";
import * as ResendController from "../controllers/resend";

const router = express.Router();

router.post("/", ResendController.send);
router.get("");
export default router;
