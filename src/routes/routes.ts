import { Router } from "express";
import { indexView, signUpView } from "../controllers/viewsController.js";

const router = Router();
// views
router.get("/", indexView);
router.get("/sign-up", signUpView);
// auth

export default router;
