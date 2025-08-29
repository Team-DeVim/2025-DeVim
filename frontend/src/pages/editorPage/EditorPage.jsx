import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";

import TopicSelect from "./components/TopicSelect/TopicSelect";
import TitleInput from "./components/TitleInput/TitleInput";
import Editor from "./components/Editor/Editor";

import "./EditorPage.css";
import { createBoard } from "../../api/DevimApi";

export default function EditorPage() {
  // boardTypeNo: 1=자유, 2=QnA, 3=공지
  const [boardTypeNo, setBoardTypeNo] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const canSubmit = useMemo(() => {
    const plain = content.replace(/<[^>]+>/g, "").trim();
    return !!boardTypeNo && title.trim().length > 0 && plain.length > 0;
  }, [boardTypeNo, title, content]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await createBoard({ boardTypeNo, title, boardContent: content });
      alert("게시글이 등록되었습니다.")
      navigate(`/main`);

    } catch (e) {
      alert(e.message || "게시글 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };



  const handleCancel = () => {
    history.back();
  };

  return (
    <div className="editor-page">
      <Header />
      <main className="editor-page__container">
        <TopicSelect
          value={boardTypeNo}
          onChange={setBoardTypeNo}
        // disabledOptions={[3]} // 공지 제한 시 사용
        />
        <TitleInput value={title} onChange={setTitle} />

        <section className="editor-page__body">
          <Editor
            onChange={setContent}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            canSubmit={canSubmit}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
