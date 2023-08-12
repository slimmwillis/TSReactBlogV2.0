import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  body: string;
  // Other fields
}

function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // Fetch blog post data based on postId
    axios.get(`/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog post:', error);
      });
  }, [postId]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          {/* Display other post details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostPage;
