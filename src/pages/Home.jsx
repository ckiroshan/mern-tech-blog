import React, { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { fetchAllPosts } from "../service/api";
import { UserContext } from "../service/UserContext";
import BackToTopButton from "../components/buttons/BackToTopButton";
import Loader from "../components/buttons/Loader";
import CategoryFilter from "../components/buttons/CategoryFilter";
import Pagination from "../components/buttons/Pagination";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { searchQuery } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { posts: postsData, totalPages } = await fetchAllPosts(selectedCategory, currentPage);
        setPosts(postsData);
        setTotalPages(totalPages);

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
  }, [selectedCategory, searchQuery, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      {loading ? (
        <Loader loading={loading} />
      ) : filteredPosts.length > 0 ? (
        <>
          {filteredPosts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="no-results">{searchQuery ? "No posts match your search." : "No posts found."}</div>
      )}
      <BackToTopButton />
    </>
  );
};

export default Home;
