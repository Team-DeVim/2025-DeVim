import React from "react";
import "./AdminHeader.css";
import { useLocation } from "react-router-dom";
function AdminHeader() {
  const location = useLocation();

  let title = "대시보드"; // 기본값
  let subtitle = "게시물과 댓글 현황을 확인하세요"
  if (location.pathname.startsWith("/adminPage/users")) {
    title = "유저 관리";
    subtitle = "관리할 유저를 선택해주세요"
  } else if (location.pathname.startsWith("/adminPage/dashboard")) {
    title = "대시보드";
    subtitle = "게시물과 댓글 현황을 확인하세요"
  } else if (location.pathname.startsWith("/adminPage/bannerModify")) {
    title = "배너 이미지 관리";
    subtitle = "배너 이미지를 관리할 수 있습니다."
  }
  return (
    <div className="admin-header">
      <div className="admin-header__right">
        <h1 className="admin-header__title">{title}</h1>
        <p className="admin-header__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default AdminHeader;
