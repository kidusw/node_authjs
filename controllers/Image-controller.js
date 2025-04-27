import Image from "../models/Image.js"
import uploadToCloudinary from "../helpers/cloudinary-helper.js"
import fs from "fs"
import cloudinary from "../config/cloudinary.js"

export const uploadImageController = async(req,res)=>{
    try {
        if(!req.file)
        {
            return res.status(400).json({
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

        //delete the file from local stroage
        // fs.unlinkSync(req.file.path);

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

export const fetchImages = async(req,res)=>{
    try {
        const page = parseInt(req.query.page)||1
        const limit = parseInt(req.query.limit)||5
        const skip = (page - 1)*limit
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit)
        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        if(images)
        {
            res.status(200).json({
                success:true,
                currentPage:page,
                totalPages:totalPages,
                totalImage:totalImages,
                data:images
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })   
    }
}

export const deleteImage = async(req,res)=>{
    try {
        const getCurrentImageId = req.params.id;
        const userId = req.userInfo.userId;

        const image =  await Image.findById(getCurrentImageId);

        if(!image){
            return res.status(404).json({
                success:false,
                messgae:'Image not found'
            })
        }
        // check if the image is uploaded by the current user

        if(image.uploadedBy.toString()!==userId){
            return res.status(403).json({
                success:false,
                message:'You are not authorized to delete the image'
            })
        }

        //delete this from cloudinary storage
        await cloudinary.uploader.destroy(image.publicId);
        //delete this image from mondodb
        await Image.findByIdAndDelete(getCurrentImageId);

        res.status(200).json({
            success:true,
            message:'Image deleted successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })    
    }
}