// Reusable Table component for Admin-dashboard
const AdminTable = ({ title, count, headers, children, emptyMessage, columns }) => {
  return (
    <section className="admin-section">
      {/* Section title with item count */}
      <h2>{title} ({count})</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {/* Render column headers */}
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Show table rows if data exists, else show empty message */}
            {count > 0 ? (
              children
            ) : (
              <tr>
                <td colSpan={columns} className="no-posts">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminTable;
