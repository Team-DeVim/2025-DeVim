import React, { useState } from "react";
import "./ContentBox.css";

/** mock post (연동 시 삭제) */
const MOCK_POST = {
  title: "게시글 제목",
  writer: { name: "사용자 닉네임" },
  timeAgo: "8분 전",
  body: `내용
-
-`,
  likeCount: 7,
  commentCount: 3,
  tags: ["태그1", "태그2", "태그3"],
};

export default function ContentBox({ post = MOCK_POST }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount ?? 0);

  const handleToggleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? Math.max(0, c - 1) : c + 1));
  };

  return (
    <section className="contentBox">
      {/* 상단 */}
      <div className="contentBox__top">
        <div className="contentBox__profile">
          <div className="contentBox__avatar" />
          <div className="contentBox__nameTime">
            <div className="contentBox__name">
              {post.writer?.name ?? "알 수 없음"}
            </div>
            <div className="contentBox__time">{post.timeAgo ?? ""}</div>
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
      <h2 className="contentBox__title" title={post.title}>
        {post.title}
      </h2>

      {/* 본문 */}
      <article className="contentBox__body" aria-label="게시글 본문">
        {post.body.split("\n").map((line, i) => (
          <p key={i} className="contentBox__p">
            {line || "\u00A0"}
          </p>
        ))}
      </article>

      {/* 하단: 태그(좌) · 동그란 좋아요(가운데) · 기타 메타(우) */}
      <div className="contentBox__tagsRow">
        <div className="contentBox__tags">
          {(post.tags || []).map((t) => (
            <span key={t} className="contentBox__tag">
              #{t}
            </span>
          ))}
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
            댓글 {post.commentCount ?? 0}
          </span>
        </div>
      </div>
    </section>
  );
}
