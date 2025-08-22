import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsersPage.css";

const MOCK_USERS = Array.from({ length: 68 }).map((_, i) => ({
  userNo: i + 1,
  id: `user${i + 1}`,
  name: `사용자 ${i + 1}`,
  createdDate: "2025-08-01",
  delete_flag: i % 3 === 0 ? 1 : 0, // 1=비활성, 0=활성
}));

export default function UsersPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const size = 10;

  const total = MOCK_USERS.length;
  const totalPages = Math.ceil(total / size);

  const pageData = useMemo(() => {
    const start = (page - 1) * size;
    return MOCK_USERS.slice(start, start + size);
  }, [page]);

  const goDetail = (userNo) => navigate(`/adminPage/users/${userNo}`);

  const changePage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const pages = useMemo(() => {
    const arr = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (page > 3) arr.push("…");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      )
        arr.push(i);
      if (page < totalPages - 2) arr.push("…");
      arr.push(totalPages);
    }
    return arr;
  }, [page, totalPages]);

  return (
    <div className="admin-users">
      <div className="admin-users__panel">
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
            {pageData.map((u) => (
              <tr
                key={u.userNo}
                onClick={() => goDetail(u.userNo)}
                className="admin-users__row"
              >
                <td>{u.userNo}</td>
                <td>
                  <img
                    className="admin-users__avatar admin-users__avatar--sm"
                    src={u.profileImageUrl || "https://placehold.co/30x30"}
                    alt={u.id}
                  />
                </td>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.createdDate}</td>
                {/* delete_flag: 0 → Y, 1 → N */}
                <td>{u.delete_flag === 0 ? "Y" : "N"}</td>
              </tr>
            ))}
          </tbody>
        </table>

          </div>
        <div className="admin-users__pagination">
          <button onClick={() => changePage(page - 1)} disabled={page === 1}>
            이전
          </button>
          {pages.map((p, idx) =>
            p === "…" ? (
              <span key={`ellipsis-${idx}`} className="admin-users__ellipsis">
                …
              </span>
            ) : (
              <button
              key={p}
              className={
                "admin-users__page" +
                (p === page ? " admin-users__page--delete_flag" : "")
              }
              onClick={() => changePage(p)}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            >
            다음
            </button>
      </div>
    </div>
  );
}
