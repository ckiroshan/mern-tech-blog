import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { fetchAllPosts } from "../service/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchAllPosts().then((posts) => setPosts(posts));
  }, []);
  
  return <>{posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}</>;
};

export default Home;
