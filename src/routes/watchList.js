import { Router } from "express";
const router = Router();

import { watchList } from "../models/WatchList.js";

router.post("/list", async (req, res) => {
    try{
        const result = await fetch("https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2024-06-25/2024-06-26?adjusted=true&sort=asc&apiKey=8Ksn44pycRJyFLxnm4fE6AAGqDXpwudK");
        const data = JSON.parse(result);
        const list = new watchList({
            compName:req.body.compName,
            //userId:req.body.userId
            compData:data
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