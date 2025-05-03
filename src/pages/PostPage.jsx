import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostById } from "../service/api";
import { UserContext } from "../service/UserContext";
import EditIcon from "../components/icons/EditIcon.jsx";
import BackToTopButton from "../components/buttons/BackToTopButton";
import Loader from "../components/buttons/Loader";
import BackButton from "../components/buttons/BackButton";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPostById(id);
        setPostInfo(postData);
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  if (loading) return <Loader loading={loading} />;
  if (!postInfo) return <div className="no-results">Post not found</div>;

  const formattedDate = format(new Date(postInfo.updatedAt), "MMM d, yyyy h:mm a"); 

  return (
    <div className="post__page">
      <BackButton />
      <h1 className="post__heading post">{postInfo.title}</h1>
      <time>{formattedDate}</time>
      <div className="post__author">By @{postInfo.author.username}</div>
      {userInfo && userInfo.id === postInfo.author._id && (
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
      <BackToTopButton />
    </div>
  );
};

export default PostPage;
