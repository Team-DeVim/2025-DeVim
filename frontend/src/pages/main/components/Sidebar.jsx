import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="profile-card">
                <div className="profile-image">
                    {/* 프로필 이미지 자리 */}
                </div>

                <div className="user-profile">
                    <div className="profile-nickname">사용자 (닉네임) 님</div>
                    <div className="profile-logout">로그아웃</div>
                </div>

                <div className="profile-mypage">마이페이지</div>
                <div className="profile-info">내가 쓴 글 / 댓글 …</div>
            </div>

            <div className="ranking-card">
                {/* 스크롤 리스트 자리 */}
            </div>

            <div className="recruitment-card">
                {/* 채용/배너 자리 */}
            </div>
        </div>
    );
}
