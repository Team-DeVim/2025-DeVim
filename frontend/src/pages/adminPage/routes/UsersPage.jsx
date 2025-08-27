import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserList } from "../../../api/DevimApi"; 
import "./UsersPage.css";

function normalizeUserPage(data) {
  const list = Array.isArray(data?.dtoList) ? data.dtoList : [];

  const size = Number(data?.pageRequestDTO?.size ?? 10);
  const page0 = Number(data?.current ?? data?.pageRequestDTO?.page ?? 0); // 0-based
  const totalPagesRaw = Number(data?.totalPage ?? 0);
  const totalPages = Math.max(1, totalPagesRaw || 1);
  const totalElements = Number(data?.totalCount ?? list.length);

  const pageNumList0 = Array.isArray(data?.pageNumList) ? data.pageNumList : [];
  const pages = pageNumList0.length
    ? pageNumList0.map((n) => Number(n) + 1) 
    : Array.from({ length: totalPages }, (_, i) => i + 1);

  return {
    list,
    page: page0 + 1, 
    size,
    totalPages,
    totalElements,
    hasPrev: !!data?.prev,
    hasNext: !!data?.next,
    pages,
  };
}

export default function UsersPage() {
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(Number(sp.get("page") || 1)); 
  const size = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState([]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        
        const data = await getUserList(page - 1, size, ac.signal);
        const std = normalizeUserPage(data);
        setRows(std.list);
        setTotalPages(std.totalPages);
        setPages(std.pages);
        setHasPrev(std.hasPrev);
        setHasNext(std.hasNext);
      } catch (e) {
        if (e?.name !== "CanceledError") console.error(e);
      } finally {
        setLoading(false);
      }
    })();

    setSp({ page: String(page) });
    return () => ac.abort();
  }, [page]);

  const goDetail = (userNo) => nav(`/adminPage/users/${userNo}`);

  return (
    <div className="admin-users">
      <div className="admin-users__panel">
        <div className="admin-users__empty-icon">
          {loading ? "로딩중…" : "≡"}
        </div>

        <table className="admin-users__table">
          <thead>
            <tr>
              <th>번호</th>
              <th>프로필</th>
              <th>ID</th>
              <th>이름</th>
              <th>계정 생성일</th>
              <th>활성 상태</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => {
              const active = !u.deleteFlag; 
              return (
                <tr
                  key={u.userNo}
                  onClick={() => goDetail(u.userNo)}
                  className="admin-users__row"
                >
                  <td>{u.userNo}</td>
                  <td>
                    <img
                      className="admin-users__avatar--sm"
                      src={u.profileImagePath || "/placeholder.png"}
                      alt=""
                    />
                  </td>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{(u.createdDt || "").slice(0, 10)}</td>
                  <td>{active ? "Y" : "N"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="admin-users__pagination">
          <button
            disabled={!hasPrev || page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            이전
          </button>

          {(pages?.length
            ? pages
            : Array.from({ length: totalPages }, (_, i) => i + 1)
          )
            .slice(0, 8)
            .map((p) => (
              <button
                key={p}
                className={`admin-users__page ${
                  p === page ? "admin-users__page--active" : ""
                }`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}

          <button
            disabled={!hasNext || page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
