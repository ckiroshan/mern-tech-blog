import { useState } from "react";
import { Navigate } from "react-router-dom";
import { addPost } from "../service/api";
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";

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
    <form onSubmit={handleFormSubmit} className="post__form">
      Add commentMore actions
      <input type="text" className="post__input" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="summary" className="post__input" placeholder={"Summary"} value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input type="file" className="post__input" onChange={(e) => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button className="form__button">Create Post</button>
    </form>
  );
};

export default CreatePost;
