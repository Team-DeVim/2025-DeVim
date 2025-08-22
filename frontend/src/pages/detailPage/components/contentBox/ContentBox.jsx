import React, { useState } from "react";
import "./ContentBox.css";

export default function ContentBox({ data }) {
  // 받은 상세글 정보 변수화
  console.log(data);
  const boardNo = data.boardNo;
  const boardTypeNo = data.boardTypeNo;
  const title = data.title;
  const boardContent = data.boardContent;
  const writerName = data.writerName;
  const createdDt = data.createdDt;
  const deleteFlag = data.deleteFlag;
  const likeCount = data.likeCount;

  const [liked, setLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(postData.likeCount ?? 0);

  const handleToggleLike = () => {
    setLiked((v) => !v);
    // setLikeCount((c) => (liked ? Math.max(0, c - 1) : c + 1));
  };

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

  return (
    <section className="contentBox">
      {/* 상단 */}
      <div className="contentBox__top">
        <div className="contentBox__profile">
          <div className="contentBox__avatar" />
          <div className="contentBox__nameTime">
            <div className="contentBox__name">
              {writerName ?? "알 수 없음"}
            </div>
            <div className="contentBox__time">{formatTimeAgo(createdDt)}</div>
          </div>
        </div>

        <div className="contentBox__actions">
          {/* (나중에 본인일 때만 노출) */}
          <button type="button" className="contentBox__action">
            삭제하기
          </button>
          <span className="contentBox__sep">|</span>
          <button type="button" className="contentBox__action">
            수정하기
          </button>
        </div>
      </div>

      {/* 제목 */}
      <h2 className="contentBox__title" title={title}>
        {title}
      </h2>

      {/* 본문 */}
      <article className="contentBox__body" aria-label="게시글 본문">
        {boardContent.split("\n").map((line, i) => (
          <p key={i} className="contentBox__p">
            {line || "\u00A0"}
          </p>
        ))}
      </article>

      {/* 하단: 태그(좌) · 동그란 좋아요(가운데) · 기타 메타(우) */}
      <div className="contentBox__tagsRow">
        <div className="contentBox__tags">
          {/* {(post.tags || []).map((t) => (
            <span key={t} className="contentBox__tag">
              #{t}
            </span>
          ))} */}
        </div>

        <div className="contentBox__likeWrap">
          <button
            type="button"
            className={`contentBox__likeCircle ${liked ? "is-liked" : ""}`}
            aria-pressed={liked ? "true" : "false"}
            onClick={handleToggleLike}
            aria-label="좋아요"
            title="좋아요"
          >
            <span className="contentBox__likeIcon">❤</span>
          </button>
          <div className="contentBox__likeNum">{likeCount}</div>
        </div>

        <div className="contentBox__metaRight">
          <span className="contentBox__comment">
            댓글 {data.commentCount ?? 0}
          </span>
        </div>
      </div>
    </section>
  );
}
