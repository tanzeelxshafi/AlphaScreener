import { Router } from "express";
const router = Router();
import {compStock} from "../models/companyData.js";
import { watchList } from "../models/WatchList.js";

router.get("/list", async (req, res) => {
    try {
        const result = await fetch("https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&include_otc=false&apiKey=8Ksn44pycRJyFLxnm4fE6AAGqDXpwudK");
        const data = await result.json();
        // const newData = new compStock({
        //     ticker: data.ticker,
        //     results: data.results
        // })
        // await newData.save();
        console.log(data);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error")
    }
});

router.get('/watchList', async (req, res) => {
    const user = req.params.user;
    //Right now taking from params in future will take from JWT
    const userWatchlist = await watchList.findOne({ userId: user });
    const companyIds = userWatchlist.compName;
    const data = [];
    companyIds.forEach(async (companyId) => {
        const companyData = await compStock.findOne({ _id: companyId });
        const name = companyData.ticker;
        data.push(name);
    });
    req.status(200).send(data);
})

export default router;