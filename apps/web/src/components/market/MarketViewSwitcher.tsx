'use client';

import { List, Grid2X2, Grid3X3 } from 'lucide-react';
import { type MarketViewMode } from './market-data';
import { cn } from '@/lib/utils';

interface MarketViewSwitcherProps {
  viewMode: MarketViewMode;
  onViewModeChange: (mode: MarketViewMode) => void;
  totalCount: number;
}

export function MarketViewSwitcher({
  viewMode,
  onViewModeChange,
  totalCount,
}: MarketViewSwitcherProps) {
  return (
    <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/5">
      <div className="text-xs text-neutral-400">
        Найдено товаров: <span className="font-bold text-white">{totalCount}</span>
      </div>

      <div className="flex items-center gap-1 bg-[#1a1b22] p-1 rounded-xl border border-white/10 shadow-sm">
        {/* Режим 1: Список идущий вниз */}
        <button
          type="button"
          onClick={() => onViewModeChange('list')}
          aria-label="Список"
          title="Список товаров во всю ширину"
          className={cn(
            'p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
            viewMode === 'list'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          )}
        >
          <List className="w-4 h-4" />
          <span className="hidden sm:inline">Список</span>
        </button>

        {/* Режим 2: Сетка по 2 товара */}
        <button
          type="button"
          onClick={() => onViewModeChange('grid-2')}
          aria-label="Сетка по 2"
          title="Сетка по 2 товара"
          className={cn(
            'p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
            viewMode === 'grid-2'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          )}
        >
          <Grid2X2 className="w-4 h-4" />
          <span className="hidden sm:inline">По 2 товара</span>
        </button>

        {/* Режим 3: Сетка по 3 товара */}
        <button
          type="button"
          onClick={() => onViewModeChange('grid-3')}
          aria-label="Сетка по 3"
          title="Сетка по 3 товара"
          className={cn(
            'p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
            viewMode === 'grid-3'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          )}
        >
          <Grid3X3 className="w-4 h-4" />
          <span className="hidden sm:inline">По 3 товара</span>
        </button>
      </div>
    </div>
  );
}
