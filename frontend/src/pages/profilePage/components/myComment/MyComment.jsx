import { useState } from "react";
import "./MyComment.css";
import { useNavigate } from "react-router";

const commentData = [
  { id: 1, title: "안녕하세요." },
  { id: 2, title: "좋은 글 감사합니다!" },
  { id: 3, title: "많은 도움이 되었어요." },
  { id: 4, title: "질문이 있습니다." },
  { id: 5, title: "정말 유익하네요." },
  { id: 6, title: "다음 글도 기대할게요!" },
  { id: 7, title: "잘 읽었습니다." },
  
];

const MyComment = () => {
	const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const commentPerPage = 5;
  const pagesPerGroup = 10;

  const totalPages = Math.ceil(commentData.length / commentPerPage);
  const startIndex = (currentPage - 1) * commentPerPage;
  const currentComments = commentData.slice(
    startIndex,
    startIndex + commentPerPage
  );

  /* 오늘 날짜 함수 출력 */
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  /* 페이징그룹 시작과 끝 계산 */
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  /* 페이징 배열 */
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  /* 상세페이지로 이동 */
  const handleDetailPage = () => {
    navigate("/detailPage");
  };

  return (
    <div className="myComment">
      <div className="myComment__group">
        <h3 className="myComment__title">내가 쓴 댓글</h3>
        <hr />
        <div className="myComment__my-stats" onClick={handleDetailPage}>
          {currentComments.map((comment) => (
            <div key={comment.id} className="myComment__write">
              <span>{comment.title}</span>
              <span>{formattedDate}</span>
            </div>
          ))}
        </div>

        <div className="myComment__pagination">
          {pageGroup > 0 && (
            <button
              onClick={() => {
                setPageGroup(pageGroup - 1);
                setCurrentPage(startPage - pagesPerGroup); // 이전 그룹의 첫 페이지로 이동
              }}
            >
              ◀
            </button>
          )}
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          {/* ✅ 다음 페이지 그룹 버튼 */}
          {endPage < totalPages && (
            <button onClick={() => setPageGroup(pageGroup + 1)}>▶</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComment;
