import express from 'express'
import { login, logout, register, verifyOtp , sendVerifyEmail} from '../Controllers/authController.js'
import userAuth from '../middleware/userAuth.js'

const authRoute = express.Router()

authRoute.post('/register',register)
authRoute.post('/login',login)
authRoute.post('/logout',logout)
authRoute.post('/send-verify-otp', userAuth, sendVerifyEmail)  // sends the OTP email
authRoute.post('/verify-account',  userAuth, verifyOtp)        // verifies the OTP

export default authRoute
