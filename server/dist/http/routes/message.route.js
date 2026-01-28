//@ts-nocheck
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllMessageAfter, getMessageAfter, getMessages, } from "../controllers/message.js";
const router = Router();
router.get("/get-messages/:groupId", getMessages);
router.get("/get-messages-after", getMessageAfter);
router.get("/get-all-messages-after", getAllMessageAfter);
export default router;
//# sourceMappingURL=message.route.js.map