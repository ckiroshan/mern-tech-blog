import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 4, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

export default UserModel;
