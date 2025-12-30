//@ts-nocheck
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createGroup, leaveGroup, joinGroup } from "../controllers/group.js";
const router = Router();
router.post("/create-group", createGroup);
router.post("/join-group", joinGroup);
router.post("/leave-group", leaveGroup);

export default router