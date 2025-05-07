import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AdminTable from "./AdminTable";

const PendingPostsTable = ({ posts, onApprove, onDelete }) => {
  return (
    <AdminTable title="Posts Awaiting Approval" count={posts.length} headers={["Title", "Status", "Author", "Last Date", "Actions"]} emptyMessage="No posts pending approval" columns={5}>
      {posts.map((post) => (
        <tr key={post._id}>
          <td>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </td>
          <td>
            <span className={`status-badge ${post.isApproved ? "approved" : "pending"}`}>{post.isApproved ? "Approved" : "Pending"}</span>
          </td>
          <td>{post.author?.username || "Unknown"}</td>
          <td>{format(new Date(post.updatedAt), "MMM d, yyyy | h:mm a")}</td>
          <td className="actions">
            <button className="approve-btn" onClick={() => onApprove(post._id)}>
              Approve
            </button>
            <button>
              <Link className="edit-btn" to={`/posts/edit/${post._id}`} onClick={(e) => e.stopPropagation()}>
                Edit
              </Link>
            </button>
            <button className="delete-btn" onClick={() => onDelete(post._id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default PendingPostsTable;
