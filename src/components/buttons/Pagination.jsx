// Reusable pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generates list of page numbers to display, including ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 2; // Number of pages to show before/after current page

    // Always include the first page
    pageNumbers.push(1);

    // Add ellipsis if there's a gap between first page & nearby pages
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

    // Add ellipsis if there's a gap before the last page
    if (currentPage < totalPages - maxVisiblePages) {
      pageNumbers.push("...");
    }

    // Always include the last page if there’s more than one
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {/* Previous button */}
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="pagination-button">
          &laquo; Prev
        </button>
      )}

      {/* Page numbers & ellipsis */}
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

      {/* Next button */}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="pagination-button">
          Next &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
