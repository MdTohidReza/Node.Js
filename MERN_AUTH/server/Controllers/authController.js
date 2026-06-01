import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodeMailer.js"


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
        
        //Welcoming Email to the user
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'Welcome to our App',
            text:`Hi ${name},\n\nWelcome to our app! We're glad to have you on board.\n\nBest Regards,\nThe Team ${email}`
        }
        await transporter.sendMail(mailOptions)

        // try {
        //     const info = await transporter.sendMail(mailOptions);
        //     console.log(" Email sent:", info.messageId);
        //     console.log(" Response:", info.response);
        // } catch (error) {
        //     console.error(" Email error:", error.message);
        //     console.error(" Full error:", error);
        // }

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

 export const sendVerifyEmail = async(req,res)=>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId)
        if(user.isAccountVerified){
            return res.json({success:false, message:"Account is already verified"})
        }
        const otp = ( Math.floor(100000 +  Math.random() * 900000)).toString()
        user.verifyOtp = otp;
        user.verifyOtpExpire = Date.now() + 24*60*60*1000; //24 hours expiry
        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Account Verification OTP",
            text: `Hi ${name},\n\nYour verification OTP is: ${otp}\n\nBest Regards,\nThe Team ${email}`,
        };
            await transporter.sendMail(mailOptions);

    } catch (error) {
        return res.json({success:false, Message:error.message})
    }
}

//verify otp controller
    export const verifyOtp = async(req,res)=>{
    const {userId, otp} = req.body;
    if(!userId || !otp){
        return res.json({sucess:false , message:'Missing userId or otp' })
    }
    try {
        const user = await userModel.findById(userId)
        if(!user){
            return res.json({success:false, message:'User not found'})
        }
        if(user.isAccountVerified){
            return res.json({success:false, message:'Account is already verified'})
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success:false, message:'Invalid OTP'})
        }
        if(user.verifyExpireAt < Date.now()){
            return res.json({sucess:false, message:'Otp Expired'})
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpire = 0;
        await user.save()
        return res.json({success:true, message:'Account Verified Successfully'})
    } catch (error) {
        return res.json({ success: false, Message: error.message });
    }

}


