import { Router } from "express";
const router = Router();
import {User} from '../models/user.js';
import { asyncHandler } from "../utils/CatchError.js";
import { ExpressError } from "../utils/ExpressError.js";

router.post('/signup',async (req,res)=>{
   try{ 
    const user = new User({
          // id:req.body.id,
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          phoneNumber:req.body.phoneNumber,
          gender:req.body.gender,
          isPrime:req.body.isPrime,
      })
      // console.log(PrimeUser.unique_Id);
      if(user.isPrime==""||user.isPrime=="null"){
        user.isPrime=false;
      }
      await user.save();
      console.log(user);
    res.status(200).send('Success')}
    catch(e){
        console.log(e);
        res.send('fail');
    }
})

router.post('/login', asyncHandler( async(req,res)=>{

       const {email,password}=req.body;
       if(!email||!password){
        console.log('Enter all values');
        // throw new Error('Please enter');
        // console.log(Error.);  
        throw new ExpressError( 404 ,'Please enter values')
        // return res.send('Enter all values');
       }
       const user=await User.findOne({email:email})
       if(!user){
        return res.send('Fail')
       }
      const isMatch=await User.comparePassword(password)
      console.log(User); // Debugging: log the user instance
      if (!isMatch) {
        return res.status(400).send('Fail');
      }
       res.send('User Exist') ;     
}))

export default router;