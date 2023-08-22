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
import PostModel from "../../../server/src/models/postModel"; // Import the PostModel
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for ReactQuill
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import { toast } from "react-hot-toast"

interface Category {
  _id: string;
  name: string;
  subCategories: string[];
  subCategoryNames: string[];
}

interface FormData {
  _id: string;
  title: string;
  body: string;
  category: string;
  subCategory: string;
}

interface Post {
  _id: string;
  title: string;
  body: string;
  category: string;
  subCategory: string;
  subCategoryName: string;
  image?: string
}

const ManagePost: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode
  const [editPostId, setEditPostId] = useState<string | null>(null); // Post ID for editing
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    string | undefined
  >("");
  const params = useParams();

  const [formData, setFormData] = useState<FormData>({
    _id: "",
    title: "",
    body: "",
    category: "",
    subCategory: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]); // Assuming you have a Post type
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchPosts(); // Fetch existing posts
    if (postId) {
      enterEditMode(postId);
    }
  }, [postId]); // Include isEditMode in the dependency array

  const enterEditMode = async (postId: string) => {
    setIsEditMode(true);
    setEditPostId(postId);

    try {
      const response = await axios.get(`/api/post/${postId}`); // Adjust the endpoint
      const postData: Post = response.data;
      setSelectedCategory(postData.category);
      {
        console.log("~!this is the data: ", postData.subCategoryName);
      }
      setSelectedSubCategory(postData.subCategoryName);
      setImage(postData?.image ?? "")
      setFormData({
        ...postData,
        category: postData.category, // Ensure the correct field name
        subCategory: postData.subCategory, // Ensure the correct field name
      });
      setImageFile(null);

    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

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
    const subCategoryName = event.target.value;
    setSelectedSubCategory(subCategoryName);

    try {
      // Find the corresponding subcategory in the selected category's subCategories array
      const selectedCategoryObject = categories.find(
        (category) => category._id === selectedCategory
      );

      if (!selectedCategoryObject) {
        throw new Error("Selected category not found.");
      }

      const isSubCategoryValid =
        selectedCategoryObject.subCategories.includes(subCategoryName);

      if (!isSubCategoryValid) {
        throw new Error(
          "Selected subcategory not found in the selected category."
        );
      }

      // Find the corresponding subcategory name in the selected category's subCategoryNames array
      const selectedSubCategoryName =
        selectedCategoryObject.subCategoryNames.find(
          (subCategory) => subCategory === subCategoryName
        );

      if (!selectedSubCategoryName) {
        throw new Error(
          "Selected subcategory not found in the selected category."
        );
      }

      // Since the subCategoryName is valid, we can set it directly in the formData
      setFormData((prevData) => ({
        ...prevData,
        subCategory: selectedSubCategoryName,
      }));
    } catch (error) {
      console.error("Error handling subcategory change:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/post/${editPostId}`, {
        ...formData,
        // category: params?.categoryName ?? "",
        // subCategory: params?.subCategoryName ?? "",
      });
      toast.success("Post updated successfully")
      console.log("Post updated:", response.data);
      setIsEditMode(false); // Exit edit mode
      setEditPostId(null);
      setFormData({
        _id: "",
        title: "",
        body: "",
        category: "",
        subCategory: "",
      }); // Clear the form
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuillChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, body: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let postData: any = {
      ...formData,
      category: params?.categoryName ?? "",
      subCategory: params?.subCategoryName ?? "",
    };

    // Handle form submission or API calls with the form data
    try {
      const formData = new FormData();
      formData.append("file", imageFile!);
      formData.append("upload_preset", "blogPosts");
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/wbailey89/upload",
        formData
      );
      console.log(cloudinaryRes.data);
      console.log("we made it to here");
      postData = {
        ...postData,
        image: cloudinaryRes.data.secure_url,
        category: params?.categoryName ?? "",
        subCategory: params?.subCategoryName ?? "",
      };
      const response = await axios.post(
        `http://localhost:5500/api/createPost`,
        postData
      );
      toast.success("Post is created successfully")

      console.log("Post submitted:", response.data);
      console.log("Here is the Form Data:", formData);
      console.log("Here is the Post Data:", postData);
      setFormData({
        _id: "",
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

  // useEffect(() => {
  //   console.log("This:", categories);
  //   fetchCategories();
  // }, []);

  const fetchCategories = async () => {
    try {
      console.log("fetchCategories is initiated: ");
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts"); // Update the endpoint
      setPosts(response.data);
      setImageFile(null);

    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const pickImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // source of the image to show it
      setImage(reader.result as string);
      setImageFile(file);
    };
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
      >
        {isEditMode ? (
          <form onSubmit={handleEditSubmit}>
            <input type="file" accept="image/*" onChange={pickImage} />
            {image && <img src={image}
              style={{
                marginTop: 10,
                height: 100,
                width: 100,
                objectFit: "contain"
              }}
            />}
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              sx={{ marginBottom: "16px", marginTop: "16px" }}
            />

            {/* ReactQuill editor */}
            <ReactQuill
              style={{ height: 140, marginBottom: 60 }}
              placeholder="Description"

              value={formData.body}
              onChange={handleQuillChange}
              modules={{
                clipboard: {
                  matchVisual: false,
                },
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "align",
                "link",
              ]}
            />

            {/* Category select */}
            {/* ... (category and subcategory selects) */}

            {/* Submit button */}
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={pickImage} />
            {
              image &&
              <img src={image} style={{
                marginTop: 10,
                height: 100,
                width: 100,
                objectFit: "contain"
              }} />}

            {/* Title input */}
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              sx={{ marginBottom: "16px", marginTop: "16px" }}
            />

            {/* ReactQuill editor */}
            <ReactQuill
              value={formData.body}
              placeholder="Description"
              style={{ height: 140 }}
              onChange={handleQuillChange}
              modules={{
                clipboard: {
                  matchVisual: false,
                },
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "align",
                "link",
              ]}
            // sx={{ marginBottom: "16px" }}
            />

            {/* Category select */}
            {/* ... (category and subcategory selects) */}

            {/* Submit button */}
            <Button type="submit" variant="contained" style={{ marginTop: 70 }}>
              Post
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default ManagePost;
