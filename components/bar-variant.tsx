import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CustomTooltip } from "@/components/custom-tooltip";

type BarVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: BarVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="35%">
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
          cursor={{ fill: "rgba(99,102,241,0.04)" }}
        />

        <Bar dataKey="income"   fill="#6366f1" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
