// src/pages/editorPage/components/Editor/Editor.jsx
import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./Editor.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
];

export default function Editor({
  defaultValue = "",
  onChange,
  onSubmit,
  onCancel,
  canSubmit = true,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (html) => {
    setValue(html);
    onChange?.(html);
  };

  return (
    <div className="editor">
      {/* 에디터 본문 */}
      <div className="editor__inner">
        <ReactQuill
          className="editor__quill"
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder=""
        />
      </div>

      <div className="editor__actions-bar">
        <button
          type="button"
          className="editor__btn editor__btn--cancel"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          type="button"
          className="editor__btn editor__btn--primary"
          onClick={onSubmit}
          disabled={!canSubmit}
        >
          등록
        </button>
      </div>
    </div>
  );
}
