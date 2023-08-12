import express, { application } from "express";
import mongoose from "mongoose";
import subscriberModel from "./models/subscriber";
import cors from "cors";
import PostModel from "./models/postModel";
const bodyParser = require("body-parser");
// import postRoutes from "./routes/postRoutes"; // Import the postRoutes
import categoryModel from "./models/category";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "./Controllers/categoryController";
import { createSubCategory } from "./Controllers/subCategoryController";
import subCategoryModel from "./models/subcategory";
import {
  createPost,
  getPosts,
  findPost,
  deletePost
} from "./Controllers/postController"
import postRouter from "./routes/postRoutes"; // Import the postRoutes


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//subscriber controller
app.post("/subscriber", async (req, res) => {
  const subExists = await subscriberModel.findOne(req.body);
  if (subExists) {
    res.status(422).json("Already subscribed, please login instead.");
    return;
  }

  const subscriber = new subscriberModel(req.body);
  await subscriber.save();
  res.json(subscriber);
});

//post Controller



app.use("/api", postRouter);

// API endpoint to handle post creation

app.get("/api/categories", getCategories);
app.post("/api/categories", createCategory);
app.delete("/api/categories/:id", deleteCategory);
app.get("/api/categories/:categoryName", getCategory);

app.post("/api/categories/:categoryId/subcategories", createSubCategory);

mongoose.connect("mongodb://localhost:27017/TsReactBlogV2_0").then(() => {
  app.listen(5500, () => {
    console.log("your computer is on fire");
  });
});
