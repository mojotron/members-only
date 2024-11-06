import { Router } from "express";
import {
  getMessages,
  createMessageView,
  createMessage,
} from "../controllers/messagesController.js";
import messageValidator from "../validators/message.js";
import { messageValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.get("/", getMessages);
router.get("/new", createMessageView);
router.post("/new", messageValidator, messageValidation, createMessage);

export default router;
