import Footer from "../main/components/Footer/Footer";
import Header from "../main/components/Header/Header";
import MyArticle from "./components/myArticle/MyArticle";
import MyComment from "./components/myComment/MyArticle";
import ProfileCard from "./components/profileCard/ProfileCard";
import "./profilePage.css";

function ProfilePage() {
    return (
        <div className="profilePage">
            <Header />
            <div className="profilePage--content">
                <ProfileCard />
                <MyArticle />
                <MyComment />
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;