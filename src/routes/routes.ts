import { Router } from "express";
import { getIndexView } from "../controllers/indexController.js";

const router = Router();

router.get("/", getIndexView);

export default router;
