"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SERIES, INK } from "./palette";
import type { DaySeries } from "@/lib/db/analytics";

interface Props {
  data: DaySeries[];
  labels: { views: string; inquiries: string };
}

function shortDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return `${d.getUTCDate()}.${d.getUTCMonth() + 1}`;
}

/**
 * Views and inquiries share one y-axis on purpose — a dual-axis chart would
 * invent a visual correlation between two unrelated scales. If inquiry volume
 * ever becomes invisible next to view volume, split this into two charts
 * rather than adding a second axis.
 */
export default function TrendChart({ data, labels }: Props) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SERIES[0]} stopOpacity={0.28} />
              <stop offset="100%" stopColor={SERIES[0]} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillInq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SERIES[1]} stopOpacity={0.28} />
              <stop offset="100%" stopColor={SERIES[1]} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={INK.grid} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={shortDate}
            tick={{ fill: INK.muted, fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: INK.grid }}
            minTickGap={24}
          />
          <YAxis
            tick={{ fill: INK.muted, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={44}
          />
          <Tooltip
            labelFormatter={(v) => shortDate(String(v))}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e5e5e5",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              fontSize: 12,
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={28}
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: INK.secondary }}
          />
          <Area
            type="monotone"
            dataKey="views"
            name={labels.views}
            stroke={SERIES[0]}
            strokeWidth={2}
            fill="url(#fillViews)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="inquiries"
            name={labels.inquiries}
            stroke={SERIES[1]}
            strokeWidth={2}
            fill="url(#fillInq)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
