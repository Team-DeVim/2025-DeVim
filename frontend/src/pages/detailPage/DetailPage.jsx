import React from "react";
import "./DetailPage.css";

import Header from "../main/components/Header/Header";
import Footer from "../main/components/Footer/Footer";
import Sidebar from "../main/components/Sidebar";
import BoardTheme from "../boardPage/components/BoardTheme/BoardTheme";

import ContentBox from "./components/contentBox/ContentBox";
import CommentBox from "./components/commentBox/CommentBox";

export default function DetailPage() {
  return (
    <div className="detailPage">

      <Header />
      <div className="detailPage--main--layout">
        <div className="detailPage--main--left">
          <BoardTheme />
          {/* 본문 + 댓글 */}
          <ContentBox />
          <CommentBox />
        </div>

        <aside className="detailPage--main--side">
          <Sidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
}
