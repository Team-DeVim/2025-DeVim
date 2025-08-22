import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./AdminSideBar.css";

function AdminSideBar() {
  return (
    <nav className="admin-sidebar">
      <div className="admin-sidebar__top">
        <Link
          to="/main"
          className="admin-sidebar__logo"
          aria-label="DeVim 홈으로"
        >
          DeVim
        </Link>
      </div>

      <ul className="admin-sidebar__menu">
        <li>
          <NavLink
            to="/adminPage/users"
            end
            className={({ isActive }) =>
              "admin-sidebar__item" +
              (isActive ? " admin-sidebar__item--active" : "")
            }
          >
            유저관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adminPage/dashboard"
            end
            className={({ isActive }) =>
              "admin-sidebar__item" +
              (isActive ? " admin-sidebar__item--active" : "")
            }
          >
            메인 대시보드
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adminPage/banner"
            end
            className={({ isActive }) =>
              "admin-sidebar__item" +
              (isActive ? " admin-sidebar__item--active" : "")
            }
          >
            배너이미지 관리
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AdminSideBar;
