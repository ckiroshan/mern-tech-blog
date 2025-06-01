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
  // Use-State variables
  const [postInfo, setPostInfo] = useState(null); // Holds post data
  const [loading, setLoading] = useState(true); // Track loading state
  // Logged-in user context
  const { userInfo } = useContext(UserContext);
  // Get post ID from URL
  const { id } = useParams(); 

  // Fetch post data on component mount or when ID changes
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

  // Show loader while fetching data
  if (loading) return <Loader loading={loading} />;
  // Handle post not found
  if (!postInfo) return <div className="no-results">Post not found</div>;

  // Date Format for post's updatedAt attribute
  const formattedDate = format(new Date(postInfo.updatedAt), "MMM d, yyyy h:mm a"); 

  return (
    <div className="post__page">
      <BackButton />
      {/* Post title */}
      <h1 className="post__heading post">{postInfo.title}</h1>
      {/* Timestamp & author */}
      <time>Last updated on: {formattedDate}</time>
      <div className="post__author">By @{postInfo.author.username}</div>

      {/* Show edit option if current user is the author */}
      {userInfo && userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/posts/edit/${postInfo._id}`}>
            <EditIcon />
            Edit post
          </Link>
        </div>
      )}

      {/* Post image */}
      <div className="post__image">
        <img src={postInfos.cover} alt="" />
      </div>
      {/* Post content (rendered as raw HTML) */}
      <div className="post__content" dangerouslySetInnerHTML={{ __html: postInfos.content }}></div>
      <BackToTopButton />
    </div>
  );
};

export default PostPage;
