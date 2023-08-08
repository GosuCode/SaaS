import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { postsRouter } from "./routes/Posts.js";
import dotenv from 'dotenv'
dotenv.config();

const app = express();

//adding express.json() middleware to parse JSON data in the request body
app.use(express.json());
app.use(cors());

// Connect to the MongoDB database
mongoose.connect(process.env.STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Route handlers
app.use("/posts", postsRouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
