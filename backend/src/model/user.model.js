import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username :{
            type: String,
            required: true,
            unique: true
        },
        fullname:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required:[true,'password is required']
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        refreshToken:{
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password)
{
    // const isPasswordCorrect = await bcrypt.compare(password,this.password);
    // console.log(isPasswordCorrect);
    // return isPasswordCorrect;
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email:this.email,
            fullname:this.fullname,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}


export const User = mongoose.model("User",userSchema)