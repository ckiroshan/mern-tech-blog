import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Back Button component to go back
const BackButton = () => {
  const navigate = useNavigate(); // Hook to access navigation

  return (
    <button
      onClick={() => navigate(-1)} // Go back to previous page
      className="form__button back__button"
    >
      <FaArrowLeft /> {/* Back icon */}
      Go Back
    </button>
  );
};

export default BackButton;
