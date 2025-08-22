import React from "react";
import "./BoardTheme.css";

export default function BoardTheme({ boardTypeNo }) {
  const boardTitle =
    (boardTypeNo === 1 ? "자유게시판" : "Q&A 게시판");

  const boardSubtitle =
    (boardTypeNo === 1 ? "다양한 주제로 생각을 넓혀보세요" : "각 분야 코딩러들에게 힘을 빌려보세요");
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
