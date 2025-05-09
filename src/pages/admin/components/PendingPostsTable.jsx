import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AdminTable from "./AdminTable";
import { MdDone, MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const PendingPostsTable = ({ posts, onApprove, onDelete }) => {
  return (
    <AdminTable title="Posts Pending" count={posts.length} headers={["Title", "Status", "Author", "Last Date", "Actions"]} emptyMessage="No posts pending approval" columns={5}>
      {posts.map((post) => (
        <tr key={post._id}>
          <td className="full-column">
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </td>
          <td>
            <span className={`status-badge ${post.isApproved ? "approved" : "pending"}`}>{post.isApproved ? "Approved" : "Pending"}</span>
          </td>
          <td>{post.author?.username || "Unknown"}</td>
          <td className="full-column">{format(new Date(post.updatedAt), "MMM d, yyyy | h:mm a")}</td>
          <td className="actions">
            <button className="approve-btn" onClick={() => onApprove(post._id)}>
              <MdDone />
            </button>
            <button className="edit-btn">
              <Link to={`/posts/edit/${post._id}`} onClick={(e) => e.stopPropagation()}>
                <FiEdit />
              </Link>
            </button>
            <button className="delete-btn" onClick={() => onDelete(post._id)}>
              <MdDelete />
            </button>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default PendingPostsTable;
