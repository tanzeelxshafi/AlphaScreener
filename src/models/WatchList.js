import mongoose,
{ Schema } from "mongoose";
import { Counter } from "./counter.js";
const StockWatchList = new Schema({
  seq: {
    type: Number,  // Use ObjectId to reference the User model
    autoIncrement: true,  // Reference the User model
    unique: true,
  },
  compName: {
    type: Schema.Types.Mixed,
    required: [true]
  },
  // userId: {
  //   type: Schema.Types.ObjectId,  // Use ObjectId to reference the User model
  //   ref: "User",  // Reference the User model
  //   required: [true, 'User reference is required']
  // },
  compData: {
    type: String,
    required: [false],
  }
});

StockWatchList.pre('save', async function (next) {
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

const watchList = mongoose.model("watchList", StockWatchList)

export { watchList };