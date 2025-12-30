//@ts-nocheck

import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getMessages } from "../controllers/message.js";
const router = Router();
router.get("/get-messages/:groupId", getMessages);
export default router ;