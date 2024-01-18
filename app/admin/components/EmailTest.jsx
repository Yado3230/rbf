import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyQuillEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = React.createRef();

  const handleImageUpload = async (file) => {
    // Replace "your_cloud_name" and "your_cloudinary_upload_preset" with your Cloudinary credentials
    const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_upload_preset");

    const response = await fetch(cloudinaryUploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // The Cloudinary URL of the uploaded image
  };

  const handleImageInserted = async (file) => {
    const imageUrl = await handleImageUpload(file);

    // Update the editor content with the Cloudinary image URL
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, "image", imageUrl);
    quill.setSelection(range.index + 1);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  useEffect(() => {
    console.log(editorHtml);
  }, [editorHtml]);

  const handleChange = (content, delta, source, editor) => {
    // Handle changes in the editor content
    setEditorHtml(content);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handleChange}
        onDrop={handleImageInserted}
        ref={quillRef}
      />
      <div>
        <h2>Editor Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div>
    </div>
  );
};

export default MyQuillEditor;
