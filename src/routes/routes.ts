import { Router } from "express";
// validators
import signUpValidators from "../validators/signUp.js";
import logInValidators from "../validators/logIn.js";
// validation middlewares
import {
  signUpValidation,
  logInValidation,
} from "../middlewares/validationMiddlewares.js";
// controllers
import {
  indexView,
  signUpView,
  logInView,
} from "../controllers/viewsController.js";
import { signUp, logOut } from "../controllers/authController.js";
// login auth
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
// views
router.get("/", indexView);
router.get("/sign-up", signUpView);
router.get("/log-in", logInView);
// auth
router.post("/sign-up", signUpValidators, signUpValidation, signUp);
router.post("/log-in", logInValidators, logInValidation, authMiddleware);
router.get("/log-out", logOut);

export default router;
