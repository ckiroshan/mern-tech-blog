const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 2; // Number of pages to show around current page

    // Always show first page
    pageNumbers.push(1);

    // Show ellipsis if current page is far from start
    if (currentPage > maxVisiblePages + 1) {
      pageNumbers.push("...");
    }

    // Determine range of pages around current page
    const startPage = Math.max(2, currentPage - maxVisiblePages);
    const endPage = Math.min(totalPages - 1, currentPage + maxVisiblePages);

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    // Show ellipsis if current page is far from end
    if (currentPage < totalPages - maxVisiblePages) {
      pageNumbers.push("...");
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="pagination-button">
          &laquo; Prev
        </button>
      )}

      {getPageNumbers().map((number, index) =>
        number === "..." ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button key={number} onClick={() => onPageChange(number)} className={`pagination-button ${currentPage === number ? "active" : ""}`}>
            {number}
          </button>
        )
      )}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="pagination-button">
          Next &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
