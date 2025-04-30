import React, { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { fetchAllPosts } from "../service/api";
import { UserContext } from "../service/UserContext";
import Loader from "../components/Loader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { searchQuery } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const postsData = await fetchAllPosts();
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = posts.filter((post) => {
          return post.title.toLowerCase().includes(lowerCaseQuery) || post.summary.toLowerCase().includes(lowerCaseQuery) || post.content.toLowerCase().includes(lowerCaseQuery) || post.author.username.toLowerCase().includes(lowerCaseQuery);
        });
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(posts);
      }
    }
  }, [searchQuery, posts, loading]);

  return <>
  {filteredPosts.length > 0 ? filteredPosts.map((post) => 
  <Post key={post._id} {...post} />) 
  : loading ? <Loader loading={loading} /> 
  : <div className="no-results">{searchQuery ? "No posts match your search." : "No posts found."}</div>}</>;
};

export default Home;
