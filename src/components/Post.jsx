import { format } from "date-fns";

const Post = ({ title, summary, content, cover, author, updatedAt }) => {
  const formattedDate = format(new Date(updatedAt), "MMM d, yyyy HH:mm");

  return (
    <div className="post">
      <div className="image">
        <img src="./public/post.jpg" alt="" />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formattedDate}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
