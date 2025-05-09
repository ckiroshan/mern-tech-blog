const AdminStats = ({ stats }) => {
  const formatKey = (key) => {
    return key
      .split(/(?=[A-Z])/) // Splits string
      .join(" ")
      .replace(/\b\w/g, (char) => char.toUpperCase()); // First letter in caps
  };
  return (
    <div className="stats-container">
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
