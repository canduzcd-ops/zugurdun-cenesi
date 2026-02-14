import type { CategoryId, Category } from '@/core/types';

interface CategoryChipProps {
    category: Category;
    onToggle: (id: CategoryId) => void;
}

export function CategoryChip({ category, onToggle }: CategoryChipProps) {
    return (
        <button
            onClick={() => onToggle(category.id)}
            className={`
        flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wide font-mono
        transition-all duration-100 border-2 border-black dark:border-white
        ${category.enabled
                    ? 'bg-primary text-white shadow-brutal hover:shadow-none active:translate-x-[1px] active:translate-y-[1px]'
                    : 'bg-white dark:bg-black text-black dark:text-white shadow-brutal-sm hover:shadow-none active:translate-x-[1px] active:translate-y-[1px]'
                }
      `}
        >
            <span>{category.icon}</span>
            <span>{category.name}</span>
        </button>
    );
}

interface PresetChipProps {
    label: string;
    value: number;
    onClick: (value: number) => void;
}

export function PresetChip({ label, value, onClick }: PresetChipProps) {
    return (
        <button
            onClick={() => onClick(value)}
            className="px-4 py-2 text-sm font-bold bg-accent text-black border-2 border-black shadow-brutal-sm hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 uppercase tracking-wide font-mono"
        >
            {label}
        </button>
    );
}
