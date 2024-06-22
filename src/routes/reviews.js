import { Router } from "express";
const router = Router();
import {Review} from '../models/review.js';  
import {User} from '../models/user.js';  
import { asyncHandler } from "../utils/CatchError.js";

router.post('/authreview' , async (req, res) => {
    try{
        //first i will watch for body changes
        
        
        console.log(req.body);
        const {data,user} = req.body;
        if(!data||!user){
            console.log('values not entered');
            return res.status(400).send('All values required');
        }
        const userdata = await User.findOne({_id:user})
        if(!userdata){
            return res.send('Failed to find');
        }
        const review=new Review({
            data:req.body.data,
            user:req.body.user
        });
        console.log(review);
        
        await review.save();
        return res.send('Data entered with ObjectId');
    }catch(err)
    {
        console.log(err);
        return res.send('Failed')
    }
})

router.post('/', async (req, res) => {
    try{
        //first i will watch for body changes
        console.log(req.body);
        
        const review=new Review({
            data:req.body.data,
            user:req.body.user
        });
        console.log(review);
        // await review.save();
        return res.status(200).send('Success');
    }catch(err)
    {
        console.log(err);
        return res.send('Failed')
    }
})

export default router;
