import { useEffect } from "react";
import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";
import Sidebar from "../main/components/Sidebar";
import "./BoardPage.css";
import BoardTheme from "./components/BoardTheme/BoardTheme";
import ContentSection from "./components/ContentSection/ContentSection";
import NotionSection from "./components/NoticeSection/NoticeSection";
import { useSearchParams } from "react-router";

function BoardPage() {
    const [sp, setSp] = useSearchParams();

    useEffect(() => {
        if (!sp.has("page") || !sp.has("size") || !sp.has("boardTypeNo")) {
            const next = new URLSearchParams(sp);
            if (!sp.has("page")) next.set("page", "1");
            if (!sp.has("size")) next.set("size", "7");
            if (!sp.has("boardTypeNo")) next.set("boardTypeNo", "1");
            setSp(next, { replace: true });
        }
    }, [sp, setSp]);

    const page = Number(sp.get("page") ?? 1);  // URL 표시는 1-based라면
    const size = Number(sp.get("size") ?? 7);
    const boardTypeNo = sp.get("boardTypeNo") != null ? Number(sp.get("boardTypeNo")) : undefined;

    /*
    * 이제 이 아래에 axios 요청
    */
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