import React from "react";
import "./AdminHeader.css";

function AdminHeader() {
  return (
    <div className="admin-header">

      <div className="admin-header__right">
        <h1 className="admin-header__title">유저관리</h1>
        <p className="admin-header__subtitle">관리할 유저를 선택해주세요.</p>
      </div>
    </div>
  );
}

export default AdminHeader;
