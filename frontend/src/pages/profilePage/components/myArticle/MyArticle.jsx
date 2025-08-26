import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./MyArticle.css";

const MyArticle = ({ postPagingList }) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);


  /* 오늘 날짜 함수 출력 */
  // const today = new Date();
  function formatDate(iso, tz = "Asia/Seoul") {
    if (!iso) return "";
    const d = new Date(iso);
    const y = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, year: "numeric" }).format(d);
    const m = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, month: "2-digit" }).format(d);
    const day = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, day: "2-digit" }).format(d);
    return `${y}-${m}-${day}`;
  }

  /* 페이징 배열 */
  const pageNumbers = postPagingList.pageNumList;

  /* 상세페이지로 이동 */
  const handleDetailPage = () => {
    navigate("/detailPage");
  };

  //페이지 이동에 대한 쿼리스트링 변경
  const setPage = (p) => {
    const next = new URLSearchParams(params);
    next.set("Apage", String(p));
    setParams(next);
    setCurrentPage(Number(next.get("Apage")));
  };

  return (
    <div className="myArticle">
      <div className="myArticle__group">
        <h3 className="myArticle__title">내가 쓴 글</h3>
        <hr />
        {postPagingList.dtoList.map((article) => (
          <Link
            key={article.boardNo}
            to={{
              pathname: `/detailPage/${article.boardNo}`,
              search: `?${createSearchParams({
                boardTypeNo: article.boardTypeNo ?? "",
              })}`,
            }}
            className="myArticle__my-write"
          >
            <span>{article.title}</span>
            <div className="myArticle__my-stats">
              <span>추천 {article.likeCount}</span>
              <span>댓글 {article.commentCount}</span>
              <span>|</span>
              <span>{formatDate(article.createdDt)}</span>
            </div>
          </Link>
        ))}

        <div className="myArticle__pagination">
          {postPagingList.prev && (
            <button
              onClick={() => {
                setPage(postPagingList.prevPage);
              }}
            >
              ◀
            </button>
          )}
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          ))}

          {/* ✅ 다음 페이지 그룹 버튼 */}
          {postPagingList.next && (
            <button onClick={
              () => { setPage(postPagingList.nextPage); }
            }>▶</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyArticle;
