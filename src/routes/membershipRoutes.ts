import { Router } from "express";
import {
  membershipView,
  membershipCheck,
} from "../controllers/membershipController.js";
import membershipValidator from "../validators/membership.js";
import { membershipValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.get("/", membershipView);
router.post("/", membershipValidator, membershipValidation, membershipCheck);

export default router;
