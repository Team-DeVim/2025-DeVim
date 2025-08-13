import React from "react";
import "./Sidebar.css";

/**
 * props
 * - profile: 로그인 상태면 객체, 비로그인 null/undefined
 *   { id: "user01", name: "홍길동", profile_image_path: "/images/me.jpg" }
 * - onLoginClick, onRegisterClick, onLogoutClick: 버튼 콜백(선택)
 */

// ---- mockData (파일 내부 고정) ----
const rankingData = {
  posts: [
    { userId: 101, nickname: "제로콜라", count: 128 },
    { userId: 102, nickname: "초코칩", count: 113 },
    { userId: 103, nickname: "독일의", count: 98 },
    { userId: 104, nickname: "세계최강", count: 76 },
    { userId: 105, nickname: "기술력", count: 70 }
  ],
  comments: [
    { userId: 201, nickname: "환수", count: 251 },
    { userId: 202, nickname: "우강", count: 230 },
    { userId: 203, nickname: "호강", count: 221 },
    { userId: 204, nickname: "진우", count: 205 },
    { userId: 204, nickname: "현세", count: 202 },
  ],
};

function Sidebar({
  profile,
  myStats = { posts: 0, comments: 0 },
  onLoginClick = () => {},
  onRegisterClick = () => {},
  onLogoutClick = () => {},
}) {
  const isLoggedIn = !!profile;

  return (
    <aside className="sidebar">
      {/* 프로필 카드 */}
      <section className="sb-card sb-card--profile">
        <h2 className="sb-title">프로필</h2>

        {isLoggedIn ? (
          <div className="sb-profile-in">
            <div className="sb-profile-media">
              <div className="sb-avatar-150">
                {profile?.profile_image_path ? (
                  <img
                    src={profile.profile_image_path}
                    alt="프로필 이미지"
                    loading="lazy"
                  />
                ) : (
                  <div className="sb-avatar-150__fallback">
                    {(profile?.name ?? profile?.id ?? "U").slice(0, 2)}
                  </div>
                )}
              </div>
            </div>

            <div className="sb-profile-info">
              <div className="sb-user-name">
                {profile?.name ?? profile?.id ?? "사용자"}
              </div>
              <div className="sb-user-id">
                {profile?.id ? `@${profile.id}` : ""}
              </div>

              <div className="sb-mycounts">
                <div className="sb-mycounts__row">
                  <span className="sb-mycounts__label">내 글 :</span>
                  <span className="sb-mycounts__value">
                    {(myStats.posts ?? 0).toLocaleString()}개
                  </span>
                </div>
                <div className="sb-mycounts__row">
                  <span className="sb-mycounts__label">내 댓글 :</span>
                  <span className="sb-mycounts__value">
                    {(myStats.comments ?? 0).toLocaleString()}개
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="sb-btn sb-btn-danger sb-logout-fab"
              onClick={onLogoutClick}
              aria-label="로그아웃"
              title="로그아웃"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="sb-profile-out">
            <div className="sb-welcome">환영합니다!</div>
            <p className="sb-desc">로그인 후 이용 가능합니다</p>
            <div className="sb-actions">
              <button
                type="button"
                className="sb-btn sb-btn-primary"
                onClick={onLoginClick}
              >
                로그인
              </button>
              <button
                type="button"
                className="sb-btn"
                onClick={onRegisterClick}
              >
                회원가입
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 랭킹 카드 */}
      <section className="sb-card">
        <h2 className="sb-title">랭킹</h2>

        <RankSection title="게시물왕" unit="개" items={rankingData.posts} />
        <RankSection title="댓글왕" unit="개" items={rankingData.comments} />
      </section>

      {/* 배너 (이미지) */}
      <section className="sb-card">
        <a
          className="sb-banner"
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label="사이드 배너"
        >
          <img
            src=""
            alt="사이드 배너"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.replaceWith(
                Object.assign(document.createElement("div"), {
                  className: "sb-banner-fallback",
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
  const top3 = (items ?? []).slice(0, 5);
  return (
    <div className="sb-rank">
      <h3 className="sb-rank-title">{title}</h3>
      <ol className="sb-rank-list">
        {top3.map((it, idx) => (
          <li key={`${title}-${it.userId}`} className="sb-rank-item">
            <div className="sb-rank-text">
              <span className="sb-rank-no">{idx + 1}</span>
              <span className="sb-rank-name">{it.nickname}</span>
              <span className="sb-rank-count">
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
