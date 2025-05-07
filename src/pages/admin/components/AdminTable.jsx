import React from "react";

const AdminTable = ({ title, count, headers, children, emptyMessage, columns }) => {
  return (
    <section className="admin-section">
      <h2>
        {title} ({count})
      </h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
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
