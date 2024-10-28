import { Router } from "express";
import { getIndexView } from "../controllers/indexController.js";
// routes
import authRoutes from "./authRoutes.js";

const router = Router();

router.get("/", getIndexView);
router.use("/auth", authRoutes);

export default router;
