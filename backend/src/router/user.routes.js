// ✅ user.routes.js
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(verifyJWT, getCurrentUser); // ✅ added route

export default router;
