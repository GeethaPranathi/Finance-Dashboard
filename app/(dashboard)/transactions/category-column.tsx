import { TriangleAlert } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { cn } from "@/lib/utils";

// Deterministic color from category name
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  food:          { bg: "bg-amber-100",   text: "text-amber-700" },
  groceries:     { bg: "bg-green-100",   text: "text-green-700" },
  shopping:      { bg: "bg-violet-100",  text: "text-violet-700" },
  transport:     { bg: "bg-blue-100",    text: "text-blue-700" },
  entertainment: { bg: "bg-pink-100",    text: "text-pink-700" },
  health:        { bg: "bg-teal-100",    text: "text-teal-700" },
  housing:       { bg: "bg-orange-100",  text: "text-orange-700" },
  utilities:     { bg: "bg-cyan-100",    text: "text-cyan-700" },
  travel:        { bg: "bg-sky-100",     text: "text-sky-700" },
  salary:        { bg: "bg-emerald-100", text: "text-emerald-700" },
};

const FALLBACK_COLORS = [
  { bg: "bg-indigo-100",  text: "text-indigo-700" },
  { bg: "bg-rose-100",    text: "text-rose-700" },
  { bg: "bg-lime-100",    text: "text-lime-700" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
];

function getCategoryColor(name: string | null) {
  if (!name) return null;
  const key = name.toLowerCase();
  if (CATEGORY_COLORS[key]) return CATEGORY_COLORS[key];
  // hash to pick from fallbacks
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}

type CategoryColumnProps = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: CategoryColumnProps) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) onOpenCategory(categoryId);
    else onOpenTransaction(id);
  };

  const color = getCategoryColor(category);

  if (!category) {
    return (
      <button
        onClick={onClick}
        className="flex cursor-pointer items-center gap-x-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-500 transition hover:bg-rose-100"
      >
        <TriangleAlert className="size-3 shrink-0" />
        Uncategorized
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center rounded-full px-2.5 py-1 text-xs font-medium transition hover:opacity-80",
        color ? `${color.bg} ${color.text}` : "bg-gray-100 text-gray-600"
      )}
    >
      {category}
    </button>
  );
};
