import { format } from "date-fns";
import { Link } from "react-router-dom";

// Post component to display a single blog post in Home feed
const Post = ({ _id, title, summary, content, cover, author, updatedAt, categories }) => {
  // Date Format for the last update
  const formattedDate = format(new Date(updatedAt), "MMM d, yyyy h:mm a");

  return (
    <div className="post">
      {/* Post image with link to full post */}
      <div className="image">
        <Link to={`/posts/${_id}`}>
          <img src={cover} alt="" />
        </Link>
      </div>

      {/* Post text content */}
      <div className="texts">
        <Link to={`/posts/${_id}`}>
          <h2>{title}</h2>
        </Link>
        {/* Short summary */}
        <p className="summary">{summary}</p>
        {/* Category tags */}
        <div className="categories">
          <strong>Tags:</strong>
          {categories?.map((category) => (
            <span key={category} className="category__tag">
              {category}
            </span>
          ))}
        </div>
        {/* Author & last update time */}
        <p className="info">
          <a className="author">- @{author.username}</a>
          <time>Last updated on: {formattedDate}</time>
          <time>{formattedDate}</time>
        </p>
      </div>
    </div>
  );
};

export default Post;
