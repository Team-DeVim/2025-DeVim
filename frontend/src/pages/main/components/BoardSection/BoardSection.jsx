import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./BoardSection.css";

function formatDate(iso, tz = "Asia/Seoul") {
  if (!iso) return "";
  const d = new Date(iso);
  const y = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, year: "numeric" }).format(d);
  const m = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, month: "2-digit" }).format(d);
  const day = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, day: "2-digit" }).format(d);
  return `${y}-${m}-${day}`;
}

export default function BoardSection({
  title = "게시판",
  data = [],
  pageSize = 4,
}) {

  const visibleItems = Array.isArray(data) ? data.slice(0, pageSize) : [];

  return (
    <section className="BoardSection" aria-label={title}>
      <div className="BoardSection__header">
        <h2 className="BoardSection__title">{title}</h2>
      </div>

      {visibleItems.length === 0 ? (
        <div className="BoardSection__empty">게시글이 없습니다.</div>
      ) : (
        <ul className="BoardSection__list">
          {visibleItems.map((item) => (
            <li key={item.boardNo}>
              <Link
                to={`/board/${item.boardNo}`}
                className="BoardSection__item BoardSection__item-link"
              >
                <div className="BoardSection__item-top">
                  <span className="BoardSection__item-title" title={item.title}>
                    {item.title}
                  </span>

                  <span className="BoardSection__item-meta">
                    <span className="BoardSection__item-author">
                      {item.writerName ?? "알수없음"}
                    </span>
                    <span className="BoardSection__item-sep">·</span>
                    <time className="BoardSection__item-date">
                      {formatDate(item.createdDt)}
                    </time>
                  </span>
                </div>

                <div className="BoardSection__item-stats">
                  <span className="BoardSection__item-stat BoardSection__item-stat--likes">
                    추천 {item.likeCount ?? 0}
                  </span>
                  <span className="BoardSection__item-stat BoardSection__item-stat--comments">
                    댓글 {item.commentCount ?? 0}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}