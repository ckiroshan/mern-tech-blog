import React, { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { fetchAllPosts } from "../service/api";
import { UserContext } from "../service/UserContext";
import BackToTopButton from "../components/buttons/BackToTopButton";
import Loader from "../components/buttons/Loader";
import CategoryFilter from "../components/buttons/CategoryFilter";
import Pagination from "../components/buttons/Pagination";

const Home = () => {
  // Use-State variables: posts, filteredPosts, loading status
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Use-State variables: selectedCategory, currentPage, totalPages for Filters & pagination
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Context for shared search query
  const { searchQuery } = useContext(UserContext);

  // Load posts when category, search query, or page changes
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch posts based on category & page
        const { posts: postsData, totalPages } = await fetchAllPosts(selectedCategory, currentPage);
        setPosts(postsData);
        setTotalPages(totalPages);

        // Filter posts based on search query
        let filtered = [...postsData];
        if (searchQuery) {
          const lowerCaseQuery = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (post) =>
              post.title.toLowerCase().includes(lowerCaseQuery) ||
              post.summary.toLowerCase().includes(lowerCaseQuery) ||
              post.content.toLowerCase().includes(lowerCaseQuery) ||
              post.author.username.toLowerCase().includes(lowerCaseQuery)
          );
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

  // Handle pagination click
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Category filter UI */}
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      
      {/* Show loader while fetching */}
      {loading ? (
        <Loader loading={loading} />
      ) : filteredPosts.length > 0 ? (
        <>
          {/* Render posts */}
          {filteredPosts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
          {/* Pagination controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        // Message when no posts match
        <div className="no-results">
          {searchQuery ? "No posts match your search." : "No posts found."}
        </div>
      )}
      {/* Scroll to top button */}
      <BackToTopButton />
    </>
  );
};

export default Home;
