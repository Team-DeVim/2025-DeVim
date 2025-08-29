import React, { useState } from "react";
import "./CommentBox.css";
import { createComment } from "../../../../api/DevimApi";

/** ===== 댓글 작성 컴포저 (이미지 UI 99%) ===== */
function CommentComposer({ isLogin = false, boardNo }) {
  const [value, setValue] = useState("");
  const disabled = !isLogin || value.trim().length === 0;
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (disabled) return;
    if (!value.trim()) return alert("댓글 내용을 입력하세요.");
    setLoading(true);
    try {
      await createComment(boardNo, value);
      setValue("");
      window.location.reload();
    } catch (e) {
      alert("댓글 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="commentComposer">
      <div className="commentComposer__avatar" aria-hidden />

      <div className="commentComposer__editor">
        {isLogin ? (
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

// 시간 포메터
const formatTimeAgo = (iso) => {
  if (!iso) return "알수없음";
  const created = new Date(iso);
  const now = new Date();
  const diffMs = now - created;
  if (Number.isNaN(diffMs)) return "";
  const min = Math.floor(diffMs / (1000 * 60) - 60 * 9);
  if (min < 1) return "방금 전";
  if (min < 60) return `${min}분 전`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}시간 전`;
  const day = Math.floor(hour / 24);
  return `${day}일 전`;
};

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
            <div className="commentBox__name">{item.writerName ?? "알 수 없음"}</div>
            <div className="commentBox__time">{formatTimeAgo(item.createdDt) ?? ""}</div>
          </div>
        </div>
        <div className="commentBox__actions">
          <button type="button" className="commentBox__action">삭제하기</button>
          <span className="commentBox__sep">|</span>
          <button type="button" className="commentBox__action">수정하기</button>
        </div>
      </div>

      <div className="commentBox__body">{item.commentContent}</div>

      <div className="commentBox__tail">
        <span className="commentBox__like">좋아요: {item.likeCount ?? 0}</span>
      </div>
    </li>
  );
}



export default function CommentBox({
  data,
  isLogin = false,
  boardNo
}) {
  // const [items, setItems] = useState(comments);

  // const handleAdd = (text) => {
  //   const newItem = {
  //     id: Date.now(),
  //     writer: { name: "현재 사용자" },
  //     timeAgo: "방금 전",
  //     content: text,
  //     likeCount: 0,
  //   };
  //   setItems((prev) => [newItem, ...prev]);
  // };



  return (
    <section className="commentBox">
      {/* 상단: 댓글 작성 창 */}
      <CommentComposer isLogin={isLogin} boardNo={boardNo} />

      {/* 리스트 */}
      <ul className="commentBox__list">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((c) => <CommentItem key={c.commentNo} item={c} />)
        ) : (
          <li className="commentBox__empty">댓글이 없습니다.</li>
        )}
      </ul>
    </section>
  );
}
