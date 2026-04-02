"use client";

import { TrendingUp, ShoppingBag, PieChart } from "lucide-react";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const insights = (data: ReturnType<typeof useGetSummary>["data"]) => {
  const topCategory  = data?.categories?.[0];
  const incomeChange = data?.incomeChange  ?? 0;
  const income       = data?.incomeAmount  ?? 0;
  const expenses     = Math.abs(data?.expensesAmount ?? 0);
  const ratio        = income > 0 ? Math.round((expenses / income) * 100) : 0;

  return [
    {
      icon: ShoppingBag,
      iconBg:    "bg-violet-100",
      iconColor: "text-violet-600",
      gradient:  "from-violet-50 to-white",
      border:    "border-t-violet-400",
      label:     "Highest Expense",
      value: topCategory
        ? `${topCategory.name} — ${formatCurrency(Math.abs(topCategory.value))}`
        : "No data yet",
    },
    {
      icon: TrendingUp,
      iconBg:    incomeChange >= 0 ? "bg-emerald-100" : "bg-rose-100",
      iconColor: incomeChange >= 0 ? "text-emerald-600" : "text-rose-500",
      gradient:  incomeChange >= 0 ? "from-emerald-50 to-white" : "from-rose-50 to-white",
      border:    incomeChange >= 0 ? "border-t-emerald-400" : "border-t-rose-400",
      label:     "Income Growth",
      value:     `${incomeChange >= 0 ? "+" : ""}${formatPercentage(incomeChange, { addPrefix: false })} vs last period`,
    },
    {
      icon: PieChart,
      iconBg:    ratio > 80 ? "bg-rose-100" : ratio > 50 ? "bg-amber-100" : "bg-blue-100",
      iconColor: ratio > 80 ? "text-rose-500" : ratio > 50 ? "text-amber-600" : "text-blue-600",
      gradient:  ratio > 80 ? "from-rose-50 to-white" : ratio > 50 ? "from-amber-50 to-white" : "from-blue-50 to-white",
      border:    ratio > 80 ? "border-t-rose-400" : ratio > 50 ? "border-t-amber-400" : "border-t-blue-400",
      label:     "Spending Ratio",
      value:     `${ratio}% of income spent`,
    },
  ];
};

export const InsightsSection = () => {
  const { data, isLoading } = useGetSummary();

  return (
    <div>
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-x-3">
        <div className="h-px flex-1 bg-gray-100" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Insights
        </h3>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {isLoading
          ? [0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl border-t-2 border-t-gray-100 bg-white p-5 shadow-card ring-1 ring-black/[0.03]"
              >
                <Skeleton className="mb-3 size-10 rounded-xl" />
                <Skeleton className="mb-1.5 h-3 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))
          : insights(data).map((ins, i) => {
              const Icon = ins.icon;
              return (
                <div
                  key={ins.label}
                  className={cn(
                    "animate-fade-in-up rounded-2xl border-t-2 bg-gradient-to-b p-5 shadow-card ring-1 ring-black/[0.03] transition hover:shadow-card-hover",
                    ins.gradient,
                    ins.border,
                    i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : "stagger-3"
                  )}
                >
                  <div className={cn("mb-3 inline-flex size-10 items-center justify-center rounded-xl", ins.iconBg)}>
                    <Icon className={cn("size-5", ins.iconColor)} />
                  </div>
                  <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                    {ins.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{ins.value}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};
