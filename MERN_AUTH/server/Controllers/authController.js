import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//register controller
export const register = async(req,res)=>{
    const {name,email,password}= req.body

    //checking credentials for registration
    if(!name || !email || !password){
        return res.json({success:false, Message:'Missing Details'})
    }
    try {
        //checking if user already exists
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false, Message:'User already exists'})
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        //creating new user
        const user = new userModel({name,email,password:hashedPassword})

        //saving user to database
        await user.save()

        //generating JWT token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'7d'})

        //setting token in cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        })
        return res.json({success:true, Message:'Successfully Register'})
    } catch (error) {
        return res.json({success:false, Message:'Internal Server Error'})
    }
}

//login controller
export const login = async (req,res)=>{
    const {email,password} = req.body;

    //checking credentials for login
    if(!email || !password){
        return res.json({success:false, Message:'Email and Passsword is required'})
    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, Message:'Invalid Email '})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false, Message:'Invalid Password'})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'7d'})

        //setting token in cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        })
        return res.json({success:true, Message:'Login Successful'})
        
    } catch (error) {
        return res.json({success:false, Message:error.message})
    }
}

//logout controller
export const logout = (req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict'
        });
        res.json({success:true, Message:'Logout Successful'})
    } catch (error) {
        res.json({success:false, Message: error.message})
    }
}


