import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, author, updatedAt, categories }) => {
  const formattedDate = format(new Date(updatedAt), "MMM d, yyyy h:mm a");

  return (
    <div className="post">
      <div className="image">
        <Link to={`/posts/${_id}`}>
          <img src={`http://localhost:8021/api/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/posts/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="summary">{summary}</p>
        <div className="categories">
          <strong>Tags:</strong>
          {categories?.map((category) => (
            <span key={category} className="category-tag">
              {category}
            </span>
          ))}
        </div>
        <p className="info">
          <a className="author">- {author.username}</a>
          <time>Last updated on: {formattedDate}</time>
          <time>{formattedDate}</time>
        </p>
      </div>
    </div>
  );
};

export default Post;
