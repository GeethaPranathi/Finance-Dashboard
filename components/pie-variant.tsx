"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatPercentage } from "@/lib/utils";
import { CategoryTooltip } from "./category-tooltip";

const COLORS = [
  "#6366f1", // indigo
  "#f43f5e", // rose
  "#10b981", // emerald
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#ef4444", // red
];

type PieVariantProps = {
  data: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data }: PieVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }) => {
            return (
              <ul className="flex flex-col space-y-2 pt-2">
                {payload?.map((entry, index) => (
                  <li key={`item-${index}`} className="flex items-center gap-x-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="flex items-center gap-x-1.5">
                      <span className="text-xs text-gray-500">{entry.value}</span>
                      <span className="text-xs font-medium text-gray-800">
                        {formatPercentage(
                          (entry.payload as unknown as { percent: number }).percent * 100
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />

        <Tooltip
          content={({ active, payload }) => (
            <CategoryTooltip active={active} payload={payload} />
          )}
        />

        <Pie
          data={data}
          cx="50%"
          cy="45%"
          outerRadius={95}
          innerRadius={62}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
          strokeWidth={2}
          stroke="hsl(220 20% 97%)"
        >
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
