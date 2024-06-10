import mongoose,{Schema} from "mongoose";

const reviewSchema=new Schema({
    data:{
        type:String,
        required:[true],
        },
    user: {
        type: Schema.Types.ObjectId,  // Use ObjectId to reference the User model
        ref: "User",  // Reference the User model
        required: [true, 'User reference is required']
    }
});

const Review=mongoose.model('Review',reviewSchema);
export {Review};