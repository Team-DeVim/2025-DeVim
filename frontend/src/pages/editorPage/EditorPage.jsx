import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";

import TopicSelect from "./components/TopicSelect/TopicSelect";
import TitleInput from "./components/TitleInput/TitleInput";
import Editor from "./components/Editor/Editor";

import "./EditorPage.css";

export default function EditorPage() {
  // boardTypeNo: 1=자유, 2=QnA, 3=공지
  const [boardTypeNo, setBoardTypeNo] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const canSubmit = useMemo(() => {
    const plain = content.replace(/<[^>]+>/g, "").trim();
    return !!boardTypeNo && title.trim().length > 0 && plain.length > 0;
  }, [boardTypeNo, title, content]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const payload = {
      boardTypeNo, 
      title, 
      boardContent: content, 
    };
    console.log("submit", payload);
    alert("작성 완료 (API 연결 예정)");
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
