import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async(filepath)=>{
    try {
        const result= await cloudinary.uploader.upload(filepath);
        return {
            url:result.secure_url,
            publicId:result.public_id,
        }
    } catch (error) {
        console.error('Erro while uploading image to cloudinary',error)
        throw new Error('Erro while uploading image to cloudinar')
    }
}


export default uploadToCloudinary;