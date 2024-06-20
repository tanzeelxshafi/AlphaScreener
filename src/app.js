import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// import { User } from "./models/user.js";
// import primeUserRouter  from "./route/primeUser.js";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser());

//routes import
import userRouter from "./routes/users.js";
import reviewRouter from "./routes/reviews.js";
import watchListRouter from "./routes/watchList.js";
// import primeUserRouter from "./routes/primeUser.js";
//routes declaration

app.get('/', async (req, res) => {
    try {
        // Record the current time before making the API call
        const startTime = performance.now();
        const result = await fetch("https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/week/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=8Ksn44pycRJyFLxnm4fE6AAGqDXpwudK");
        const data = await result.json();
        // Record the current time when the response is received
        const endTime = performance.now();
        const timetaken = endTime - startTime;
        // const user  = await User.find();
        console.log(`Time taken to fetch data: ${timetaken}ms`);
        res.status(200).send(JSON.stringify(data));
    }
    catch (err) {
        res.status(400).send({
            message: {
                error: "No response"
            }
        })
    }
    
})
// app.get("/db", async (req, res) => {
//     const newU = new User({
//         username: "vineofs",
//         password: "vese"
//     });
//     await newU.save();
//     res.send("Saved");
// })


// app.get("/check", (req, res) => {
//     const data = "check data";
//     res.send(JSON.stringify(data));
// })

app.use('/users', userRouter)
app.use('/reviews',reviewRouter)
app.use('/watchList',watchListRouter)
// app.use('/primeUser', primeUserRouter);

app.get('/SFGF', userRouter)




export { app };

