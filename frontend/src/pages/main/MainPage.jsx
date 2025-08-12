import BoardSection from "./components/BoardSection/BoardSection";
import Carousel from "./components/Carousel/Carousel";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import "./MainPage.css";

function MainPage() {
  return (
    <div className="main">
      <Header />

      <section className="hero">
        <Carousel />
      </section>

      <div className="dashboard">
        <div className="dashboard__main">
          <BoardSection title="인기글 게시판" mode="popular" />
          <BoardSection title="자유게시판" mode="free" />
          <BoardSection title="QnA" mode="qna" />
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
