import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

// Pagination control component with previous/next buttons
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  // Navigate to previous page
  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  // Navigate to next page
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="post-pagination-controls">
      {/* Previous Page Button */}
      <button onClick={handlePrev} disabled={currentPage === 0} className="post-pagination-button" aria-label="Previous page">
        <FaChevronCircleLeft />
      </button>
      {/* Next Page Button */}
      <button onClick={handleNext} disabled={currentPage === totalPages - 1 || totalPages <= 1} className="post-pagination-button" aria-label="Next page">
        <FaChevronCircleRight />
      </button>
    </div>
  );
};

export default PaginationControls;
