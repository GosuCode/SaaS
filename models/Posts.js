import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
},
{
  timestamps: true
}

);

export const PostsModel = mongoose.model("posts", postsSchema);
