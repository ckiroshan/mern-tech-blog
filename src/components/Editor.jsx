import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Configuration for toolbar buttons & features
const modules = {
  toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image"], ["clean"]],
};

// Allowed formats in the editor
const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

// Reusable rich text editor component
const Editor = ({ value, onChange }) => {
  return (
    <div className="content">
      <ReactQuill value={value} theme="snow" onChange={onChange} modules={modules} />
    </div>
  );
};

export default Editor;
