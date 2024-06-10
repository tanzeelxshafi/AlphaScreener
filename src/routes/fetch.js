import { Router } from "express";
import { fun } from "../controllers/fetch.js"

const router = Router();

//attribute and function


function check(req, res , next){
    console.log("hi")
    next()
}
router.get(  
    '/', check , function (req,res){
    res.send("Hi from router")
    }

)


router.get('/control' , fun);


export default router



