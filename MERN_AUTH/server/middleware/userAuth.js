import jwt from 'jsonwebtoken';

export const userAuth = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({success:false, Message:'Unauthorized'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.id){
            req.body = req.body || {};
            req.body.userId = decoded.id;
        }else{
            return res.json({success:false, message:"Not  Authorized to Login Again"})
        }
        next()
    }
    catch (error) {
        return res.json({success:false, Message:error.message})
    }
}
export default userAuth;