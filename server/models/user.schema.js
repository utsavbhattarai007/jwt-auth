import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true 
    },
    password: {
        type: String,
        required:true,
    },
    profilePic: {
        type: String,
        required:false,
    },
    roles:{
        type: [String],
        enum:["user","admin","superadmin"],
        default:["user"]
    },
    verified:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model("User",userSchema)
export default User;