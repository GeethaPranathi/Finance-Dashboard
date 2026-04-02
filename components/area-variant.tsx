import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CustomTooltip } from "./custom-tooltip";

type AreaVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const AreaVariant = ({ data }: AreaVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f4" vertical={false} />

        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "11px", fill: "#9ca3af" }}
          tickMargin={12}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "11px", fill: "#9ca3af" }}
          tickFormatter={(v) => `$${Math.abs(v / 1000).toFixed(0)}k`}
        />

        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} />
          )}
        />

        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#6366f1"
          fill="url(#income)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: "#6366f1" }}
        />

        <Area
          type="monotone"
          dataKey="expenses"
          stackId="expenses"
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#expenses)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: "#f43f5e" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
