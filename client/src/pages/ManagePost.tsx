import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import PostModel from "../../../tsblog_server/src/models/postModel"; // Import the PostModel

interface Category {
  name: string;
  subCategories: string[];
  subCategoryNames: string[];
}

interface FormData {
  title: string;
  body: string;
  category: string;
  subCategory: string;
}

const ManagePost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    string | undefined
  >("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    body: "",
    category: "",
    subCategory: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setFormData((prevData) => ({
      ...prevData,
      category: category,
      subCategory: "",
    }));
  };

  const handlesubCategoryChange = (event: SelectChangeEvent<string>) => {
    const subCategory = event.target.value;
    setSelectedSubCategory(subCategory);
    setFormData((prevData) => ({ ...prevData, subCategory: subCategory }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = {
      ...formData,
      category: selectedCategory,
      subCategory: selectedSubCategory,
    };

    // Handle form submission or API calls with the form data
    try {
      console.log("we made it to here");
      const response = await axios.post(
        `http://localhost:5500/api/createPost`,
        postData
      );
      console.log("Post submitted:", response.data);
      console.log("Here is the Form Data:", formData);
      console.log("Here is the Post Data:", postData);
      setFormData({
        title: "",
        body: "",
        category: "",
        subCategory: "",
      }); // Clear the form after successful submission
    } catch (error) {
      console.error("Error submitting post:", error);
    }

    console.log(formData);
  };

  useEffect(() => {
    console.log("This:", categories);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField
          fullWidth
          label="title"
          id="fullWidth"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField
          multiline
          maxRows={12}
          variant="standard"
          fullWidth
          label="Body"
          id="fullWidth"
          name="body"
          value={formData.body}
          onChange={handleChange}
        />
      </Box>

      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
          name="category"
        >
          {categories.map((category) => (
            <MenuItem key={category.name} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        {selectedCategory && (
          <FormControl fullWidth>
            <InputLabel id="subCategory-label">subCategory</InputLabel>
            <Select
              labelId="subCategory-label"
              id="subCategory-select"
              value={selectedSubCategory}
              onChange={handlesubCategoryChange}
              label="subCategory"
              name="subCategory"
            >
              {categories
                .find((category) => category.name === selectedCategory)
                ?.subCategoryNames?.map((subCategoryName) => (
                  <MenuItem key={subCategoryName} value={subCategoryName}>
                    {subCategoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </FormControl>

      <Button type="submit" variant="contained">
        Post
      </Button>
    </form>
  );
};

export default ManagePost;
