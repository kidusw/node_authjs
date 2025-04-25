import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
          await mongoose.connect(process.env.MONGO_URI)
          console.log('database connected')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
 
}
export default connectDb;