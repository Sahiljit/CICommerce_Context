import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"


export const protect = asyncHandler(async(req,res, next)=>{

    let token
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer'))
        {
            try{
                token = req.headers.authorization.split(' ')[1]

                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                
                //this is important step where we add user object to request object itself
                req.user = await User.findById(decoded.id).select('-password')
                
                next()

            }catch(err){
                res.status(401)
                throw new Error('Not Authorized')

            }
        }


    
})