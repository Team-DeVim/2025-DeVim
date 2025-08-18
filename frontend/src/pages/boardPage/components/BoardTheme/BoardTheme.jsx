import React from "react";
import "./BoardTheme.css";

/** "free" | "qna" */
const currentBoardVariant = "qna"; 

const boardTitle =
  currentBoardVariant === "free" ? "자유게시판" : "Q&A 게시판";

const boardSubtitle = "다양한 주제로 생각을 넓혀보세요";

export default function BoardTheme() {
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
