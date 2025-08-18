import React from "react";
import { Link } from "react-router-dom";
import "./ContentSection.css";

const MOCK_POSTS = [
  {
    boardNo: 1,
    writer: { name: "사용자 닉네임" },
    timeAgo: "8분 전",
    title: "글 제목",
    tags: ["태그1", "태그2"],
    likeCount: 2,
    commentCount: 0,
  },
  {
    boardNo: 2,
    writer: { name: "사용자 닉네임" },
    timeAgo: "32분 전",
    title: "글 제목",
    tags: ["태그1", "태그2"],
    likeCount: 4,
    commentCount: 1,
  },
  {
    boardNo: 3,
    writer: { name: "사용자 닉네임" },
    timeAgo: "47분 전",
    title: "글 제목",
    tags: ["태그1", "태그2"],
    likeCount: 1,
    commentCount: 0,
  },
  {
    boardNo: 4,
    writer: { name: "사용자 닉네임" },
    timeAgo: "1시간 전",
    title: "글 제목",
    tags: ["태그1", "태그2"],
    likeCount: 0,
    commentCount: 0,
  },
  {
    boardNo: 5,
    writer: { name: "사용자 닉네임" },
    timeAgo: "2시간 전",
    title: "글 제목",
    tags: ["태그1", "태그2"],
    likeCount: 3,
    commentCount: 2,
  },
  {
    boardNo: 6,
    writer: { name: "사용자 닉네임" },
    timeAgo: "2시간 전",
    title: "글 제목",
    tags: ["태그1", "태그2"],
    likeCount: 1,
    commentCount: 0,
  },
  {
    boardNo: 7,
    writer: { name: "사용자 닉네임" },
    timeAgo: "3시간 전",
    title: "글 제목",
    tags: ["태그1", "태그2"],
    likeCount: 0,
    commentCount: 0,
  },
];


export default function ContentSection({
  posts,
  pagination,
  onSearch,
  onSort,
}) {
  const list = Array.isArray(posts) && posts.length ? posts : MOCK_POSTS;
  const page = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const onPageChange = pagination?.onPageChange ?? (() => {});

  return (
    <section className="contentSection">
      {/* 리스트 */}
      <ul className="contentSection__list">
        {list.map((post) => (
          <li key={post.boardNo} className="contentSection__row">
            <Link
              className="contentSection__rowLink"
              to={`/board/${post.boardNo}`}
            >
              {/* 상단: 프로필/시간 + 우측 좋아요/댓글 */}
              <div className="contentSection__headerLine">
                <div className="contentSection__profile">
                  <div className="contentSection__avatar" />
                  <div className="contentSection__nameTime">
                    <div className="contentSection__name">
                      {post.writer?.name ?? "알 수 없음"}
                    </div>
                    <div className="contentSection__time">
                      {post.timeAgo ?? ""}
                    </div>
                  </div>
                </div>
                <div className="contentSection__stats">
                  <span className="contentSection__statLike">
                    좋아요: {post.likeCount ?? 0}
                  </span>
                  <span className="contentSection__statComment">
                    댓글: {post.commentCount ?? 0}
                  </span>
                </div>
              </div>

              {/* 중단: 제목 */}
              <div className="contentSection__title" title={post.title}>
                {post.title}
              </div>

              {/* 하단: 해시태그 */}
              <div className="contentSection__tags">
                {(post.tags || []).map((t) => (
                  <span key={t} className="contentSection__tag">
                    #{t}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* 하단: 검색 / 정렬 / 페이지네이션 */}
      <div className="contentSection__footer">
        <div className="contentSection__footerLeft">
          <input
            className="contentSection__searchInput"
            placeholder=">검색어를 입력하세요"
            onChange={(e) => onSearch?.(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && onSearch?.(e.currentTarget.value)
            }
            aria-label="게시글 검색"
          />
          
        </div>

        <div className="contentSection__pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              aria-current={n === page ? "page" : undefined}
              className={`contentSection__pageButton ${
                n === page ? "contentSection__pageButton--active" : ""
              }`}
              onClick={() => onPageChange(n)}
              type="button"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
