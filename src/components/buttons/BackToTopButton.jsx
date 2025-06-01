import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

// Reusable Back-To-Top component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false); // Tracks visibility of the button

  useEffect(() => {
    // Show button when page is scrolled more than 300px
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", toggleVisibility);
    // Remove scroll event listener
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Display's button to scroll up
    <button className={`back-to-top ${isVisible ? "visible" : ""}`} onClick={scrollToTop} aria-label="Back to top">
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;
