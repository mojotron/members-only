import { Router } from "express";
import {
  getMessages,
  createMessageView,
  createMessage,
} from "../controllers/messagesController.js";

const router = Router();

router.get("/", getMessages);
router.get("/new", createMessageView);

export default router;
