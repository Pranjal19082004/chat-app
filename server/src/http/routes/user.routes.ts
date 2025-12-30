import { Router } from "express";
import { userInfo } from "../controllers/user.js";
const router = Router();
//@ts-ignore
router.get("/:id", userInfo);
export default router;
