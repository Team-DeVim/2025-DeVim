import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";
import MyArticle from "./components/myArticle/MyArticle";
import MyComment from "./components/myComment/MyComment";
import ProfileCard from "./components/profileCard/ProfileCard";
import "./profilePage.css";
import { useEffect, useState } from "react";
import { getMypostList } from "../../api/DevimApi";

function ProfilePage() {
    const { userNo } = useParams();
    const [sp, setSp] = useSearchParams();
    const [postPagingList, setPostPagingList] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    // 기본 쿼리스트링 생성
    useEffect(() => {
        if (!sp.has("Apage") || !sp.has("size") || !sp.has("Cpage")) {
            const next = new URLSearchParams(sp);
            if (!sp.has("Apage")) next.set("Apage", "1");
            if (!sp.has("Cpage")) next.set("Cpage", "1");
            if (!sp.has("size")) next.set("size", "5");
            setSp(next, { replace: true });
        }
    }, [sp, setSp]);

    const Apage = Number(sp.get("Apage") ?? 1);
    const Cpage = Number(sp.get("Cpage") ?? 1);
    const size = Number(sp.get("size") ?? 5);

    // 내 게시글 페이징 요청
    useEffect(() => {
        const controller = new AbortController();

        getMypostList(userNo, Apage, size, controller.signal)
            .then(setPostPagingList)
            .catch((e) => {
                if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
                console.error(e);
                setError("데이터를 불러오지 못했습니다.");
            })
            .finally(() => setLoading(false));
        return () => controller.abort();
    }, [userNo, Apage, size])

    // console.log(postPagingList);
    if (loading) return <div>loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="profilePage">
            <Header />
            <div className="profilePage--content">
                <ProfileCard />
                <MyArticle postPagingList={postPagingList} />
                <MyComment />
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;