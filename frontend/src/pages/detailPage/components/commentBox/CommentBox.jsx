import React, { useState } from "react";
import "./CommentBox.css";

/** ===== 댓글 작성 컴포저 (이미지 UI 99%) ===== */
function CommentComposer({ isLoggedIn = false, onSubmit }) {
  const [value, setValue] = useState("");
  const disabled = !isLoggedIn || value.trim().length === 0;

  const submit = () => {
    if (disabled) return;
    onSubmit?.(value.trim());
    setValue("");
  };

  return (
    <div className="commentComposer">
      <div className="commentComposer__avatar" aria-hidden />

      <div className="commentComposer__editor">
        {isLoggedIn ? (
          <textarea
            className="commentComposer__textarea"
            placeholder="댓글을 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
          />
        ) : (
          <div className="commentComposer__loginGate">
            <span>
              작성하려면 <a className="commentComposer__loginLink" href="/SignUp">로그인</a>이 필요합니다.
            </span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="commentComposer__submit"
        disabled={disabled}
        onClick={submit}
      >
        작성
      </button>
    </div>
  );
}

/** ===== 목록(Mock) =====*/
const MOCK_COMMENTS = [
  { id: 1, writer: { name: "사용자 닉네임" }, timeAgo: "방금 전", content: "댓글 내용", likeCount: 0 },
  { id: 2, writer: { name: "사용자 닉네임" }, timeAgo: "2분 전", content: "댓글 내용", likeCount: 0 },
  { id: 3, writer: { name: "사용자 닉네임" }, timeAgo: "5분 전", content: "댓글 내용", likeCount: 0 },
];

function CommentItem({ item }) {
  return (
    <li className="commentBox__item">
      <div className="commentBox__head">
        <div className="commentBox__profile">
          <div className="commentBox__avatar" />
          <div className="commentBox__nameTime">
            <div className="commentBox__name">{item.writer?.name ?? "알 수 없음"}</div>
            <div className="commentBox__time">{item.timeAgo ?? ""}</div>
          </div>
        </div>
        <div className="commentBox__actions">
          <button type="button" className="commentBox__action">삭제하기</button>
          <span className="commentBox__sep">|</span>
          <button type="button" className="commentBox__action">수정하기</button>
        </div>
      </div>

      <div className="commentBox__body">{item.content}</div>

      <div className="commentBox__tail">
        <span className="commentBox__like">좋아요: {item.likeCount ?? 0}</span>
      </div>
    </li>
  );
}

export default function CommentBox({
  comments = MOCK_COMMENTS,
  isLoggedIn = false, 
}) {
  const [items, setItems] = useState(comments);

  const handleAdd = (text) => {
    const newItem = {
      id: Date.now(),
      writer: { name: "현재 사용자" },
      timeAgo: "방금 전",
      content: text,
      likeCount: 0,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <section className="commentBox">
      {/* 상단: 댓글 작성 창 */}
      <CommentComposer isLoggedIn={isLoggedIn} onSubmit={handleAdd} />

      {/* 리스트 */}
      <ul className="commentBox__list">
        {items.map((c) => <CommentItem key={c.id} item={c} />)}
      </ul>
    </section>
  );
}
