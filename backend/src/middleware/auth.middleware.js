import {AsyncHandler} from '../utils/AsyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import jwt from "jsonwebtoken"
import {User} from '../model/user.model.js';

export const verifyJWT = AsyncHandler(async(req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token)
        {
            throw new ApiError(401, "Unauthorized access")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"Invalid access token")
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})