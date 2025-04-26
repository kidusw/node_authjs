import dotnenv from "dotenv";
import express from "express"
import connectDb from "./database/db.js";
import authRoutes from "./routes/auth-route.js";
import homeRoutes from "./routes/home-route.js"
import adminRoutes from "./routes/admin-route.js"
import imageRoute from "./routes/Image-route.js"


const app = express()

dotnenv.config();

app.use(express.json())

connectDb()

const port = process.env.PORT || 3000;

app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/image',imageRoute)



app.listen(port,()=>{
    console.log('server running on port 3000')
})

