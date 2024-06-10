import mongoose,{Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required:true

        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },

    }
)

const User = mongoose.model("User", userSchema);
export {User};