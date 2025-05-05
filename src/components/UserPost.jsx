import { Link } from "react-router-dom";
import { format } from "date-fns";

const UserPost = ({ post }) => {
  return (
    <div className="user-post">
      <div className="post-header">
        <h3 className="post-title">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h3>
        <time className="post-date">{format(new Date(post.updatedAt), "MMM d, yyyy | h:mm a")}</time>
      </div>
      <div className="post-content-preview">{post.summary || "No summary available"}</div>
      <div className="post-footer">
        <span className="post-categories">
          Tags:
          {post.categories?.map((category) => (
            <span key={category} className="category-tag">
              {category}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default UserPost;
