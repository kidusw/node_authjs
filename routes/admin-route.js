import express from 'express'
import authMiddleWare from '../middleware/auth-middleware.js';
import isAdmin from '../middleware/admin-middleware.js';
const router = express.Router();

router.get('/welcome',authMiddleWare,isAdmin,(req,res)=>{
   res.json({
        message:'welcome to the adming page'
   }) 
})

export default router;