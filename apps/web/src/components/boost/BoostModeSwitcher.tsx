'use client';

import { Sparkles, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BoostMode = 'order' | 'feed';

interface BoostModeSwitcherProps {
  mode: BoostMode;
  onModeChange: (mode: BoostMode) => void;
  openOrdersCount: number;
}

export function BoostModeSwitcher({
  mode,
  onModeChange,
  openOrdersCount,
}: BoostModeSwitcherProps) {
  return (
    <div className="flex justify-center my-6 px-4">
      <div className="bg-[#1c1e26] p-1.5 rounded-2xl border border-white/10 shadow-lg flex items-center gap-1.5 max-w-md w-full">
        {/* Кнопка режима: Заказать буст */}
        <button
          type="button"
          onClick={() => onModeChange('order')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none',
            mode === 'order'
              ? 'bg-white text-neutral-900 shadow-md'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          )}
        >
          <Sparkles className={cn('w-4 h-4', mode === 'order' ? 'text-red-600' : 'text-neutral-400')} />
          <span>Заказать буст</span>
        </button>

        {/* Кнопка режима: Биржа заказов */}
        <button
          type="button"
          onClick={() => onModeChange('feed')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none',
            mode === 'feed'
              ? 'bg-white text-neutral-900 shadow-md'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          )}
        >
          <Briefcase className={cn('w-4 h-4', mode === 'feed' ? 'text-red-600' : 'text-neutral-400')} />
          <span>Биржа заказов</span>
          <span
            className={cn(
              'ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-md',
              mode === 'feed' ? 'bg-red-100 text-red-700' : 'bg-[#2a2d39] text-neutral-300'
            )}
          >
            {openOrdersCount}
          </span>
        </button>
      </div>
    </div>
  );
}
