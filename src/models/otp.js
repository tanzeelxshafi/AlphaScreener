import mongoose ,{Schema} from "mongoose";

const otpSchema = new Schema({
    phoneNumber : {
        type : String,
        required : true,
        ref:"User"
    },
    otp : {
        type : String,
        required : true
    },
    otp_expiration :{
        type: Date,
        default : ()=> Date.now() + 5*60*1000, // 5 minutes otp expiration
        // get : (otp_expiration) => otp_expiration.getTime(),

        // set : (otp_expiration) => new Date(otp_expiration)
        // required : true

    }
    
})

const Otp = mongoose.model("Otp",otpSchema);

export { Otp }