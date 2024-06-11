import mongoose ,
{Schema} from "mongoose";

const PrimeUserSchema=new Schema({
id:{
type:Schema.Types.ObjectId,
required:false ,//allowNull:false
primaryKey:[true]
},
name:{
    type:String,
    required:[true]
},
email:{
    type:String,
    required:[false]
},
phoneNumber:{
    type:Number,
    required:[false]
},
Gender:{
    type:String,
    required:[false],
},
AccessLevel:{
    type:String,
    required:[true]
}
});

const primeUser=mongoose.model('primeUser',PrimeUserSchema);

export {primeUser};