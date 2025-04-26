import express from "express"
import { registerUser,loginUser, changePassword } from "../controllers/auth-controller.js"
import authMiddleWare from "../middleware/auth-middleware.js";


const router= express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/change-password",authMiddleWare,changePassword)

export default router;