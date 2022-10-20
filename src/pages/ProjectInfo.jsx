import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Menu from "../components/Menu/Menu";
import Comment from "../components/Comment/Comment";

const ProjectInfo = () => {
  const location = useLocation();
  const id = location.state.id;
  const [post, setPost] = useState({ comments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await publicRequest.get(`/item/${id}.json`);
        result.status === 200 && setPost(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getPost();
  }, [id]);

  return (
    <div>
      <Menu />
      <main>
        {loading ? (
          <h3>Loading...</h3>
        ) : post.comments.length ? (
          post.comments.map((user) => (
            <Comment
              key={user.id}
              user={user}
            />
          ))
        ) : (
          <h3>No comments yet</h3>
        )}
      </main>
    </div>
  );
};

export default ProjectInfo;
