import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSideBar.css";

function AdminSideBar() {
  return (
    <nav className="admin-sidebar">
      <div className="admin-sidebar__logo">DeVim</div>
      <ul className="admin-sidebar__menu">
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              "admin-sidebar__item" +
              (isActive ? " admin-sidebar__item--active" : "")
            }
          >
            유저관리
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AdminSideBar;
