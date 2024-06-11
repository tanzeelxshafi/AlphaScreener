import { Router } from "express";
const router=Router();
import {primeUser} from "../models/primeUser.js";
//import { asyncHandler } from "../utils/CatchError";

router.post("/primeUser", async(req,res)=>{
try{
    const PrimeUser=new primeUser({
        // id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,
        AccessLevel:req.body.AccessLevel
    })
    console.log(PrimeUser);
    await PrimeUser.save();
    return res.status(200).send("success");
}catch(e){
    console.log(e);
    return res.status(400).send("error");
}
});

export default router;
