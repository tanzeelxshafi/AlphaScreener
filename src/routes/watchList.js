import { Router } from "express";
const router = Router();

import { watchList } from "../models/WatchList.js";

router.post("/list", async (req, res) => {
    try{
        const list = new watchList({
            compName:req.body.compName,
            //userId:req.body.userId
        })
        await list.save();
        console.log(list);
        res.status(200).send("List saved successfully")
    }catch(err){
        console.log(err);
        res.status(500).send("Error")
    }
});

export default router;