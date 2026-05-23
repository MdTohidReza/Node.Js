import cookieparser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectDB from './config/mongodb.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
const Port = process.env.PORT || 4000;
connectDB();


app.use(express.json());
app.use(cookieparser());
app.use(cors({credentials:true}))

//API Endpoints
app.get('/',(req,res)=> res.send("API is Running"))
app.use('/api/auth',authRoutes)

app.listen(Port,()=> console.log(`Server is running on port : ${Port}`))