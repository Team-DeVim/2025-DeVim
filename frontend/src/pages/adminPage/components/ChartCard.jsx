import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ChartCard({ title, data = [], loading = false }) {
  const tick = (v) => `${v}월`;
  return (
    <div className="dash-card dash-card--chart">
      <div className="dash-card__title">{title}</div>
      <div className="dash-card__chart">
        {loading ? (
          <div className="dash-skeleton" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={postMonthly} barSize={22}>
              <CartesianGrid vertical={false} strokeOpacity={0.25} />
              <XAxis
                dataKey="month"
                tickFormatter={tick}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                labelFormatter={(_, idx) => postMonthly[idx]?.key}
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
