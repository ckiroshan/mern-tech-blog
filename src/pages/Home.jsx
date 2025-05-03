import React, { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { fetchAllPosts } from "../service/api";
import { UserContext } from "../service/UserContext";
import BackToTopButton from "../components/buttons/BackToTopButton";
import Loader from "../components/Loader";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { searchQuery } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const postsData = await fetchAllPosts(selectedCategory);
        setPosts(postsData);

        // Apply filters immediately after loading
        let filtered = [...postsData];
        if (searchQuery) {
          const lowerCaseQuery = searchQuery.toLowerCase();
          filtered = filtered.filter((post) => post.title.toLowerCase().includes(lowerCaseQuery) || post.summary.toLowerCase().includes(lowerCaseQuery) || post.content.toLowerCase().includes(lowerCaseQuery) || post.author.username.toLowerCase().includes(lowerCaseQuery));
        }
        setFilteredPosts(filtered);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      {loading ? <Loader loading={loading} /> : filteredPosts.length > 0 ? filteredPosts.map((post) => <Post key={post._id} {...post} />) : <div className="no-results">{searchQuery ? "No posts match your search." : "No posts found."}</div>} <BackToTopButton />
    </>
  );
};

export default Home;
