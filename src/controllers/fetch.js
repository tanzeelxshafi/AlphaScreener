import { Mongoose } from "mongoose";
import { User } from "../models/user.js";
const fun= async(req,res)=>{
    const data = await User.find({});
    const sendData = JSON.stringify(data);
    res.send(sendData);
}

export {fun}