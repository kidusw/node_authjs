import express from "express"
import authMiddleWare from '../middleware/auth-middleware.js';
import isAdmin from '../middleware/admin-middleware.js';
import uploadMiddleware from "../middleware/upload-middleware.js";
import uploadImage from "../controllers/Image-controller.js"

const router= express.Router();

router.post('/upload',authMiddleWare,isAdmin,uploadMiddleware.single('image'),uploadImage)


export default router;