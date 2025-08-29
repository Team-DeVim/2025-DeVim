// src/pages/adminPage/routes/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import { api } from "../../../api/DevimApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function inferEndFrom(rows = []) {
  let y = 0,
    m = 0;
  for (const r of rows) {
    const yy = Number(r?.year ?? 0);
    const mm = Number(r?.month ?? 0);
    if (yy > y || (yy === y && mm > m)) {
      y = yy;
      m = mm;
    }
  }
  return y > 0 && m > 0 ? new Date(y, m - 1, 1) : new Date();
}

/* year, month, count → 최근 12개월 시계열(누락 월 0 보정) */
function toMonthlySeries(rows, { months = 12, end } = {}) {
  const endDate = end || inferEndFrom(rows);
  const keys = [];
  const d = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  for (let i = 0; i < months; i++) {
    keys.unshift(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    );
    d.setMonth(d.getMonth() - 1);
  }
  const map = new Map(keys.map((k) => [k, 0]));
  for (const r of rows || []) {
    const key = `${Number(r.year)}-${String(Number(r.month)).padStart(2, "0")}`;
    if (map.has(key)) map.set(key, (map.get(key) || 0) + Number(r.count || 0));
  }
  return keys.map((k) => {
    const [y, m] = k.split("-");
    return {
      key: k,
      year: Number(y),
      month: Number(m),
      count: map.get(k) || 0,
    };
  });
}

/* 월별 통계 요약 */
function MonthlyTable({ series }) {
  const cells = (series || []).slice(0, 12).map((d) => ({
    key: d.key,
    label: `${d.month}월`,
    value: d.count,
  }));
  while (cells.length < 12)
    cells.push({ key: `pad-${cells.length}`, label: "", value: "" });

  const rows = [];
  for (let i = 0; i < 12; i += 3) rows.push(cells.slice(i, i + 3));

  return (
    <table className="dash-months-table">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={`${i}-${j}`}>
                <div className="dash-months-td">
                  <span className="dash-months-td__label">{c.label}</span>
                  <span className="dash-months-td__dot" />
                  <span className="dash-months-td__value">
                    {c.value === ""
                      ? ""
                      : `${Number(c.value).toLocaleString()}개`}
                  </span>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* 인기글 */
function PopularList({ items }) {
  return (
    <ul className="dash-list">
      {(items || []).slice(0, 4).map((it) => (
        <li key={it.id} className="dash-list__item">
          <span className="dash-list__title">{it.title}</span>
          <span className="dash-list__meta">
            ❤ {it.like} · 💬 {it.comment}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* 차트 카드 */
function ChartCard({ title, data }) {
  const tick = (v) => `${v}월`;
  return (
    <div className="dash-card dash-card--chart">
      <div className="dash-card__title">{title}</div>
      <div className="dash-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={22}>
            <CartesianGrid vertical={false} strokeOpacity={0.25} />
            <XAxis
              dataKey="month"
              tickFormatter={tick}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ opacity: 0.1 }}
              labelFormatter={(_, i) => data?.[i]?.key ?? ""}
              formatter={(v) => [v, "개수"]}
            />
            <Bar dataKey="count" fill="currentColor" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [postMonthly, setPostMonthly] = useState([]);
  const [commentMonthly, setCommentMonthly] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    // axios v1 기준: transformRequest에서 인터셉터가 붙인 헤더를 제거
    const stripAuth = (data, headers) => {
      // AxiosHeaders 타입이면 delete가 있음
      if (headers?.delete) headers.delete("Authorization");
      // 일부 버전 호환
      if ("Authorization" in (headers || {})) headers.Authorization = undefined;
      return data;
    };

    (async () => {
      try {
        const [postsRes, commentsRes, popularRes] = await Promise.all([
          api.get("/api/v1/boards/monthly-counts", {
            signal: ac.signal,
            transformRequest: [stripAuth],
          }),
          api.get("/api/v1/comments/monthly-counts", {
            signal: ac.signal,
            transformRequest: [stripAuth],
          }),
          api.get("/api/v1/boards/popular", {
            params: { limit: 4 },
            signal: ac.signal,
            transformRequest: [stripAuth],
          }),
        ]);

        const posts = Array.isArray(postsRes?.data) ? postsRes.data : [];
        const comments = Array.isArray(commentsRes?.data)
          ? commentsRes.data
          : [];
        const popular = Array.isArray(popularRes?.data) ? popularRes.data : [];

        setPostMonthly(toMonthlySeries(posts, { end: inferEndFrom(posts) }));
        setCommentMonthly(
          toMonthlySeries(comments, { end: inferEndFrom(comments) })
        );
        setPopularPosts(
          popular.slice(0, 4).map((p) => ({
            id: p.boardNo,
            title: p.title,
            like: Number(p.likeCount ?? 0),
            comment: Number(p.commentCount ?? 0),
          }))
        );
      } catch (e) {
        if (e?.name !== "CanceledError") {
          console.error("[Dashboard] fetch error:", e);
        }
      }
    })();

    return () => ac.abort();
  }, []);

  return (
    <div className="admin-dash">
      {/* 왼쪽: 차트 2개 (1:1) */}
      <div className="admin-dash__left">
        <ChartCard title="월별 게시물 개수" data={postMonthly} />
        <ChartCard title="월별 댓글 개수" data={commentMonthly} />
      </div>

      {/* 오른쪽: 2 : 3 : 2 */}
      <div className="admin-dash__right">
        <div className="dash-card">
          <div className="dash-card__title">게시물 통계 요약</div>
          <MonthlyTable series={postMonthly} />
        </div>

        <div className="dash-card">
          <div className="dash-card__title">최근 인기글</div>
          <PopularList items={popularPosts} />
        </div>

        <div className="dash-card">
          <div className="dash-card__title">댓글 통계 요약</div>
          <MonthlyTable series={commentMonthly} />
        </div>
      </div>
    </div>
  );
}
