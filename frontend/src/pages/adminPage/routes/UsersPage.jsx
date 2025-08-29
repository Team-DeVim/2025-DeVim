import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../api/DevimApi";
import "./UsersPage.css";

/** API base url*/
const API_BASE =
  (api?.defaults?.baseURL ? api.defaults.baseURL.replace(/\/$/, "") : "") ||
  (import.meta?.env?.VITE_API_BASE
    ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
    : "");
/** 업로드 placeholder 절대 경로 */
const PLACEHOLDER = `${API_BASE}/upload/profile/placeholder.png`;

function clamp(n, min, max) {
  return Math.min(Math.max(Number(n) || 0, min), max);
}

function buildPagination(current, total, windowSize = 8) {
  const t = Math.max(1, Number(total) || 1);
  const c = clamp(current || 1, 1, t);

  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, c - half);
  let end = Math.min(t, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return {
    pages,
    current: c,
    total: t,
    hasPrev: c > 1,
    hasNext: c < t,
    prevPage: Math.max(1, c - 1),
    nextPage: Math.min(t, c + 1),
  };
}

function normalizeUserPage(data) {
  const list = Array.isArray(data?.dtoList) ? data.dtoList : [];
  const size = Number(data?.pageRequestDTO?.size ?? 10);

  const page0 = Number(
    data?.current ?? data?.pageRequestDTO?.page ?? data?.number ?? 0
  );
  const page = page0 + 1;

  // totalPages는 0이면 최소 1로 보정
  const totalPagesRaw = Number(
    data?.totalPage ?? data?.totalPages ?? data?.pages ?? 0
  );
  const totalPages = Math.max(1, totalPagesRaw || 1);

  const totalElements = Number(
    data?.totalCount ?? data?.totalElements ?? list.length
  );
  return { list, page, size, totalPages, totalElements };
}

function hasProfile(user) {
  return !!String(user?.profileImagePath ?? "").trim();
}

/** 썸네일 URL*/
function thumbnailUrl(userNo) {
  return `${API_BASE}/api/v1/users/${encodeURIComponent(
    userNo
  )}/thumbnail?width=30&height=30&cb=${Date.now()}`;
}

export default function UsersPage() {
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  // 쿼리스트링 page(1-base) 반영
  const [page, setPage] = useState(() =>
    clamp(Number(sp.get("page")) || 1, 1, 9999)
  );
  const size = 10;

  const [pager, setPager] = useState(() =>
    buildPagination(page, 1 /* totalPages 초기값 */)
  );

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

        // 백엔드가 0-base라 -1 해서 전달
        const { data } = await api.get("/api/v1/users", {
          params: { page: page - 1, size },
          signal: ac.signal,
        });

        const std = normalizeUserPage(data);
        setRows(std.list);
        // 프론트에서 신뢰 가능한 페이지네이션 계산
        setPager(buildPagination(page, std.totalPages, 8));
      } catch (e) {
        if (e?.name !== "CanceledError") {
          console.error(e);
          alert("유저 목록을 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    })();

    // 주소창 동기화
    setSp({ page: String(page) }, { replace: true });
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

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
            {rows.map((user) => {
              const active = !user.deleteFlag;
              const created =
                typeof user.createdDt === "string"
                  ? user.createdDt.slice(0, 10)
                  : "";

              return (
                <tr
                  key={user.userNo}
                  onClick={() => goDetail(user.userNo)}
                  className="admin-users__row"
                >
                  <td>{user.userNo}</td>
                  <td>
                    <img
                      className="admin-users__avatar--sm"
                      src={
                        hasProfile(user)
                          ? thumbnailUrl(user.userNo)
                          : PLACEHOLDER
                      }
                      alt=""
                      onError={(e) => {
                        // 네트워크/파일없음 대비: 무한루프 방지
                        if (e.currentTarget.src !== PLACEHOLDER) {
                          e.currentTarget.src = PLACEHOLDER;
                        }
                      }}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{created}</td>
                  <td>{active ? "Y" : "N"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="admin-users__pagination">
          <button
            disabled={!pager.hasPrev}
            onClick={() => setPage(pager.prevPage)}
          >
            이전
          </button>

          {pager.pages.map((p) => (
            <button
              key={p}
              className={`admin-users__page ${
                p === pager.current ? "admin-users__page--active" : ""
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            disabled={!pager.hasNext}
            onClick={() => setPage(pager.nextPage)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
