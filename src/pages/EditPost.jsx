import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../service/api";
import Editor from "./Editor";
import BackButton from "../components/BackButton";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [categories, setCategories] = useState([]);

  const categoryOptions = ["AI", "Cybersecurity", "IoT", "Space Tech", "Ethical Hacking", "Cryptography", "Software Development", "Web Development", "Programming", "Frameworks", "Databases", "Version Control"];

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((cat) => cat !== value));
    }
  };

  useEffect(() => {
    fetchPostById(id).then((postInfo) => {
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setSummary(postInfo.summary);
      setCategories(postInfo.categories || []);
    });
  }, [id]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("id", id);
    data.append("categories", JSON.stringify(categories));
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
      <BackButton />
      <h1 className="post__heading post">Edit Post</h1>
      <input type="text" className="post__input" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="summary" className="post__input" placeholder={"Summary"} value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input type="file" className="post__input" onChange={(e) => setFiles(e.target.files)} />
      <div className="category-selection">
        <h3>Select Categories (max 3)</h3>
        <div className="category-options">
          {categoryOptions.map((option) => (
            <label key={option}>
              <input type="checkbox" value={option} checked={categories.includes(option)} onChange={handleCategoryChange} disabled={categories.length >= 3 && !categories.includes(option)} />
              {option}
            </label>
          ))}
        </div>
      </div>
      <Editor onChange={setContent} value={content} />
      <button className="form__button">Update Post</button>
    </form>
  );
};

export default EditPost;
