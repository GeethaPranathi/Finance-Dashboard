import { type IconType } from "react-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

import { CountUp } from "./count-up";

const cardBorderVariant = cva(
  "rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:shadow-card-hover hover:scale-[1.015] relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-t-2 border-t-indigo-500",
        success: "border-t-2 border-t-emerald-500",
        danger:  "border-t-2 border-t-rose-500",
        warning: "border-t-2 border-t-amber-500",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const iconBoxVariant = cva("flex size-11 items-center justify-center rounded-2xl shadow-md", {
  variants: {
    variant: {
      default: "bg-gradient-to-br from-indigo-500 to-violet-600",
      success: "bg-gradient-to-br from-emerald-400 to-teal-600",
      danger:  "bg-gradient-to-br from-rose-400 to-pink-600",
      warning: "bg-gradient-to-br from-amber-400 to-orange-500",
    },
  },
  defaultVariants: { variant: "default" },
});

const iconVariant = cva("size-5 text-white", {
  variants: {
    variant: {
      default: "",
      success: "",
      danger:  "",
      warning: "",
    },
  },
  defaultVariants: { variant: "default" },
});

const trendBadge = (change: number) => {
  if (change > 0) return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (change < 0) return "bg-rose-50 text-rose-600 ring-1 ring-rose-200";
  return "bg-gray-100 text-gray-500";
};

type BoxVariants  = VariantProps<typeof iconBoxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

type DataCardProps = BoxVariants &
  IconVariants & {
    icon: IconType;
    title: string;
    value?: number;
    dateRange: string;
    percentageChange?: number;
  };

export const DataCard = ({
  title,
  value = 0,
  percentageChange = 0,
  icon: Icon,
  variant,
  dateRange,
}: DataCardProps) => {
  const TrendIcon =
    percentageChange > 0
      ? TrendingUp
      : percentageChange < 0
      ? TrendingDown
      : Minus;

  return (
    <div className={cn(cardBorderVariant({ variant }))}>
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-white/0 to-gray-50/80 blur-2xl" />

      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            {title}
          </p>
          <p className="text-[10px] text-gray-300">{dateRange}</p>
        </div>
        <div className={cn(iconBoxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </div>

      <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
        <CountUp
          preserveValue
          start={0}
          end={value}
          decimals={2}
          decimalPlaces={2}
          formattingFn={formatCurrency}
        />
      </h2>

      <div
        className={cn(
          "inline-flex items-center gap-x-1 rounded-full px-2.5 py-1 text-xs font-semibold",
          trendBadge(percentageChange)
        )}
      >
        <TrendIcon className="size-3" />
        <span>{formatPercentage(percentageChange, { addPrefix: true })} this period</span>
      </div>
    </div>
  );
};

export const DataCardLoading = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/[0.03] h-[172px] border-t-2 border-t-gray-100">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="size-11 rounded-2xl" />
      </div>
      <Skeleton className="mb-3 h-8 w-36" />
      <Skeleton className="h-5 w-28 rounded-full" />
    </div>
  );
};
