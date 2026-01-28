import { Router } from "express";
import { signin, signUp } from "../controllers/auth.js";
const router = Router();
//signup
router.post("/sign-up", signUp);
router.post("/sign-in", signin);
export default router;
//# sourceMappingURL=auth.routes.js.map