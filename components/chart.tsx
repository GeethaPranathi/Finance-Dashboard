"use client";

import { AreaChart, BarChart3, LineChart, FileSearch, Loader2 } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { AreaVariant } from "./area-variant";
import { BarVariant } from "./bar-variant";
import { LineVariant } from "./line-variant";

type ChartType = "area" | "bar" | "line";

const chartTypes: { value: ChartType; label: string; icon: React.ElementType }[] = [
  { value: "area", label: "Area",  icon: AreaChart  },
  { value: "bar",  label: "Bar",   icon: BarChart3  },
  { value: "line", label: "Line",  icon: LineChart  },
];

type ChartProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const Chart = ({ data = [] }: ChartProps) => {
  const [chartType, setChartType] = useState<ChartType>("area");

  return (
    <Card className="border-none shadow-card ring-1 ring-black/[0.03]">
      <CardHeader className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
        <CardTitle className="line-clamp-1 text-base font-semibold text-gray-900">
          Transactions
        </CardTitle>

        {/* Segmented control */}
        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
          {chartTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setChartType(value)}
              className={cn(
                "flex items-center gap-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150",
                chartType === value
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/[0.05]"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gray-100">
              <FileSearch className="size-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">No data for this period</p>
          </div>
        ) : (
          <>
            {chartType === "area" && <AreaVariant data={data} />}
            {chartType === "bar"  && <BarVariant  data={data} />}
            {chartType === "line" && <LineVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const ChartLoading = () => {
  return (
    <Card className="border-none shadow-card ring-1 ring-black/[0.03]">
      <CardHeader className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-[148px] rounded-xl" />
      </CardHeader>
      <CardContent>
        <div className="flex h-[350px] w-full items-center justify-center">
          <Loader2 className="size-6 animate-spin text-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
};
