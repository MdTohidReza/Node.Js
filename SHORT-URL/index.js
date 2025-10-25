const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require('./models/url')
const  cookieParser = require('cookie-parser')
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const userRoute = require('./routes/user')
const {restrictToLoggedinUserOnly,checkAuth} = require('./middleware/auth')

const app = express();
const PORT = 8001;

// Connect MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() =>console.log("MongoDB Connected successfully")
);


app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))


// ✅ Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// app.get("/test", async(req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home',{
//         urls : allUrls
//     })
// })

app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push:{
        visitHistory:{
            timestamp:Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
})

// Routes
app.use("/url", restrictToLoggedinUserOnly ,urlRoute);
app.use('/', staticRoute)
app.use('/user',checkAuth,  userRoute)

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
