import { format } from "date-fns";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CustomTooltip } from "@/components/custom-tooltip";

type LineVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const LineVariant = ({ data }: LineVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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

        <Line
          type="monotone"
          dot={false}
          dataKey="income"
          stroke="#6366f1"
          strokeWidth={2}
          activeDot={{ r: 4, strokeWidth: 0, fill: "#6366f1" }}
        />
        <Line
          type="monotone"
          dot={false}
          dataKey="expenses"
          stroke="#f43f5e"
          strokeWidth={2}
          activeDot={{ r: 4, strokeWidth: 0, fill: "#f43f5e" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
