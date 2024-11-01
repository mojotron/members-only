import { Router } from "express";
// validators
import signUpValidators from "../validators/signUp.js";
// validation middlewares
import { signUpValidation } from "../middlewares/validationMiddlewares.js";
// controllers
import { indexView, signUpView, logInView } from "../controllers/viewsController.js";
import { signUp } from "../controllers/authController.js";

const router = Router();
// views
router.get("/", indexView);
router.get("/sign-up", signUpView);
router.get("/log-in", logInView)
// auth
router.post("/sign-up", signUpValidators, signUpValidation, signUp);

export default router;
