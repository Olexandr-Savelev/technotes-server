import mongoose, { Document, Model } from "mongoose";

interface UserDocument extends Document {
  username: string;
  password: string;
  roles: string[];
  active: boolean;
}

interface UserModel extends Model<UserDocument> {}

const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "Employee",
      required: true,
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<UserDocument, UserModel>("User", UserSchema);
