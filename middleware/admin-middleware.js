const isAdmin= (req,res,next)=>{
    if(req.userInfo.role !== 'admin')
    {
        return res.status(403).json({
            succes:false,
            message:'Access Denied Admin rights required'
        })
    }
    next();
}

export default isAdmin;