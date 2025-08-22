import React from "react";
import "./AdminPage.css";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminSideBar from "./components/AdminSideBar/AdminSideBar";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__grid">
        <aside className="admin-page__sidebar">
          <AdminSideBar />
        </aside>

        <section className="admin-page__right">
          <header className="admin-page__header">
            <AdminHeader />
          </header>

          <main className="admin-page__main">
            <Outlet /> 
          </main>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
