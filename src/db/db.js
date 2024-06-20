import mongoose from "mongoose";
import {Counter} from "../models/counter.js";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_LOCAL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        const counter = await Counter.findOne({ id: 'watchlist_seq' });
  if (!counter) {
    await Counter.create({ id: 'watchlist_seq', seq: 0 });
    console.log("Counter initialized");
  }
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;