import dotenv from "dotenv"
import { app } from "./app.js"
import { connect } from "mongoose"
import connectDB from "./db/db.js"
// import { f } from "./constants.js"

dotenv.config({
    path: './.env'
})


connectDB()

app.listen( process.env.PORT, ()=>{
    console.log(`Server open at:${process.env.PORT}`)
})
