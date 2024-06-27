import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    unique_Id: {
        type: Schema.Types.ObjectId,
        required: false,//allowNull:false
        primaryKey: [true],
        foreignKey: [true]
    },
    name: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [false],
        unique: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    phoneNumber: {
        type: String,
        required: [false],
        unique: [true],
        foreignKey: [true]
    },
    gender: {
        type: String,
        required: [false]
    },
    verified:{
        type: Boolean,
        default: false
    },
    isPrime: {
        type: Boolean,
        required: [false],
        default: false
    },
    refreshToken: {
        type: String
    }
},
    {
        timestamps: true
    });

userSchema.pre('save', async function (next) {
    // try{
    // Only hash the password if its new (or Modified);
    if (!this.isModified('password')) {
        return next();
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
    next();
    // }catch(e){
    //     console.log(e);
    //     next(e);
    // }
})

// Method to compare input password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    // console.log(candidatePassword);
    // console.log(this.password);
    return await bcrypt.compare(candidatePassword, this.password)
};


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
            // name: this.name,
            // phoneNumber : this.phoneNumber

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



const User = mongoose.model("User", userSchema);
export { User };