import express from "express"
import authMiddleWare from "../middleware/auth-middleware.js";
const router= express.Router();

router.get('/welcome',authMiddleWare,(req,res)=>{
    const {userId,username,role}=req.userInfo;
    res.json({
        message:'welcome to homepage',
        user:{
            id: userId,
            name: username,
            role: role
        }
    })
})

export default router;