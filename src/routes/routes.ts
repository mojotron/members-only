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
import { signUp } from "../controllers/authController.js";
import passport from "passport";

const router = Router();
// views
router.get("/", indexView);
router.get("/sign-up", signUpView);
router.get("/log-in", logInView);
// auth
router.post("/sign-up", signUpValidators, signUpValidation, signUp);
router.post(
  "/log-in",
  logInValidators,
  logInValidation,
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/log-in",
  })
);

export default router;
