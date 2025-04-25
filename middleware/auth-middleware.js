import jwt from "jsonwebtoken";

const authMiddleWare = (req,res,next)=>
{
    const authHeader = req.headers['authorization'];
  

    const token = authHeader && authHeader.split(' ')[1]
    if(!token)
    {
        res.status(401).json({
            success:false,
            message:'Access denied'
        })
    }

    //decode token

    try {
        const decodedToken= jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
        req.userInfo = decodedToken;
        next();
        
    } catch (error) {
         res.status(500).json({
            success:false,
            message:'Access denied'
        })
    }


}

export default authMiddleWare;