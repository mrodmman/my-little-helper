import { cn } from "@/lib/utils";

interface CategoryChipsProps {
  categories: string[];
  selected?: string;
  onSelect?: (cat: string) => void;
}

export function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  const all = ["All", ...categories];
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const active = cat === "All" ? !selected || selected === "All" : selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect?.(cat === "All" ? "" : cat)}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium border transition-all",
              active
                ? "bg-[#2563FF] text-white border-[#2563FF]"
                : "bg-white text-[#556070] border-[#C8C3BA]/60 hover:border-[#2563FF]/40 hover:text-[#2563FF]",
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
