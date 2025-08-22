import "./TitleInput.css";

export default function TitleInput({ value, onChange }) {
  return (
    <div className="title-input">
      <input
        className="title-input__control"
        type="text"
        placeholder="제목을 입력해주세요."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
