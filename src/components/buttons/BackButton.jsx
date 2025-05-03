import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Go back to previous page
      className="form__button back__button"
    >
      <FaArrowLeft />
      Go Back
    </button>
  );
};

export default BackButton;
