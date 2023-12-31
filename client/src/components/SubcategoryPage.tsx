import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { styled, createTheme } from "@mui/material/styles";
import { PostListTemplate } from "./PostListTemplate";
import { Post } from "../types";

// Create the theme object
const theme = createTheme();

// Styled component for the delete button
const StyledDeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white", // Red background
  color: "black", // White text color
  "&:hover": {
    color: "white",
    backgroundColor: "red" // Darker red background on hover
  },
}));

function SubcategoryPage() {
  const { categoryName, subCategoryName } = useParams<{
    categoryName: string;
    subCategoryName: string;
  }>();
  const [posts, setPosts] = useState<Post[]>([
    // {
    //   _id: "@2",
    //   body: "adsadsdc",
    //   title: "title", image: "https://res.cloudinary.com/wbailey89/image/upload/v1692641541/utdgxucnzikyhjri6bzd.jpg"
    // },
    
  ]);
  const [category, setCategory] = useState<any>(null);
  const [subCategory, setSubCategory] = useState<any>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const navigate = useNavigate();

  const handleEditPost = (postId: string) => {
    // Navigate to the edit page for the selected post
    navigate(`/manage/${postId}`);
  };

  const handleOpenDeleteDialog = (postId: string) => {
    setPostIdToDelete(postId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setPostIdToDelete("");
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/api/posts/${postIdToDelete}`);
      // Remove the deleted post from the posts array
      setPosts(posts.filter((post) => post._id !== postIdToDelete));
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(`/api/categories/${categoryName}`);
      console.log(res.data);
      setCategory(res.data);
      const findSubCategory = res.data.subCategories.find(
        (subCat: any) => subCat.name == subCategoryName
      );
      if (!findSubCategory) {
        throw "error";
      }
      setSubCategory(findSubCategory);
      return {
        category: res.data,
        subCategory: findSubCategory,
      };
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { category, subCategory } = (await getCategory()) as any;
        const response = await axios.get(
          `/api/posts/${category._id}/${subCategory._id}`
        );
        setPosts(response.data);
      } catch (error) {
        navigate("/");
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, [categoryName, subCategoryName]);

  return (
    <div>
      <h5>Posts in {subCategoryName}</h5>
      <PostListTemplate />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "16px 0",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100px",
                height: "100px",
                marginRight: "16px",
                borderRadius:50
              }}
            />
            <div
              onClick={() => navigate(`/post/${post._id}`)}
              style={{ cursor: "pointer", flexGrow: 1 ,fontSize:30}}
            >
              {post?.title?.toUpperCase()}
            </div>

            <Button onClick={() => handleEditPost(post._id)}>Edit</Button>

            <StyledDeleteButton
              onClick={() => handleOpenDeleteDialog(post._id)}
            >
              Delete
            </StyledDeleteButton>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{ sx: { borderRadius: "8px" } }} // Style the paper (dialog container)
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <StyledDeleteButton onClick={handleDeletePost} autoFocus>
            Delete
          </StyledDeleteButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SubcategoryPage;
