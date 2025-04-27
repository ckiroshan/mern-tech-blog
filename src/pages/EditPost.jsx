import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../service/api";
import Editor from "./Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchPostById(id).then((postInfo) => {
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setSummary(postInfo.summary);
    });
  }, [id]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("id", id);
    if (files?.[0]) {
      data.append("file", files?.[0]);
    }
    console.log(files);
    const response = await updatePost(data);
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) return <Navigate to={`/posts/${id}`} />;
  return (
    <form onSubmit={handleFormSubmit} className="post__form">
      Add commentMore actions
      <input type="text" className="post__input" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="summary" className="post__input" placeholder={"Summary"} value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input type="file" className="post__input" onChange={(e) => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button className="form__button">Update Post</button>
    </form>
  );
};

export default EditPost;
