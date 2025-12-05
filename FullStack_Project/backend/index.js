import express from 'express';
import cors from 'cors';

const app = express();
const PORT=8000;

app.use(express.json());
app.use(cors(
   {
    origin:[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    //add production URL
    ],
    credentials:true,//while accepting cookie or authaccepting
    // methods:["GET","POST"]// while accepting any particular method to allow 
    // allowedHeaders:["Content-type","Authorization"]
   }
));

//defining API route
app.get('/api/message',(req,res)=>{
    res.json({message:"Hello from backend"})
})

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server is started at PORT : ${PORT}`);
})