import { Router } from "express";
import {
  getMessages,
  createMessageView,
  createMessage,
  editMessageView,
  editMessage,
} from "../controllers/messagesController.js";
import messageValidator from "../validators/message.js";
import { messageValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.get("/", getMessages);
// create message
router.get("/new", createMessageView);
router.post("/new", messageValidator, messageValidation, createMessage);
// update message
router.get("/:messageUid/edit", editMessageView);
router.post(
  "/:messageUid/edit",
  messageValidator,
  messageValidation,
  editMessage
);

export default router;
