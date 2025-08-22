import React from "react";
import "./BoardTheme.css";

export default function BoardTheme({ boardTypeNo }) {
  let boardTitle = "";
  if (boardTypeNo === 1) {
    boardTitle = "자유게시판";
  } else if (boardTypeNo === 2) {
    boardTitle = "Q&A 게시판";
  } else {
    boardTitle = "공지사항";
  }

  let boardSubtitle = "";
  if (boardTypeNo === 1) {
    boardSubtitle = "다양한 주제로 생각을 넓혀보세요"
  } else if (boardTypeNo === 2) {
    boardSubtitle = "각 분야 코딩러들에게 힘을 빌려보세요";
  } else {
    boardSubtitle = "Devim에서 알려드립니다";
  }

  return (
    <section className="boardTheme">
      <div className="boardTheme__titleRow">
        <div>
          <h1 className="boardTheme__title">{boardTitle}</h1>
          <p className="boardTheme__subtitle">{boardSubtitle}</p>
        </div>
      </div>
    </section>
  );
}
