import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminSideBar from "./components/AdminSideBar/AdminSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchMyInfo } from "../../api/DevimApi";

function AdminPage() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 내 정보 불러오기
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetchMyInfo(controller.signal)
      .then((data) => setMe(data))
      .catch((e) => {
        if (e?.code === "ERR_CANCELED" || e?.name === "CanceledError") return;
        console.error(e);
        setError("내 정보 조회에 실패했습니다.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (loading) return;
    const isAdmin = me?.roleList?.some((r) => r.role === "ROLE_ADMIN");
    if (!isAdmin) {
      alert("관리자 권한이 필요합니다.");
      navigate("/main", { replace: true });
    }
  }, [loading, me, navigate]);

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page__grid">
          <aside className="admin-page__sidebar skeleton" />
          <section className="admin-page__right">
            <header className="admin-page__header skeleton" />
            <main className="admin-page__main">로딩 중…</main>
          </section>
        </div>
      </div>
    );
  }

  const isAdmin = me?.roleList?.some((r) => r.role === "ROLE_ADMIN");
  if (!isAdmin) return null;

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
