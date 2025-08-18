import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";
import Sidebar from "../main/components/Sidebar";
import "./BoardPage.css";
import BoardTheme from "./components/BoardTheme/BoardTheme";
import ContentSection from "./components/ContentSection/ContentSection";
import NotionSection from "./components/NoticeSection/NoticeSection";

function BoardPage() {
    return (
        <div className="boardPage">
            <Header />
            <div className="boardPage__main">
                <div className="boardPage__main__left">
                    <BoardTheme />
                    <NotionSection />
                    <ContentSection />
                </div>
                <div className="boardPage__main__right">
                    <Sidebar />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BoardPage;