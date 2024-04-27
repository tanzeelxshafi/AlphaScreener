import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { User } from "./models/user.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());

//routes import
import userRouter from "./routes/fetch.js";

//routes declaration

app.get('/',(req,res)=>{
    const data="Hi Homepage";
    res.send("Hi Home");
})
app.get("/db" , async (req,res)=>{
    const newU = new User({
        username: "vineofs",
        password: "vese"
    });
    await newU.save();
    res.send("Saved");
})

app.use('/user' ,userRouter)
app.get('/SFGF' ,userRouter)




export { app };

