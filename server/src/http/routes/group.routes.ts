//@ts-nocheck
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createGroup,
  leaveGroup,
  joinGroup,
  getUserGroup,
} from "../controllers/group.js";
const router = Router();
router.post("/create-group", createGroup);
router.get("/get-user-groups", getUserGroup);
router.post("/join-group", joinGroup);
router.post("/leave-group", leaveGroup);

export default router;
