import { Schema, model } from "mongoose";

const categoryEnum = [
  'AI', 'Cybersecurity', 'IoT', 'Space Tech', 
  'Ethical Hacking', 'Cryptography', 'Software Development',
  'Web Development', 'Programming', 'Frameworks', 
  'Databases', 'Version Control'
];

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    categories: {
      type: [{
        type: String,
        enum: categoryEnum
      }],
      validate: [arrayLimit, 'Maximum 3 categories allowed']
    },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

function arrayLimit(value) {
  return value.length <= 3;
}

const PostModel = model("Post", PostSchema);

export default PostModel;
