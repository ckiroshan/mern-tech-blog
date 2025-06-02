// Reusable Stats component for Admin-dashboard
const AdminStats = ({ stats }) => {
  // Format camelCase keys into readable text
  const formatKey = (key) => {
    return key
      .split(/(?=[A-Z])/) // Split at capital letters
      .join(" ")
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
  };
  return (
    <div className="stats-container">
      {/* Loop through each stat & display */}
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="stat-card">
          <h3>{formatKey(key)}</h3>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
