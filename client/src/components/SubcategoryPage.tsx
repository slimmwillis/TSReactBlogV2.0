import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';







function SubcategoryPage() {
  const { categoryName, subCategoryName } = useParams<{ categoryName: string; subCategoryName: string }>();
  const [posts, setPosts] = useState<{ _id: string; title: string }[]>([]);
  const [category, setCategory] = useState<any>(null)
  const [subCategory, setSubCategory] = useState<any>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

    const navigate = useNavigate()



    const handleOpenDeleteDialog = (postId: string) => {
      setPostIdToDelete(postId);
      setOpenDeleteDialog(true);
    };
    
    const handleCloseDeleteDialog = () => {
      setOpenDeleteDialog(false);
      setPostIdToDelete('');
    };

    const handleDeletePost = async () => {
      try {
        await axios.delete(`/api/posts/${postIdToDelete}`);
        // Remove the deleted post from the posts array
        setPosts(posts.filter(post => post._id !== postIdToDelete));
        handleCloseDeleteDialog();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    };



  const getCategory = async () => {
    try {
      const res = await axios.get(`/api/categories/${categoryName}`);
      console.log(res.data);
      setCategory(res.data)
      const findSubCategory = res.data.subCategories.find((subCat:any)=>subCat.name==subCategoryName)
      if(!findSubCategory){throw "error"}
      setSubCategory(findSubCategory);
      return {
        category:res.data,
        subCategory :findSubCategory
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      

      try {
        const {category, subCategory} =  await getCategory() as any
        const response = await axios.get(`/api/posts/${category._id}/${subCategory._id}`);
        setPosts(response.data);
      } catch (error) {
        navigate('/')
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [categoryName, subCategoryName]);

  return (
    <div>
      <h5>Posts in {subCategoryName}</h5>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.title}{' '}
            <button onClick={() => navigate(`/posts/${post._id}`)}>View</button>{' '}
            <button onClick={() => handleOpenDeleteDialog(post._id)}>Delete</button>
          </li>
        ))}
      </ul>

                 {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeletePost} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog> 




    </div>
  );
}

export default SubcategoryPage;
