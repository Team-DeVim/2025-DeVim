import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import axios from "axios";
import { api, fetchMyInfo, getToken, logout, USER_PREFIX } from "../../../api/DevimApi.jsx";
import { useNavigate } from "react-router";


// ---- 로그인 테스트용 프로필 ----
const mockProfile = {
  id: "hong123",
  name: "홍길동",
  profile_image_path: "/images/profile.jpg",
};

function Sidebar() {
  // 내부 로그인/비로그인 토글
  // const [profile, setProfile] = useState(null);
  // const isLoggedIn = !!profile;
  const isLogin = !!getToken();
  const myStats = isLogin
    ? { posts: 12, comments: 34 }
    : { posts: 0, comments: 0 };
  const navigate = useNavigate();
  const handleLoginClick = () => navigate("/login");
  const handleLogoutClick = () => logout();
  const handleRegisterClick = () => navigate("/register");
  const [me, setMe] = useState(null);

  // 내 정보 불러오기
  useEffect(() => {
    if (!isLogin) { return; }
    const controller = new AbortController();

    fetchMyInfo(controller.signal)
      .then((data) => setMe(data))
      .catch((err) => setError(err.message));

    return () => controller.abort();
  }, [isLogin]);

  // --- 랭킹 데이터 처리 ---
  const [boardRanks, setBoardRanks] = useState([]);
  const [commentRanks, setCommentRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // DevimApi.jsx를 통해 API 호출
        const boardsRes = await api.get(`${USER_PREFIX}/rank/boards`);
        const commentsRes = await api.get(`${USER_PREFIX}/rank/comments`);

        setBoardRanks(boardsRes.data);
        setCommentRanks(commentsRes.data);
      } catch (err) {
        setError("랭킹 정보를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="Sidebar">
      {/* 프로필 카드 */}
      <section
        className="Sidebar__card Sidebar__card--profile"
        aria-labelledby="sidebar-profile-title"
      >
        <h2 id="sidebar-profile-title" className="Sidebar__card-title">
          프로필
        </h2>

        {isLogin ? (
          <div className="Sidebar__profile Sidebar__profile--in">
            <div className="Sidebar__media">
              <div className="Sidebar__avatar Sidebar__avatar--square Sidebar__avatar--lg">
                {me?.profile_image_path ? (
                  <img
                    src={me.profile_image_path}
                    alt="프로필 이미지"
                    loading="lazy"
                  />
                ) : (
                  <div className="Sidebar__avatarFallback">
                    {(me?.name ?? me?.id ?? "U").slice(0, 3)}
                  </div>
                )}
              </div>
            </div>

            <div className="Sidebar__info">
              <div className="Sidebar__name">
                {me?.name ?? me?.id ?? "사용자"}
              </div>
              <div className="Sidebar__id">
                {me?.id ? `@${me.id}` : ""}
              </div>

              <div className="Sidebar__counts">
                <div className="Sidebar__countRow">
                  <span className="Sidebar__countLabel">내 글 :</span>
                  <span className="Sidebar__countValue">
                    {myStats.posts.toLocaleString()}개
                  </span>
                </div>
                <div className="Sidebar__countRow">
                  <span className="Sidebar__countLabel">내 댓글 :</span>
                  <span className="Sidebar__countValue">
                    {myStats.comments.toLocaleString()}개
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="Sidebar__button Sidebar__button--danger Sidebar__logout"
              onClick={handleLogoutClick}
              aria-label="로그아웃"
              title="로그아웃"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="Sidebar__profile Sidebar__profile--out">
            <div className="Sidebar__welcome">환영합니다!</div>
            <p className="Sidebar__desc">로그인 후 이용 가능합니다</p>
            <div className="Sidebar__actions">
              <button
                type="button"
                className="Sidebar__button Sidebar__button--primary"
                onClick={handleLoginClick}
              >
                로그인
              </button>
              <button
                type="button"
                className="Sidebar__button"
                onClick={handleRegisterClick}
              >
                회원가입
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 랭킹 카드 */}
      <section className="Sidebar__card" aria-labelledby="sidebar-rank-title">
        <h2 id="sidebar-rank-title" className="Sidebar__card-title">
          랭킹
        </h2>
        {loading && <div>랭킹을 불러오는 중...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <>
            <div>
              <RankSection
                title="게시물왕"
                unit="개"
                items={boardRanks.map((item) => ({
                  userId: item.userName, // userName을 고유 ID로 사용
                  nickname: item.userName,
                  count: item.activityCount,
                }))}
              />
            </div>
            <div className="Sidebar__divider" aria-hidden="true" />
            <RankSection
              title="댓글왕"
              unit="개"
              items={commentRanks.map((item) => ({
                userId: item.userName, // userName을 고유 ID로 사용
                nickname: item.userName,
                count: item.activityCount,
              }))}
            />
          </>
        )}
      </section>

      {/* 배너 카드 */}
      <section className="Sidebar__card Sidebar__card--banner">
        <a
          className="Sidebar__banner"
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label="사이드 배너"
        >
          <img
            src="/assets/sidebar_banner.jpg"
            alt="사이드 배너"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.replaceWith(
                Object.assign(document.createElement("div"), {
                  className: "Sidebar__bannerFallback",
                  innerText: "배너 이미지",
                })
              );
            }}
          />
        </a>
      </section>
    </aside>
  );
}

function RankSection({ title, unit, items }) {
  const top5 = (items ?? []).slice(0, 5);
  return (
    <div className="Sidebar__rank">
      <h3 className="Sidebar__rankTitle">{title}</h3>
      <ol className="Sidebar__rankList">
        {top5.map((it, idx) => (
          <li key={`${title}-${it.userId}`} className="Sidebar__rankItem">
            <div className="Sidebar__rankRow">
              <span className="Sidebar__rankNo">{idx + 1}</span>
              <span className="Sidebar__rankName">{it.nickname}</span>
              <span className="Sidebar__rankCount">
                {it.count.toLocaleString()} {unit}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Sidebar;
