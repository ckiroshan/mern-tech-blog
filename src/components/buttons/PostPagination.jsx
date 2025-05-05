const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="post-pagination-controls">
      <button onClick={handlePrev} disabled={currentPage === 0} className="post-pagination-button" aria-label="Previous page">
        ←
      </button>
      <button onClick={handleNext} disabled={currentPage === totalPages - 1 || totalPages <= 1} className="post-pagination-button" aria-label="Next page">
        →
      </button>
    </div>
  );
};

export default PaginationControls;
