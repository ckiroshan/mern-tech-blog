import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const PostModel = model("Post", PostSchema);

export default PostModel;
