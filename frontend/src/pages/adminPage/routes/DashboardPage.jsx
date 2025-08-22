import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* MOCK / API 스위치 */
const USE_MOCK = true;

function toMonthlySeries(
  rows,
  { months = 12, end = new Date(), label = "MM" } = {}
) {
  const keys = [];
  const d = new Date(end.getFullYear(), end.getMonth(), 1);
  for (let i = 0; i < months; i++) {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    keys.unshift(`${y}-${String(m).padStart(2, "0")}`);
    d.setMonth(d.getMonth() - 1);
  }
  const map = new Map(keys.map((k) => [k, 0]));
  for (const r of rows || []) {
    const key = `${Number(r.year)}-${String(Number(r.month)).padStart(2, "0")}`;
    if (map.has(key)) map.set(key, (map.get(key) || 0) + Number(r.count || 0));
  }
  return keys.map((k) => {
    const [y, m] = k.split("-");
    return { key: k, year: Number(y), month: m, count: map.get(k) || 0 };
  });
}

/* 표: 1~12월 텍스트로 나열 */
function MonthlyCounts({ series }) {
  return (
    <div className="dash-months">
      {series.map((d) => (
        <div key={d.key} className="dash-months__row">
          <span className="dash-months__label">{d.month}월</span>
          <span className="dash-months__value">
            {d.count.toLocaleString()}개
          </span>
        </div>
      ))}
    </div>
  );
}

/* 최근 인기글 리스트 */
function PopularList({ items }) {
  return (
    <ul className="dash-list">
      {(items || []).map((it) => (
        <li key={it.id} className="dash-list__item">
          <span className="dash-list__title">{it.title}</span>
          <span className="dash-list__meta">❤ {it.like}</span>
        </li>
      ))}
    </ul>
  );
}

/* Bar 차트 카드 */
function ChartCard({ title, data, loading }) {
  const tick = (v) => `${v}월`;
  return (
    <div className="dash-card dash-card--chart">
      <div className="dash-card__title">{title}</div>
      <div className="dash-card__chart">
        {loading ? (
          <div className="dash-skeleton" />
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [postMonthly, setPostMonthly] = useState([]);
  const [commentMonthly, setCommentMonthly] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  useEffect(() => {
    if (USE_MOCK) {
      const postRows = [
        { year: 2025, month: 1, count: 120 },
        { year: 2025, month: 2, count: 98 },
        { year: 2025, month: 3, count: 135 },
        { year: 2025, month: 4, count: 180 },
        { year: 2025, month: 5, count: 165 },
        { year: 2025, month: 6, count: 210 },
        { year: 2025, month: 7, count: 188 },
        { year: 2025, month: 8, count: 232 },
        { year: 2025, month: 9, count: 205 },
        { year: 2025, month: 10, count: 240 },
        { year: 2025, month: 11, count: 198 },
        { year: 2025, month: 12, count: 260 },
      ];
      const commentRows = [
        { year: 2025, month: 1, count: 320 },
        { year: 2025, month: 2, count: 280 },
        { year: 2025, month: 3, count: 360 },
        { year: 2025, month: 4, count: 410 },
        { year: 2025, month: 5, count: 390 },
        { year: 2025, month: 6, count: 470 },
        { year: 2025, month: 7, count: 430 },
        { year: 2025, month: 8, count: 510 },
        { year: 2025, month: 9, count: 480 },
        { year: 2025, month: 10, count: 550 },
        { year: 2025, month: 11, count: 495 },
        { year: 2025, month: 12, count: 590 },
      ];
      setPostMonthly(toMonthlySeries(postRows));
      setCommentMonthly(toMonthlySeries(commentRows));
      setPopularPosts([
        { id: 101, title: "React 19 마이그레이션 가이드", like: 56 },
        { id: 102, title: "JPA N+1 완전정복", like: 49 },
        { id: 103, title: "스프링 시큐리티 JWT 베스트프랙티스", like: 44 },
        { id: 104, title: "Vite + React 프로젝트 구조", like: 40 },
      ]);
      return;
    }

    // ── API 버전 (예시) ──
    (async () => {
      try {
        setLoadingPost(true);
      } finally {
        setLoadingPost(false);
      }
    })();

    (async () => {
      try {
        setLoadingComment(true);
      } finally {
        setLoadingComment(false);
      }
    })();
  }, []);

  return (
    <div className="admin-dash">
      {/* 상단: 게시물 */}
      <section className="admin-dash__row">
        <div className="admin-dash__left">
          <ChartCard
            title="월별 게시물 개수"
            data={postMonthly}
            loading={loadingPost}
          />
        </div>
        <div className="admin-dash__right">
          {/* 통계 요약 = 1~12월 텍스트 */}
          <div className="dash-card dash-card--fill">
            <div className="dash-card__title">게시물 통계 요약</div>
            <MonthlyCounts series={postMonthly} />
          </div>
          {/* 최근 인기글 (게시물 섹션에만) */}
          <div className="dash-card dash-card--fill">
            <div className="dash-card__title">최근 인기글</div>
            <PopularList items={popularPosts} />
          </div>
        </div>
      </section>

      {/* 하단: 댓글 */}
      <section className="admin-dash__row">
        <div className="admin-dash__left">
          <ChartCard
            title="월별 댓글 개수"
            data={commentMonthly}
            loading={loadingComment}
          />
        </div>
        <div className="admin-dash__right">
          {/* 댓글 요약도 1~12월 텍스트 */}
          <div className="dash-card dash-card--fill">
            <div className="dash-card__title">댓글 통계 요약</div>
            <MonthlyCounts series={commentMonthly} />
          </div>
        </div>
      </section>
    </div>
  );
}
