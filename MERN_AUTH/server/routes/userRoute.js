import express from "express"
import userAuth  from '../middleware/userAuth.js';
import { getUserData } from "../Controllers/userCOntroller.js";

export const userRouter = express.Router()

userRouter.get('/data',userAuth,getUserData)

export default userRouter;
