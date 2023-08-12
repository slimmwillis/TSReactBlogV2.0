import { Request, Response } from "express";
import categoryModel from "../models/category";
import subCategoryModel from "../models/subcategory";
import { rmSync } from "fs";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    let category = await categoryModel.findOne({ name });

    if (category) return res.status(400).json("category already exists...");

    if (!name) return res.status(400).json("All fields are required...");

    category = new categoryModel({ name });
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryModel
      .findOne({
        name: req.params.categoryName,
      })
      .populate("subCategories");

    if (!category)
      return res.status(404).json({ message: "Category does not exists" });

    res.status(200).json(category);
  } catch (error) {
    console.log((error as any).message);
    res.status(500).json({ error: error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id; // Use the correct parameter name
    const category = await categoryModel.findByIdAndDelete(categoryId);
// Delete associated subcategories
await subCategoryModel.deleteMany({ category: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};