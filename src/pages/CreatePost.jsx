import { useState } from "react";
import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom";
import { addPost } from "../service/api";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image"], ["clean"]],
};
const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function handleFormSubmit(e) {
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("file", files[0]);
    e.preventDefault();
    console.log(files);
    const response = await addPost(data);
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) return <Navigate to={"/"} />;
  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="summary" placeholder={"Summary"} value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill value={content} modules={modules} formats={formats} onChange={(newValue) => setContent(newValue)} />
      <button className="btn-post">Create Post</button>
    </form>
  );
};

export default CreatePost;
