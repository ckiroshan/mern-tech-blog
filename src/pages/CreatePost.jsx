import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <form>
      <input type="text" placeholder={"Title"} />
      <input type="summary" placeholder={"Summary"} />
      <input type="file" />
      <ReactQuill />
      <button className="btn-post">Create Post</button>
    </form>
  );
};

export default CreatePost;
