import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./BoardSection.css";

const MOCK_PAYLOAD = {
  popular: [
    {
      boardNo: 202,
      boardTypeNo: 2,
      title: "JPA 지연로딩 N+1 해결",
      createdAt: "2025-08-08T15:30:00Z",
      likeCount: 55,
      writer: { userNo: 3, name: "미래" },
      commentCount: 2,
    },
    {
      boardNo: 101,
      boardTypeNo: 1,
      title: "React 19 마이그레이션 정리",
      createdAt: "2025-08-10T12:20:00Z",
      likeCount: 42,
      writer: { userNo: 2, name: "준" },
      commentCount: 2,
    },
    {
      boardNo: 201,
      boardTypeNo: 2,
      title: "Spring Security 토큰 만료?",
      createdAt: "2025-08-09T07:10:00Z",
      likeCount: 36,
      writer: { userNo: 2, name: "준" },
      commentCount: 2,
    },
    {
      boardNo: 103,
      boardTypeNo: 1,
      title: "Oracle 커넥션 풀 튜닝 팁",
      createdAt: "2025-08-06T02:50:00Z",
      likeCount: 31,
      writer: { userNo: 3, name: "미래" },
      commentCount: 0,
    },
  ],
  free: [
    {
      boardNo: 101,
      boardTypeNo: 1,
      title: "React 19 마이그레이션 정리",
      createdAt: "2025-08-10T12:20:00Z",
      likeCount: 42,
      writer: { userNo: 2, name: "준" },
      commentCount: 2,
    },
    {
      boardNo: 102,
      boardTypeNo: 1,
      title: "Vite 설정과 코드 스플리팅",
      createdAt: "2025-08-07T10:05:00Z",
      likeCount: 12,
      writer: { userNo: 4, name: "리오" },
      commentCount: 0,
    },
    {
      boardNo: 103,
      boardTypeNo: 1,
      title: "Oracle 커넥션 풀 튜닝 팁",
      createdAt: "2025-08-06T02:50:00Z",
      likeCount: 31,
      writer: { userNo: 3, name: "미래" },
      commentCount: 0,
    },
    {
      boardNo: 999,
      boardTypeNo: 1,
      title: "샘플 자유글",
      createdAt: "2025-08-05T09:40:00Z",
      likeCount: 5,
      writer: { userNo: 4, name: "리오" },
      commentCount: 1,
    },
  ],
  qna: [
    {
      boardNo: 201,
      boardTypeNo: 2,
      title: "Spring Security 토큰 만료?",
      createdAt: "2025-08-09T07:10:00Z",
      likeCount: 36,
      writer: { userNo: 2, name: "준" },
      commentCount: 2,
    },
    {
      boardNo: 202,
      boardTypeNo: 2,
      title: "JPA 지연로딩 N+1 해결",
      createdAt: "2025-08-08T15:30:00Z",
      likeCount: 55,
      writer: { userNo: 3, name: "미래" },
      commentCount: 2,
    },
    {
      boardNo: 203,
      boardTypeNo: 2,
      title: "RTK Query 캐싱 패턴",
      createdAt: "2025-08-05T09:40:00Z",
      likeCount: 18,
      writer: { userNo: 4, name: "리오" },
      commentCount: 1,
    },
    {
      boardNo: 998,
      boardTypeNo: 2,
      title: "샘플 QnA",
      createdAt: "2025-08-04T10:00:00Z",
      likeCount: 3,
      writer: { userNo: 1, name: "관리자" },
      commentCount: 0,
    },
  ],
};

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