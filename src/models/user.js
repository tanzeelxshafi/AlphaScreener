import mongoose,
{Schema} from "mongoose";
import bcrypt  from "bcryptjs";


const userSchema = new Schema({
    unique_Id:{
        type: Schema.Types.ObjectId,
        required:false ,//allowNull:false
        primaryKey:[true],
        foreignKey:[true]
        },
        name:{
            type:String,
            required:[true]
        },
        email:{
            type:String,
            required:[false],
            unique:[true]
        },
        password:{
            type:String, 
            required:[true]
        },
        phoneNumber:{
            type:String,
            required:[false],
            unique:[true],
            foreignKey:[true]
        },
        Gender:{
            type:String,
            required:[false]
        },
        isPrime:{
            type:Boolean,
            required:[false],
            default:false
        }
});

userSchema.pre('save', async function(next){
    try{
     // Only hash the password if its new (or Modified);
    if (!this.isModified('password')) {
        return next();
      }
        const saltRounds = 10;
        const salt= await bcrypt.genSalt(saltRounds);
        const hashPass=await bcrypt.hash(this.password,salt);
        this.password =  hashPass;
        next();
    }catch(e){
        console.log(e);
        next(e);
    }
})

// Method to compare input password with the hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
    console.log(candidatePassword);
    console.log(this.password);
    return await bcrypt.compare(candidatePassword, this.password)
  };

const User = mongoose.model("User", userSchema);
export {User};