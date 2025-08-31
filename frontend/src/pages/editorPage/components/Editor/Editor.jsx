import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Quill 기본 스킨
import "./Editor.css"; // 🔥 상대 경로로 CSS 불러오기

export default function Editor({
  value,
  onChange,
  onSubmit,
  onCancel,
  canSubmit = true,
  initialValue,
}) {
  const isControlled = typeof value !== "undefined";
  const [localValue, setLocalValue] = useState(initialValue ?? "");

  useEffect(() => {
    if (!isControlled && typeof initialValue !== "undefined") {
      setLocalValue(initialValue ?? "");
    }
  }, [isControlled, initialValue]);

  const editorValue = isControlled ? value ?? "" : localValue;

  const handleChange = (v) => {
    if (!isControlled) setLocalValue(v);
    onChange?.(v);
  };

  const handleSubmit = () => {
    const submitValue = isControlled ? value ?? "" : localValue;
    if (onSubmit?.length > 0) {
      onSubmit(submitValue);
    } else {
      onSubmit?.();
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className="editor">
      <div className="editor__inner">
        <ReactQuill
          className="editor__quill"
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          theme="snow"
        />
      </div>
      <div className="editor__actions-bar">
        <button type="button" className="editor__btn" onClick={onCancel}>
          취소
        </button>
        <button
          type="button"
          className="editor__btn editor__btn--primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          저장
        </button>
      </div>
    </div>
  );
}
