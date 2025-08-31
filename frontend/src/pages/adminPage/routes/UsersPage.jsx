import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { api, USER_PREFIX, DEFAULT_PROFILE, thumbnailUrl } from "../../../api/DevimApi";
import "./UsersPage.css";


// API base url (vite 환경변수 또는 axios 기본값에서 가져옴)
const API_BASE =
  (api?.defaults?.baseURL ? api.defaults.baseURL.replace(/\/$/, "") : "") ||
  (import.meta?.env?.VITE_API_BASE
    ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
    : "");

// 기본 프로필 이미지 경로
// const PLACEHOLDER = `${API_BASE}/upload/profile/placeholder.png`;

/** 업로드 placeholder 절대 경로 */
// Devimapi에 통합
// const PLACEHOLDER = "/img/default_profile.png";

// 안전 숫자 변환. 숫자가 아니면 기본값 반환
const N = (v, d = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

// 페이지 번호 블록 크기 (한 번에 보여줄 페이지 번호 개수)
const BLOCK_SIZE = 10;

function normalizeFromServer(data, { size }) {
  const list = Array.isArray(data?.dtoList) ? data.dtoList : [];

  // 현재 페이지(1-base)
  const current =
    N(data?.current) > 0
      ? N(data.current)
      : N(data?.pageRequestDTO?.page, 0) + 1 || 1;

  // 총 페이지
  const totalCount = N(data?.totalCount ?? data?.totalElements, 0);
  let totalPages = N(data?.totalPage, 0);
  if (totalPages <= 0) {
    totalPages = size > 0 ? Math.max(1, Math.ceil(totalCount / size)) : 1;
  }

  // 페이지 목록
  let pages = [];
  if (Array.isArray(data?.pageNumList) && data.pageNumList.length) {
    const nums = data.pageNumList.map(N);
    const zeroBased = nums.some((n) => n === 0);
    pages = nums
      .map((n) => (zeroBased ? n + 1 : n))
      .filter((p) => p >= 1 && p <= totalPages)
      .filter((p, i, arr) => arr.indexOf(p) === i)
      .sort((a, b) => a - b);
  } else {
    const start =
      Math.floor((Math.max(1, current) - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
    const end = Math.min(totalPages, start + BLOCK_SIZE - 1);
    for (let p = start; p <= end; p++) pages.push(p);
  }
  if (!pages.length) pages = [1];

  const hasPrev = typeof data?.prev === "boolean" ? data.prev : current > 1;
  const hasNext =
    typeof data?.next === "boolean" ? data.next : current < totalPages;

  const prevPage =
    N(data?.prevPage) > 0
      ? N(data.prevPage)
      : Math.max(1, pages[0] - BLOCK_SIZE);

  const nextPage =
    N(data?.nextPage) > 0
      ? N(data.nextPage)
      : Math.min(totalPages, pages[pages.length - 1] + 1);

  return {
    list,
    page: Math.min(Math.max(1, current), totalPages),
    totalPages,
    pages,
    hasPrev,
    hasNext,
    prevPage,
    nextPage,
  };
}

// 프로필 이미지 존재 여부
// const hasProfile = (u) => !!String(u?.profileImagePath ?? "").trim();

// // 썸네일 URL 생성기
// const thumb = (userNo, w = 30, h = 30) =>
//   `${API_BASE}/api/v1/users/${encodeURIComponent(
//     userNo
//   )}/thumbnail?width=${w}&height=${h}&cb=${Date.now()}`;

// function hasProfile(user) {
//   return !!String(user?.profileImagePath ?? "").trim();
// }

// /** 썸네일 URL*/
// DevimApi로 통합처리
// function thumbnailUrl(userNo) {
//   return `${API_BASE}/api/v1/users/${encodeURIComponent(
//     userNo
//   )}/thumbnail?width=30&height=30&cb=${Date.now()}`;
// }


export default function UsersPage() {
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();

  const [rows, setRows] = useState([]);

  // 주소창 page는 1-base로 관리
  const [page, setPage] = useState(() => {
    const p = N(sp.get("page"), 1);
    return Math.max(1, p);
  });
  const size = 10;

  // 서버 계산을 그대로 보이는 페이저 상태
  const [pager, setPager] = useState({
    pages: [1],
    page: 1,
    totalPages: 1,
    hasPrev: false,
    hasNext: false,
    prevPage: 1,
    nextPage: 1,
  });


  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const { data } = await api.get(`${USER_PREFIX}`, {
          params: { page, size },
          signal: ac.signal,
        });

        const std = normalizeFromServer(data, { size });
        setRows(std.list);
        setPager(std);
      } catch (e) {
        if (e?.name !== "CanceledError") {
          console.error(e);
          alert("유저 목록을 불러오지 못했습니다.");
          setRows([]);
          setPager({
            pages: [1],
            page: 1,
            totalPages: 1,
            hasPrev: false,
            hasNext: false,
            prevPage: 1,
            nextPage: 1,
          });
        }
      }
    })();

    // 주소창 page 동기화(뒤로가기 고려)
    setSp({ page: String(page) }, { replace: true });
    return () => ac.abort();
  }, [page, size, setSp]);

  const goDetail = (userNo) => nav(`/adminPage/users/${userNo}`);

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
            {rows.map((u) => {
              const active = !u.deleteFlag;
              const created =
                typeof u.createdDt === "string" ? u.createdDt.slice(0, 10) : "";
              return (
                <tr
                  key={u.userNo}
                  className="admin-users__row"
                  onClick={() => goDetail(u.userNo)}
                >
                  <td>{u.userNo}</td>
                  <td>
                    <img
                      className="admin-users__avatar--sm"
                      src={thumbnailUrl(u.userNo, 30, 30)}
                      alt="프로필이미지"
                      onError={(e) => { e.currentTarget.src = DEFAULT_PROFILE; }}
                    />
                  </td>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{created}</td>
                  <td>{active ? "Y" : "N"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="admin-users__pagination">
          <button
            disabled={!pager.hasPrev || pager.page <= 1}
            onClick={() => setPage(pager.prevPage)} 
          >
            이전
          </button>

          {(pager.pages?.length ? pager.pages : [pager.page]).map((p) => (
            <button
              key={p}
              className={`admin-users__page ${
                p === pager.page ? "admin-users__page--active" : ""
              }`}
              onClick={() => setPage(p)} 
              disabled={p === pager.page}

            >
              {p}
            </button>
          ))}

          <button
            disabled={!pager.hasNext || pager.page >= pager.totalPages}
            onClick={() => setPage(pager.nextPage)} // 블록 점프
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
