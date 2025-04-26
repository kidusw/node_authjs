import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res)=>{
    try {
        const {username,email,password,role} = req.body;
        const existingUser=await User.findOne({$or:[{username},{email}]});

        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'User already exists'
            })
        }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser= new User({
            username,
            email,
            password:hashedPassword,
            role:role || 'user'
        })

        await newUser.save();

        if(newUser)
        {
            res.status(200).json({
                success:true,
                message:'user created successfully'
            })
        }else{
            res.status(400).json({
                success:false,
                message:'unable to create a user'
            })
        }

    } catch (error) {
        console.log('an error has occured');
        res.status(500).json({
            message:'something went wrong',
            success:false
        })
    }
}

export const loginUser = async(req,res)=>{
    try {
        const {username,password}=req.body;
        const existingUser = await User.findOne({username});
        if(!existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'User doesn\'t exist '
            })
        }

       const passwordMatch=await bcrypt.compare(password,existingUser.password);

       if(!passwordMatch)
       {
         return res.status(400).json({
                success:false,
                message:'Invalid credentials'
            })
       }

       const accessToken = jwt.sign({
        userId:existingUser._id,
        username:existingUser.username,
        role:existingUser.role
       },process.env.JWT_SECRET_KEY,{
        expiresIn:'15m'
       })

       res.status(200).json({
        success:true,
        message:'logged in succesfully',
        accessToken
       })

    } catch (error) {
        console.log('an error has occured');
        res.status(500).json({
            message:'something went wrong',
            success:false
        })
    }
}

export const changePassword = async(req,res)=>{
    try {
        const userId = req.userInfo.userId;

        // extract old and new password
        const {oldPassword,newPassword}= req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }

        // check if old passwod is correct
        const isPassowordMatch= await bcrypt.compare(oldPassword,user.password);
        if(!isPassowordMatch)
        {
            res.status(400).json({
                success:false,
                message:'old password doesn\'t match'
            })
        }

        //hash new password
        const salt = await bcrypt.genSalt(10)
        const newHashedPassword=await bcrypt.hash(newPassword,salt)

        //update user password

        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
            success:true,
            message:'password changed succesfully'
        })

    } catch (error) {
        console.log('an error has occured');
        res.status(500).json({
            message:'something went wrong',
            success:false
        })
    }
}