import { Router } from "express";
const router = Router();
import compStock from "../models/companyData.js";
import { watchList } from "../models/WatchList.js";

router.get("/list", async (req, res) => {
    try{
        const result = await fetch("https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2024-06-26/2024-06-26?adjusted=true&sort=asc&apiKey=8Ksn44pycRJyFLxnm4fE6AAGqDXpwudK");
        const data = await result.json();
        const newData = new compStock({
            ticker: data.ticker,
            results: data.results
        })
        await newData.save();
        console.log(newData);
        res.status(200).send("Success!");  
    }catch(err){
        console.log(err);
        res.status(500).send("Error")
    }
});

export default router;