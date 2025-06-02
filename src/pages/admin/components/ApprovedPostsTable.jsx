import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AdminTable from "./AdminTable";
import { MdDone, MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

// Table for displaying approved posts in the Admin Dashboard
const ApprovedPostsTable = ({ posts, onApprove, onDelete }) => {
  return (
    <AdminTable title="Approved Posts" count={posts.length} headers={["Title", "Status", "Author", "Created", "Last Updated", "Actions"]} emptyMessage="No posts found" columns={6}>
      {posts.map((post) => (
        <tr key={post._id}>
          {/* Post title with link */}
          <td className="full-column"></td>
          <td>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </td>
          {/* Approval status badge */}
          <td>
            <span className={`status-badge ${post.isApproved ? "approved" : "pending"}`}>{post.isApproved ? "Approved" : "Pending"}</span>
          </td>
          {/* Author name */}
          <td>{post.author?.username || "Unknown"}</td>
          {/* Creation & last updated dates */}
          <td className="full-column">{format(new Date(post.createdAt), "MMM d, yyyy")}</td>
          <td className="full-column">{format(new Date(post.updatedAt), "MMM d, yyyy")}</td>
          {/* Action buttons: Approve, Edit, Delete */}
          <td className="actions">
            {!post.isApproved && (
              <button className="approve-btn" onClick={() => onApprove(post._id)}>
                Approve
              </button>
            )}
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

export default ApprovedPostsTable;
