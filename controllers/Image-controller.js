import Image from "../models/Image.js"
import uploadToCloudinary from "../helpers/cloudinary-helper.js"

const uploadImage = async(req,res)=>{
    try {
        if(!req.file)
        {
            return res,status(400).json({
                success:false,
                message:'File is required please upload an image'
            })
        }

        const {url, publicId}=await uploadToCloudinary(req.file.path);
        const newUploadImage=new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        })

        await newUploadImage.save();

        res.status(201).json({
            success:true,
            message:'Image uploadeed successfully',
            newImage:newUploadImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}

export default uploadImage