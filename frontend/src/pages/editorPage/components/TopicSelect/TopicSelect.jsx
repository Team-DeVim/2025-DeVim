import "./TopicSelect.css";

const TOPICS = [
  { value: 1, label: "자유게시판" },
  { value: 2, label: "QnA" },
  { value: 3, label: "공지사항" },
];

export default function TopicSelect({ value, onChange, disabledOptions = [] }) {
  return (
    <div className="topic-select">
      <select
        className="topic-select__control"
        value={value ?? ""}
        onChange={(e) => onChange?.(Number(e.target.value))}
      >
        <option value="" disabled>
          토픽을 선택해주세요.
        </option>
        {TOPICS.map((t) => (
          <option
            key={t.value}
            value={t.value}
            disabled={disabledOptions.includes(t.value)}
          >
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
