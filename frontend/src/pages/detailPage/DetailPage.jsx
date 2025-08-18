import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";
import Sidebar from "../main/components/Sidebar";
import CommentBox from "./components/commentBox/CommentBox";
import ContentBox from "./components/contentBox/ContentBox";
import "./DetailPage.css";

function DetailPage() {
    return (
        <div className="detailPage">
            <Header />
            <div className="detailPage--main--layout">
                <div className="detailPage--main--left">
                    {/* 이곳에 board_theme 컴포넌트 추가 */}
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
};

export default DetailPage;