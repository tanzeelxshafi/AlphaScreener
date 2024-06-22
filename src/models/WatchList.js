import mongoose ,
{Schema} from "mongoose";
import { Counter } from "./counter.js";
const StockWatchList = new Schema({
    compName:{
        type:String,
        required:[true]
    },
    seq: {
        type: Number,  // Use ObjectId to reference the User model
        autoIncrement:true ,  // Reference the User model
        unique: true,
    }
});

StockWatchList.pre('save', async function(next) {
    const doc = this;
    if (doc.isNew) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { id: 'watchlist_seq' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        doc.seq = counter.seq;
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

const watchList=mongoose.model("watchList",StockWatchList)

export {watchList};