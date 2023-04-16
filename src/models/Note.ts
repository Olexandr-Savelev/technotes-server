import mongoose, { Document, Error, Model, Types } from "mongoose";
import CounterModel from "./Counter";

interface NoteDocument extends Document {
  _id: Types.ObjectId;
  user: object;
  title: string;
  text: string;
  completed: boolean;
  ticket: string;
}

interface NoteModel extends Model<NoteDocument> {}

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please enter a password."],
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    ticket: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.pre("save", async function (next) {
  if (this.ticket) {
    return next();
  }

  try {
    const counter = await CounterModel.findByIdAndUpdate(
      "ticket",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.ticket = counter.seq.toString();
    next();
  } catch (err: any) {
    next(err);
  }
});

export default mongoose.model<NoteDocument, NoteModel>("Note", NoteSchema);
