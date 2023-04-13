import mongoose, { Document } from "mongoose";
import { Model } from "mongoose";

interface CounterDocument extends Document {
  _id: string;
  seq: number;
}

interface CounterModel extends Model<CounterDocument> {}

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export default mongoose.model<CounterDocument, CounterModel>(
  "Counter",
  CounterSchema
);
