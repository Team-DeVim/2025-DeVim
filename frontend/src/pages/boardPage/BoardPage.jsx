import { useEffect, useState } from "react";
import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";
import Sidebar from "../main/components/Sidebar";
import "./BoardPage.css";
import BoardTheme from "./components/BoardTheme/BoardTheme";
import ContentSection from "./components/ContentSection/ContentSection";
import NotionSection from "./components/NoticeSection/NoticeSection";
import { useSearchParams } from "react-router-dom";
import { noticePostList, pagingPostList } from "../../api/DevimApi";

function BoardPage() {
    const [sp, setSp] = useSearchParams();
    const [notice, setNotice] = useState([]);
    const [pagingList, setPagingList] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

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

    // 공지사항 데이터 요청
    useEffect(() => {
        const controller = new AbortController();

        noticePostList(3, 3, controller.signal)
            .then(setNotice)
            .catch((e) => {
                if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
                console.error(e);
                setError("공지사항 글을 불러오지 못했습니다.");
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    // 게시판 글 페이징 요청
    useEffect(() => {
        const controller = new AbortController();

        pagingPostList(page, size, boardTypeNo, controller.signal)
            .then(setPagingList)
            .catch((e) => {
                if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
                console.error(e);
                setError("글을 불러오지 못했습니다.");
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [page, size, boardTypeNo]);




    return (
        <div className="boardPage">
            <Header />
            <div className="boardPage__main">
                <div className="boardPage__main__left">
                    <BoardTheme boardTypeNo={boardTypeNo} />
                    <NotionSection data={notice} />
                    <ContentSection data={pagingList} />
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