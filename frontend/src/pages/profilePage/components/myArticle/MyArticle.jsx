import { useNavigate } from "react-router";
import { useState } from "react";
import "./MyArticle.css";

/*예비데이터*/
const articleData = [
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
  { title: "NestJS로 백엔드 구조 잡기", likes: 31, comments: 12 },
  { title: "GitHub Actions로 CI/CD 구축하기", likes: 51, comments: 22 },
  { title: "VSCode 꿀팁 10가지", likes: 55, comments: 25 },
  { title: "React에서 useEffect 완벽 가이드", likes: 42, comments: 18 },
  { title: "타입스크립트 초보 탈출기", likes: 27, comments: 9 },
  { title: "JPA 지연로딩 N+1 해결", likes: 55, comments: 2 },
  { title: "Oracle 커넥션 풀 튜닝 팁", likes: 31, comments: 8 },
];

const MyArticle = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const articlesPerPage = 5;
  const pagesPerGroup = 10;

  const totalPages = Math.ceil(articleData.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articleData.slice(
    startIndex,
    startIndex + articlesPerPage
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
    <div className="myArticle">
      <div className="myArticle__group">
        <h3 className="myArticle__title">내가 쓴 글</h3>
        <hr />
        {currentArticles.map((article, index) => (
          <div
            key={index}
            className="myArticle__my-write"
            onClick={handleDetailPage}
          >
            <span>{article.title}</span>
            <div className="myArticle__my-stats">
              <span>추천 {article.likes}</span>
              <span>댓글 {article.comments}</span>
              <span>|</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        ))}

        <div className="myArticle__pagination">
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

export default MyArticle;
