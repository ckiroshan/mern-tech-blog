const AdminStats = ({ stats }) => {
  return (
    <div className="stats-container">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="stat-card">
          <h3>{key.split(/(?=[A-Z])/).join(" ")}</h3>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
