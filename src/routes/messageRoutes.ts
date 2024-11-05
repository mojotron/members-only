import { Router } from "express";
import { getMessages } from "../controllers/messagesController.js";

const router = Router();
router.get("/", getMessages);

export default router;
