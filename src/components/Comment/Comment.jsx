import React from "react";
import "./comment.css";

const Comment = ({ user, user: { user: userName } }) => {
  return (
    <div className='comment'>
      <h2>{userName}</h2>
      {user.content === "" ? (
        <p>...</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: user.content }} />
      )}
      <time>
        {new Date(user.time * 1000).toLocaleDateString("en-GB", {
          weekday: "short",
          month: "short",
          year: "2-digit",
        })}
      </time>
      {user.comments.length
        ? user.comments.map((comment) => (
            <Comment
              key={comment.id}
              user={comment}
            />
          ))
        : null}
    </div>
  );
};

export default Comment;
