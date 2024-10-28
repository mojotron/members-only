import { Router } from "express";
import { getSignup } from "../controllers/authController.js";

const router = Router();

router.get("/sign-up", getSignup);

export default router;
