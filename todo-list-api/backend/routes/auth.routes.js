import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  getMe,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

router.use(protect);
router.get("/me", getMe);

export default router;
