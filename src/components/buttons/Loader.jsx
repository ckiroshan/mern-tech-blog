import { PulseLoader } from "react-spinners";
import { FaNewspaper, FaCoffee } from "react-icons/fa";
import "./Loader.css";

// Loader component to display while content is being fetched
const Loader = ({ loading }) => (
  <div className="posts-loader">
    <div className="loading-content">
      {/* Loading icons */}
      <div className="loading-icon">
        <FaNewspaper className="newspaper-icon" />
        <FaCoffee className="coffee-icon" />
      </div>
      {/* Animated spinner */}
      <PulseLoader color="#3b82f6" loading={loading} size={15} margin={6} />
      {/* Loading content messages */}
      <p className="loading-text">Curating fresh content...</p>
      <p className="loading-subtext">Why not grab a coffee while you wait?</p>
    </div>
  </div>
);

export default Loader;
