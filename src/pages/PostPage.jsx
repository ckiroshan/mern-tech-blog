import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostById } from "../service/api";
import { UserContext } from "../service/UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetchPostById(id).then((postInfo) => {
      setPostInfo(postInfo);
    });
  }, [id]);

  if (!postInfos) return "";

  const formattedDate = format(new Date(postInfos.updatedAt), "MMM d, yyyy HH:mm");

  return (
    <div className="post-page">
      <h1 className="post-heading">{postInfos.title}</h1>
      <time>{formattedDate}</time>
      <div className="author">By @{postInfos.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/posts/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit post
          </Link>
        </div>
      )}
      <div className="post-image">
        <img src={`http://localhost:8021/api/${postInfos.cover}`} alt="" />
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: postInfos.content }}></div>
    </div>
  );
};

export default PostPage;
