// src/pages/editorPage/EditorPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";

import TopicSelect from "./components/TopicSelect/TopicSelect";
import TitleInput from "./components/TitleInput/TitleInput";
import Editor from "./components/Editor/Editor";

import "./EditorPage.css";
import { createBoard, api, BOARD_PREFIX } from "../../api/DevimApi";

export default function EditorPage() {
  // 작성/수정 모드 감지
  const [sp] = useSearchParams();
  const mode = sp.get("mode");                 // "edit" | null
  const boardNoParam = sp.get("boardNo");
  const isEdit = mode === "edit" && !!boardNoParam;

  const location = useLocation();
  const navigate = useNavigate();

  // boardTypeNo: 1=자유, 2=QnA, 3=공지
  const [boardTypeNo, setBoardTypeNo] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // 수정 모드 진입 시, 상세에서 넘겨준 state로 프리필 (별도 재조회 없이 최소 변경)
  useEffect(() => {
    if (!isEdit) return;
    const post = location.state?.board;
    if (!post) return; // state가 없으면(직접 진입 등) 프리필 생략
    setBoardTypeNo(post.boardTypeNo ?? null);
    setTitle(post.title ?? "");
    setContent(post.boardContent ?? "");
  }, [isEdit, location.state]);

  // 등록/저장 버튼 활성화 조건
  const canSubmit = useMemo(() => {
    const plain = content.replace(/<[^>]+>/g, "").trim();
    return !!boardTypeNo && title.trim().length > 0 && plain.length > 0;
  }, [boardTypeNo, title, content]);

  // 등록/저장
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!isEdit) {
        // 작성 모드: POST
        await createBoard({ boardTypeNo, title, boardContent: content });

        alert("게시글이 등록되었습니다.");
        navigate(`/boardPage/?boardTypeNo=${boardTypeNo}`);
      } else {
        // 수정 모드: PATCH /api/v1/boards/{boardNo}
        await api.patch(`${BOARD_PREFIX}/${encodeURIComponent(boardNoParam)}`, {
          boardTypeNo: Number(boardTypeNo),
          title: title.trim(),
          boardContent: content.trim(),
        });
        alert("게시글이 수정되었습니다.");
        // 수정 완료 후 상세로 이동
        navigate(`/detailPage/${encodeURIComponent(boardNoParam)}?boardTypeNo=${boardTypeNo}`);
      }
    } catch (e) {
      console.error(e);
      alert(e?.message || (isEdit ? "게시글 수정에 실패했습니다." : "게시글 등록에 실패했습니다."));
    } finally {
      setLoading(false);
    }
  };

  // 취소
  const handleCancel = () => {
    if (isEdit) {
      navigate(`/detailPage/${encodeURIComponent(boardNoParam)}?boardTypeNo=${boardTypeNo}`);
    } else {
      history.back();
    }
  };

  return (
    <div className="editor-page">
      <Header />
      <main className="editor-page__container">
        <TopicSelect value={boardTypeNo} onChange={setBoardTypeNo} />
        <TitleInput value={title} onChange={setTitle} />

        <section className="editor-page__body">
          <Editor
            value={content}
            onChange={setContent}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            canSubmit={canSubmit}
            key={`editor-${isEdit ? boardNoParam : "new"}`}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
