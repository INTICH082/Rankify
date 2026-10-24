'use client';

import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Dota2Logo, CS2Logo } from '@/components/icons/GameLogos';
import { type MarketFiltersState, type GameFilter } from './market-data';
import { cn } from '@/lib/utils';

interface MarketFiltersProps {
  filters: MarketFiltersState;
  onChange: (filters: MarketFiltersState) => void;
  onReset: () => void;
}

export function MarketFilters({ filters, onChange, onReset }: MarketFiltersProps) {
  const updateFilter = <K extends keyof MarketFiltersState>(
    key: K,
    value: MarketFiltersState[K]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.game !== 'all' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.onlyPrime ||
    filters.onlyNativeEmail ||
    !filters.onlyNoVac ||
    filters.withInventory ||
    filters.minInactivityDays > 0 ||
    filters.sortBy !== 'newest';

  return (
    <div className="bg-[#1c1e26] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg space-y-4 mb-6">
      {/* Верхний ряд: Поиск и переключение игр */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
        {/* Поисковая строка в стиле Playerok / Lolzteam */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            placeholder="Поиск по скинам, званию, арканам, Faceit, ножам..."
            className="w-full pl-10 pr-9 py-2.5 bg-[#15161c] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white/30 transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Выбор игры с официальными логотипами */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            type="button"
            onClick={() => updateFilter('game', 'all')}
            className={cn(
              'px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer',
              filters.game === 'all'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'bg-[#15161c] border border-white/5 text-neutral-300 hover:text-white hover:bg-white/5'
            )}
          >
            Все игры
          </button>
          <button
            type="button"
            onClick={() => updateFilter('game', 'dota2')}
            className={cn(
              'px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2',
              filters.game === 'dota2'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'bg-[#15161c] border border-white/5 text-neutral-300 hover:text-white hover:bg-white/5'
            )}
          >
            <Dota2Logo className="w-4 h-4 text-red-500" />
            <span>Dota 2</span>
          </button>
          <button
            type="button"
            onClick={() => updateFilter('game', 'cs2')}
            className={cn(
              'px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2',
              filters.game === 'cs2'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'bg-[#15161c] border border-white/5 text-neutral-300 hover:text-white hover:bg-white/5'
            )}
          >
            <CS2Logo className="w-4 h-4 text-amber-500" />
            <span>CS2</span>
          </button>
        </div>
      </div>

      {/* Средний ряд: Цена, Отлега и Сортировка */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
        {/* Фильтр цены: От / До */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Цена, ₽:</span>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            placeholder="От"
            className="w-20 px-2.5 py-1.5 bg-[#15161c] border border-white/10 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white/30"
          />
          <span className="text-neutral-600">—</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            placeholder="До"
            className="w-20 px-2.5 py-1.5 bg-[#15161c] border border-white/10 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white/30"
          />
        </div>

        {/* Отлега (Фирменная фишка Lolzteam) */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-neutral-400 font-medium mr-1">Отлега:</span>
          {[
            { label: 'Любая', value: 0 },
            { label: '> 7 дн.', value: 7 },
            { label: '> 30 дн.', value: 30 },
            { label: '> 90 дн.', value: 90 },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateFilter('minInactivityDays', item.value)}
              className={cn(
                'px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer',
                filters.minInactivityDays === item.value
                  ? 'bg-neutral-200 text-neutral-900 font-bold'
                  : 'bg-[#15161c] text-neutral-400 hover:text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Сортировка */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as MarketFiltersState['sortBy'])}
            className="px-2.5 py-1.5 bg-[#15161c] border border-white/10 rounded-lg text-xs text-white focus:outline-hidden cursor-pointer"
          >
            <option value="newest">Сначала новые</option>
            <option value="price_asc">Сначала дешевле</option>
            <option value="price_desc">Сначала дороже</option>
            <option value="inventory_desc">Дорогой инвентарь</option>
            <option value="inactivity_desc">Максимальная отлега</option>
          </select>
        </div>
      </div>

      {/* Нижний ряд: Быстрые теги и тумблеры (Playerok / Lolz style) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Только Prime */}
          <button
            type="button"
            onClick={() => updateFilter('onlyPrime', !filters.onlyPrime)}
            className={cn(
              'px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 select-none',
              filters.onlyPrime
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-semibold'
                : 'bg-[#15161c] border-white/5 text-neutral-400 hover:text-white'
            )}
          >
            <span>Только Prime</span>
          </button>

          {/* Родная почта */}
          <button
            type="button"
            onClick={() => updateFilter('onlyNativeEmail', !filters.onlyNativeEmail)}
            className={cn(
              'px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 select-none',
              filters.onlyNativeEmail
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold'
                : 'bg-[#15161c] border-white/5 text-neutral-400 hover:text-white'
            )}
          >
            <span>Родная почта</span>
          </button>

          {/* С инвентарём */}
          <button
            type="button"
            onClick={() => updateFilter('withInventory', !filters.withInventory)}
            className={cn(
              'px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 select-none',
              filters.withInventory
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 font-semibold'
                : 'bg-[#15161c] border-white/5 text-neutral-400 hover:text-white'
            )}
          >
            <span>С инвентарём (&gt; 1 000 ₽)</span>
          </button>

          {/* Без банов */}
          <button
            type="button"
            onClick={() => updateFilter('onlyNoVac', !filters.onlyNoVac)}
            className={cn(
              'px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 select-none',
              filters.onlyNoVac
                ? 'bg-white/15 border-white/30 text-white font-semibold'
                : 'bg-[#15161c] border-white/5 text-neutral-400 hover:text-white'
            )}
          >
            <span>Без VAC / блокировок</span>
          </button>
        </div>

        {/* Кнопка сброса */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Сбросить фильтры</span>
          </button>
        )}
      </div>
    </div>
  );
}
