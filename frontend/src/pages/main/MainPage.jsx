import { useEffect, useState } from 'react';
import SignUp from '../SignUpRegister/SignUp';
import BoardSection from "./components/BoardSection/BoardSection";
import Carousel from "./components/Carousel/Carousel";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import "./MainPage.css";
import { commonPostList, popularPostList, questionPostList } from '../../api/DevimApi';

function MainPage() {
  const [popular, setPopular] = useState([]);
  const [common, setCommon] = useState([]);
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //인기글 데이터 요청
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    popularPostList(controller.signal)
      .then(setPopular)
      .catch((e) => {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setError("인기 글을 불러오지 못했습니다.");
        console.error(e);
      })
      .finally(() => setLoading(false));

    // 언마운트/의존 변경 시 진행 중 요청 취소
    return () => controller.abort();
  }, []);

  // 자유 게시판 데이터 요청
  useEffect(() => {
    const controller = new AbortController();

    commonPostList(1, 4, controller.signal)
      .then(setCommon)
      .catch(e => {
        if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
        console.error(e);
        setError("자유게시판 글을 불러오지 못했습니다.");
      });

    return () => controller.abort();
  }, []);

  // Q & A 게시판 데이터 요청
  useEffect(() => {
    const controller = new AbortController();

    questionPostList(2, 4, controller.signal)
      .then(setQuestion)
      .catch(e => {
        if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
        console.error(e);
        setError("Q & A게시판 글을 불러오지 못했습니다.");
      });

    return () => controller.abort();
  }, []);



  if (loading) return <div>로딩…</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="main">
      <Header />
      <section className="hero">
        <Carousel />
      </section>

      <div className="dashboard">
        <div className="dashboard__main">
          <BoardSection title="인기글 게시판" data={popular} pageSize={4} />
          <BoardSection title="자유게시판" data={common} />
          <BoardSection title="QnA" data={question} />
        </div>
        <aside className="dashboard__side">
          <Sidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;