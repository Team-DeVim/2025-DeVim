import React, { useEffect, useState } from "react";
import "./DetailPage.css";

import Header from "../main/components/Header/Header";
import Footer from "../main/components/Footer/Footer";
import Sidebar from "../main/components/Sidebar";
import BoardTheme from "../boardPage/components/BoardTheme/BoardTheme";

import ContentBox from "./components/contentBox/ContentBox";
import CommentBox from "./components/commentBox/CommentBox";
import { useParams, useSearchParams } from "react-router-dom";
import { getDetailPost } from "../../api/DevimApi";

export default function DetailPage() {
  const { boardNo } = useParams();
  const [sp] = useSearchParams();
  const boardTypeNo = Number(sp.get("boardTypeNo") ?? 1);
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    getDetailPost(boardNo, controller.signal)
      .then(setContent)
      .catch((e) => {
        if (e?.code === "ERR_CANCELED" || e?.name === "CanceledError") return;
        console.error(e);
        setError("상세 글을 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [boardNo]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="detailPage">

      <Header />
      <div className="detailPage--main--layout">
        <div className="detailPage--main--left">
          <BoardTheme boardTypeNo={boardTypeNo} />
          {/* 본문 + 댓글 */}
          <ContentBox data={content} />
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
