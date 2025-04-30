import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostById } from "../service/api";
import { UserContext } from "../service/UserContext";
import EditIcon from "../components/icons/EditIcon.jsx";

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
    <div className="post__page">
      <h1 className="post__heading">{postInfo.title}</h1>
      <time>{formattedDate}</time>
      <div className="post__author">By @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/posts/edit/${postInfo._id}`}>
            <EditIcon />
            Edit post
          </Link>
        </div>
      )}
      <div className="post__image">
        <img src={`http://localhost:8021/api/${postInfos.cover}`} alt="" />
      </div>
      <div className="post__content" dangerouslySetInnerHTML={{ __html: postInfos.content }}></div>
    </div>
  );
};

export default PostPage;
