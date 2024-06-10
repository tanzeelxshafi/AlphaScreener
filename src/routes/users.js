import { Router } from "express";
const router = Router();
import {User} from '../models/user.js';
import { asyncHandler } from "../utils/CatchError.js";
import { ExpressError } from "../utils/ExpressError.js";

router.post('/signup',async (req,res)=>{
   try{ 
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    console.log(req.body);
    await user.save();
    res.status(200).send('Success')}
    catch(e){
        console.log(e);
        res.send('fail');
    }
})

router.post('/login', asyncHandler( async(req,res)=>{

       const {username,password}=req.body;
       if(!username||!password){
        console.log('Enter all values');
        // throw new Error('Please enter');
        // console.log(Error.);  
        throw new ExpressError( 404 ,'Please enter values')
        // return res.send('Enter all values');
       }
       const user=await User.findOne({username:username})
       if(!user||user.password!==password){
        return res.send('Fail')
       }
       res.send('User Exist') ;     
}))

export default router;