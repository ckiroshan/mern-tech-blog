import { PulseLoader } from "react-spinners";
import { FaNewspaper, FaCoffee } from "react-icons/fa";
import "./Loader.css";

const Loader = ({ loading }) => (
  <div className="posts-loader">
    <div className="loading-content">
      <div className="loading-icon">
        <FaNewspaper className="newspaper-icon" />
        <FaCoffee className="coffee-icon" />
      </div>
      <PulseLoader color="#3b82f6" loading={loading} size={15} margin={6} />
      <p className="loading-text">Curating fresh content...</p>
      <p className="loading-subtext">Why not grab a coffee while you wait?</p>
    </div>
  </div>
);

export default Loader;
