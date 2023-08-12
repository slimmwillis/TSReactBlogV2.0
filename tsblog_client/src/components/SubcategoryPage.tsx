import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function SubcategoryPage() {
  const { categoryName, subCategoryName } = useParams<{ categoryName: string; subCategoryName: string }>();
  const [posts, setPosts] = useState<{ _id: string; title: string }[]>([]);
  const [category, setCategory] = useState<any>(null)
  const [subCategory, setSubCategory] = useState<any>(null)
    const navigate = useNavigate()

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
          <li key={post._id} onClick={()=>navigate(`/posts/${post._id}`)} >{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SubcategoryPage;
