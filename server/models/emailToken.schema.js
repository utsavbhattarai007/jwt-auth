import mongoose,{Schema} from "mongoose";

const emailTokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"User",
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600 // 1 hour
    }
});

const emailToken = mongoose.model("emailToken", emailTokenSchema);
export default emailToken;
