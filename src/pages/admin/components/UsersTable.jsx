import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AdminTable from "./AdminTable";

const UsersTable = ({ users, formattedDate, onDelete }) => {
  return (
    <AdminTable title="User Management" count={users.length} headers={["Joined", "Full Name", "Username", "Email", "Posts", "Actions"]} emptyMessage="No users found" columns={6}>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{format(new Date(user.createdAt), "MMM d, yyyy | h:mm a")}</td>
          <td>{`${user.firstName} ${user.lastName}`}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.postCount || 0}</td>
          <td className="actions">
            <button>
              <Link className="edit-btn" to={`/admin/users/edit/${user._id}`} onClick={(e) => e.stopPropagation()}>
                Edit
              </Link>
            </button>
            <button className="delete-btn" onClick={() => onDelete(user._id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default UsersTable;
