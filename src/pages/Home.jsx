import React, { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { fetchAllPosts } from "../service/api";
import { UserContext } from "../service/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { searchQuery } = useContext(UserContext);

  useEffect(() => {
    fetchAllPosts().then((posts) => {
      setPosts(posts);
      setFilteredPosts(posts);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = posts.filter((post) => {
        return post.title.toLowerCase().includes(lowerCaseQuery) || post.summary.toLowerCase().includes(lowerCaseQuery) || post.content.toLowerCase().includes(lowerCaseQuery) || post.author.username.toLowerCase().includes(lowerCaseQuery);
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  return <>{filteredPosts.length > 0 ? filteredPosts.map((post) => <Post key={post._id} {...post} />) : <div className="no-results">No posts match your search.</div>}</>;
};

export default Home;
