import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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
    } catch (error) {
        return res.json({success:false, Message:'Internal Server Error'})
    }
}