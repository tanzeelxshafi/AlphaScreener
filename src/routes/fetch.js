import { Router } from "express";
import { fun } from "../controllers/fetch.js"

const router = Router();
router.get('/', (req,res)=>{
    res.send("Hi from router")
})
router.get('/control' , fun);


export default router



