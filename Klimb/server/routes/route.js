import express from "express";
import { upload } from "../middleware/upload.js";
import { processData } from "../controller/dataController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), processData);

export default router;
