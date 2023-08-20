import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Post } from "../types";
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
// } from "react-html-parser";

function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postId) {
      axios
        .get(`/api/post/${postId}`)
        .then((response) => {
          setPost(response.data);
          console.log("BODY", response.data.body);
        })
        .catch((error) => {
          console.error("Error fetching blog post:", error);
        });
    }
  }, [postId]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          {/* <div>
            {ReactHtmlParser(post.body, {
              transform(node) {
                if (node.name === "a") {
                  return null;
                }
                console.log("NODE", node);
                return node;
              },
            })}
          </div> */}
          <img
            src={post.image}
            style={{
              width: "100%",
            }}
          />
          {/* Display other post details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <iframe src="https://cloudinary.com/blog/guest_post/upload-images-to-cloudinary-with-node-js-and-react"></iframe>
    </div>
  );
}

export default PostPage;
