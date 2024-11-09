import { Router } from "express";
import {
  getMessages,
  getMessage,
  createMessageView,
  createMessage,
  editMessageView,
  editMessage,
  deleteMessageView,
  deleteMessage,
} from "../controllers/messagesController.js";
import messageValidator from "../validators/message.js";
import { messageValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.get("/", getMessages);
// create message
router.get("/new", createMessageView);
router.post("/new", messageValidator, messageValidation, createMessage);
// read  messages
router.get("/:messageUid", getMessage);
// update message
router.get("/:messageUid/edit", editMessageView);
router.post(
  "/:messageUid/edit",
  messageValidator,
  messageValidation,
  editMessage
);
// delete message
router.get("/:messageUid/delete", deleteMessageView);
router.post("/:messageUid/delete", deleteMessage);

export default router;
