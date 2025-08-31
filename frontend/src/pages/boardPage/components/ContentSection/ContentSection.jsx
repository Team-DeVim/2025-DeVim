import React from "react";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import "./ContentSection.css";
import { DEFAULT_PROFILE, thumbnailUrl } from "../../../../api/DevimApi";

export default function ContentSection({ data }) {
  const [params, setParams] = useSearchParams();
  const boardType = (params.get("boardTypeNo") == 1) ? "free" : "QnA";

  //페이지 이동에 대한 쿼리스트링 변경
  const setPage = (p) => {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    setParams(next);
  };

  const list = data?.dtoList ?? [];
  const current = data?.current ?? Number(params.get("page") ?? 1);
  const totalPage = data?.totalPage ?? 1;
  const pageNumList =
    data?.pageNumList ?? Array.from({ length: totalPage }, (_, i) => i + 1);
  // const hasPrev = Boolean(data?.prev);
  // const hasNext = Boolean(data?.next);
  // const prevPage = data?.prevPage ?? Math.max(1, current - 1);
  // const nextPage = data?.nextPage ?? Math.min(totalPage, current + 1);

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
    <section className="contentSection">
      {/* 리스트 */}
      <ul className="contentSection__list">
        {list.map((post) => (
          <li key={post.boardNo} className="contentSection__row">
            <Link
              className="contentSection__rowLink"
              to={{
                pathname: `/detailPage/${post.boardNo}`,
                search: `?${createSearchParams({
                  boardTypeNo: post.boardTypeNo ?? "",
                })}`,
              }}
            >
              {/* 상단: 프로필/시간 + 우측 좋아요/댓글 */}
              <div className="contentSection__headerLine">
                <div className="contentSection__profile">
                  <img
                    className="contentSection__avatar"
                    src={thumbnailUrl(post.userNo, 30, 30)}
                    alt="프로필이미지"
                    onError={(e) => { e.currentTarget.src = DEFAULT_PROFILE; }}
                  />
                  <div className="contentSection__nameTime">
                    <div className="contentSection__name">
                      {post.writerName ?? "알 수 없음"}
                    </div>
                    <div className="contentSection__time">
                      {formatTimeAgo(post.createdDt)}
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
            // // onChange={(e) => onSearch?.(e.target.value)}
            // onKeyDown={(e) =>
            //   e.key === "Enter" && onSearch?.(e.currentTarget.value)
            // }
            aria-label="게시글 검색"
          />

        </div>

        <div className="contentSection__pagination">
          {pageNumList.map((n) => (
            <button
              key={n}
              aria-current={n === current ? "page" : undefined}
              className={`contentSection__pageButton ${n === current ? "contentSection__pageButton--active" : ""
                }`}
              onClick={() => setPage(n)}
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
