import BoardSection from "./components/BoardSection/BoardSection";
import Carousel from "./components/Carousel/Carousel";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import "./MainPage.css";

function MainPage() {
  // 로그인 상태 테스트
  const mockProfile = {
    id: "hong123",
    name: "홍길동",
    profile_image_path: "/images/profile.jpg",
  };

  // 비로그인 상태 테스트
  const noProfile = null;

  return (
    <div className="main">
      <Header />

      <section className="hero">
        <Carousel />
      </section>

      <div className="dashboard">
        <div className="dashboard__main">
          <BoardSection title="공지사항" />
          <BoardSection title="인기글 게시판" />
          <BoardSection title="자유게시판" />
        </div>
        <aside className="dashboard__side">
          <Sidebar
            profile={mockProfile}
            myStats={{ posts: 12, comments: 34 }}
            onLogoutClick={() => console.log("logout")}
          />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
