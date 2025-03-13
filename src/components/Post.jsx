const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img src="./public/post.jpg" alt="" />
      </div>
      <div className="texts">
        <h2>WhatsApp now has more than 3 billion users a month</h2>
        <p className="info">
          <a className="author">David Paszko</a>
          <time>2025-04-01 7:17 AM</time>
        </p>
        <p className="summary">
          Founded in 2009 and acquired by Facebook for $19 billion in 2014, WhatsApp remains free to use and doesn’t serve any ads. The app reached the 2 billion monthly active user mark back in 2020, but... <strong>see more</strong>
        </p>
      </div>
    </div>
  );
};

export default Post;
