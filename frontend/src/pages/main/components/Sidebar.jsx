import React, { useState } from "react";
import "./Sidebar.css";

// ---- mockData ----
const rankingData = {
  posts: [
    { userId: 101, nickname: "제로콜라", count: 128 },
    { userId: 102, nickname: "초코칩", count: 113 },
    { userId: 103, nickname: "독일의", count: 98 },
    { userId: 104, nickname: "세계최강", count: 76 },
    { userId: 105, nickname: "기술력", count: 70 },
  ],
  comments: [
    { userId: 201, nickname: "환수", count: 251 },
    { userId: 202, nickname: "우강", count: 230 },
    { userId: 203, nickname: "호강", count: 221 },
    { userId: 204, nickname: "진우", count: 205 },
    { userId: 205, nickname: "현세", count: 202 },
  ],
};

// ---- 로그인 테스트용 프로필 ----
const mockProfile = {
  id: "hong123",
  name: "홍길동",
  profile_image_path: "/images/profile.jpg",
};

function Sidebar() {
  // 내부 로그인/비로그인 토글
  const [profile, setProfile] = useState(null);
  const isLoggedIn = !!profile;
  const myStats = isLoggedIn
    ? { posts: 12, comments: 34 }
    : { posts: 0, comments: 0 };

  const handleLoginClick = () => setProfile(mockProfile);
  const handleLogoutClick = () => setProfile(null);
  const handleRegisterClick = () => alert("회원가입 페이지(연동 예정)");

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

        {isLoggedIn ? (
          <div className="Sidebar__profile Sidebar__profile--in">
            <div className="Sidebar__media">
              <div className="Sidebar__avatar Sidebar__avatar--square Sidebar__avatar--lg">
                {profile?.profile_image_path ? (
                  <img
                    src={profile.profile_image_path}
                    alt="프로필 이미지"
                    loading="lazy"
                  />
                ) : (
                  <div className="Sidebar__avatarFallback">
                    {(profile?.name ?? profile?.id ?? "U").slice(0, 2)}
                  </div>
                )}
              </div>
            </div>

            <div className="Sidebar__info">
              <div className="Sidebar__name">
                {profile?.name ?? profile?.id ?? "사용자"}
              </div>
              <div className="Sidebar__id">
                {profile?.id ? `@${profile.id}` : ""}
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

        <RankSection title="게시물왕" unit="개" items={rankingData.posts} />
        <div className="Sidebar__divider" aria-hidden="true" />
        <RankSection title="댓글왕" unit="개" items={rankingData.comments} />
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
