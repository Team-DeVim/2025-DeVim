import { useState } from "react";
import "./MyComment.css";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";

const commentData = [
  { id: 1, title: "안녕하세요." },
  { id: 2, title: "좋은 글 감사합니다!" },
  { id: 3, title: "많은 도움이 되었어요." },
  { id: 4, title: "질문이 있습니다." },
  { id: 5, title: "정말 유익하네요." },
  { id: 6, title: "다음 글도 기대할게요!" },
  { id: 7, title: "잘 읽었습니다." },

];

const MyComment = ({ commentPagingList }) => {
  const [params, setParams] = useSearchParams();
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
  const pageNumbers = commentPagingList.pageNumList ?? [];

  //페이지 이동에 대한 쿼리스트링 변경
  const setPage = (p) => {
    const next = new URLSearchParams(params);
    next.set("Cpage", String(p));
    setParams(next);
    setCurrentPage(Number(next.get("Cpage")));
  };

  return (
    <div className="myComment">
      <div className="myComment__group">
        <h3 className="myComment__title">내가 쓴 댓글</h3>
        <hr />
        <div className="myComment__my-stats">
          {commentPagingList.dtoList.map((comment) => (
            <Link
              key={comment.commentNo}
              to={{
                pathname: `/detailPage/${comment.boardNo}`,
                search: `?${createSearchParams({
                  boardTypeNo: comment.boardTypeNo ?? "",
                })}`,
              }}
              className="myComment__write">
              <span>{comment.commentContent}</span>
              <span>{formatDate(comment.createdDt)}</span>
            </Link>
          ))}
        </div>

        <div className="myComment__pagination">
          {commentPagingList.prev && (
            <button
              onClick={() => {
                setPage(commentPagingList.prevPage);
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
          {commentPagingList.next && (
            <button
              onClick={
                () => { setPage(commentPagingList.nextPage); }
              }>▶</button>
          )}
        </div>
      </div>
    </div >
  );
};

export default MyComment;
