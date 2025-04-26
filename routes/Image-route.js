import express from "express"
import authMiddleWare from '../middleware/auth-middleware.js';
import isAdmin from '../middleware/admin-middleware.js';
import uploadMiddleware from "../middleware/upload-middleware.js";
import {deleteImage, fetchImages, uploadImageController} from "../controllers/Image-controller.js"

const router= express.Router();

router.post('/upload',authMiddleWare,isAdmin,uploadMiddleware.single('image'),uploadImageController)
router.get('/get',authMiddleWare,fetchImages)
router.delete('/:id',authMiddleWare,isAdmin,deleteImage)

export default router;
