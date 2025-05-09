import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MdDone } from "react-icons/md";

const UserPost = ({ post }) => {
  return (
    <div className="user__post">
      <div className="post__header">
        <h3 className="post__title">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h3>
        <time className="post__date">{format(new Date(post.updatedAt), "MMM d, yyyy | h:mm a")}</time>
      </div>
      <div className="post__content__preview">{post.summary || "No summary available"}</div>
      <div className="post__footer">
        <span className="post__categories">
          Tags:
          {post.categories?.map((category) => (
            <span key={category} className="category__tag">
              {category}
            </span>
          ))}
        </span>
        <span className="post__status-group">
          <span className={`approval-status ${post.isApproved ? "approved" : "pending"}`} data-tooltip={post.isApproved ? "This post is publicly visible" : "Waiting for admin approval"}>
            {post.isApproved ? (
              <>
                <MdDone className="status-icon" />
                <span>Approved</span>
              </>
            ) : (
              <span>Pending Approval</span>
            )}
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserPost;
