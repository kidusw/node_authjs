import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async(filePath)=>{
    try {
        const result= await cloudinary.uploader.upload(filePath);
        return {
            url:result.secure_url,
            publicId:result.public_id,
        }
    } catch (error) {
        console.error('Erro while uploading image to cloudinary',error)
        throw new Error('Erro while uploading image to cloudinary')
    }
}


export default uploadToCloudinary;