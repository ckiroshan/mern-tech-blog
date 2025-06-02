import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AdminTable from "./AdminTable";
import { MdDone, MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

// Displays a table of all registered users with management options
const UsersTable = ({ users, onDelete }) => {
  return (
    <AdminTable title="User Management" count={users.length} 
    headers={["Joined", "Full Name", "Username", "Email", "Posts", "Actions"]} emptyMessage="No users found" 
    columns={6}>
      {users.map((user) => (
        <tr key={user._id}>
          {/* Join date format based on screen width for better mobile experience */}
          <td className="full-column">
            {window.innerWidth < 800 
            ? format(new Date(user.createdAt), "MMM d, yyyy") 
            : format(new Date(user.createdAt), "MMM d, yyyy | h:mm a")}
          </td>
          {/* User's full name */}
          <td className="full-column">{`${user.firstName} ${user.lastName}`}</td>
          {/* Username */}
          <td>{user.username}</td>
          {/* Email */}
          <td>{user.email}</td>
          {/* Total posts authored by the user */}
          <td>{user.postCount || 0}</td>
          {/* Action buttons: Edit & Delete */}
          <td className="actions">
            <button className="edit-btn">
              <Link to={`/admin/users/edit/${user._id}`} onClick={(e) => e.stopPropagation()}>
                <FiEdit />
              </Link>
            </button>
            <button className="delete-btn" onClick={() => onDelete(user._id)}>
              <MdDelete />
            </button>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default UsersTable;
