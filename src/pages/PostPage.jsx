import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../service/api";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
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
      <div className="post-image">
        <img src={`http://localhost:8021/api/${postInfos.cover}`} alt="" />
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: postInfos.content }}></div>
    </div>
  );
};

export default PostPage;
