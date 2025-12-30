//@ts-nocheck
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addUserContact, listUserContact } from "../controllers/contact.js";
const router = Router();
router.get("/list-user-contacts", listUserContact);
router.post("/add-contact", addUserContact);
export default router;
