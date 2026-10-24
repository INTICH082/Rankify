'use client';

import { useState, useMemo } from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';
import {
  type MarketListing,
  type MarketViewMode,
  type MarketFiltersState,
  INITIAL_MARKET_FILTERS,
  INITIAL_MARKET_LISTINGS,
} from './market-data';
import { MarketFilters } from './MarketFilters';
import { MarketViewSwitcher } from './MarketViewSwitcher';
import { MarketItemCard } from './MarketItemCard';
import { cn } from '@/lib/utils';

export function MarketHub() {
  const [viewMode, setViewMode] = useState<MarketViewMode>('grid-3');
  const [filters, setFilters] = useState<MarketFiltersState>(INITIAL_MARKET_FILTERS);
  const [activeBuyItem, setActiveBuyItem] = useState<MarketListing | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    return INITIAL_MARKET_LISTINGS.filter((item) => {
      // Game filter
      if (filters.game !== 'all' && item.gameId !== filters.game) return false;

      // Search query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesRank = item.rankTitle.toLowerCase().includes(query);
        const matchesSeller = item.seller.username.toLowerCase().includes(query);
        const matchesHighlights = item.inventoryHighlights?.some((h) =>
          h.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesRank && !matchesSeller && !matchesHighlights) return false;
      }

      // Price filter
      if (filters.minPrice !== '' && item.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice !== '' && item.price > Number(filters.maxPrice)) return false;

      // Prime
      if (filters.onlyPrime && !item.hasPrime) return false;

      // Native email
      if (filters.onlyNativeEmail && !item.hasNativeEmail) return false;

      // VAC
      if (filters.onlyNoVac && item.hasVacBan) return false;

      // With inventory
      if (filters.withInventory && item.inventoryValue < 1000) return false;

      // Inactivity days
      if (filters.minInactivityDays > 0 && item.inactivityDays < filters.minInactivityDays) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'inventory_desc') return b.inventoryValue - a.inventoryValue;
      if (filters.sortBy === 'inactivity_desc') return b.inactivityDays - a.inactivityDays;
      return 0; // newest / default
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_MARKET_FILTERS);
  };

  const handleConfirmPurchase = () => {
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
      setActiveBuyItem(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Заголовок маркета */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
          Торговая площадка аккаунтов
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Безопасная покупка игровых аккаунтов Dota 2 и Counter-Strike 2 с гарантией Escrow
        </p>
      </div>

      {/* Панель фильтров (Playerok & Lolzteam style) */}
      <MarketFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Панель переключения сетки: список, по 2, по 3 */}
      <MarketViewSwitcher
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={filteredListings.length}
      />

      {/* Сетка товаров */}
      <div className="mt-6">
        {filteredListings.length === 0 ? (
          <div className="bg-[#1c1e26] p-12 rounded-2xl border border-white/10 text-center">
            <h3 className="text-base font-bold text-white mb-2">Товаров не найдено</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Попробуйте смягчить параметры поиска или сбросить фильтры.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-white text-neutral-900 rounded-xl font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Сбросить все фильтры
            </button>
          </div>
        ) : (
          <div
            className={cn(
              viewMode === 'list' && 'space-y-3',
              viewMode === 'grid-2' && 'grid grid-cols-1 md:grid-cols-2 gap-4',
              viewMode === 'grid-3' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            )}
          >
            {filteredListings.map((item) => (
              <MarketItemCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                onBuy={setActiveBuyItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно покупки через Escrow */}
      {activeBuyItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#1c1e26] border border-white/15 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Шапка модалки */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Оформление покупки</h3>
              <button
                type="button"
                onClick={() => setActiveBuyItem(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Детали лота */}
            <div className="bg-[#15161c] p-4 rounded-xl border border-white/5 space-y-2">
              <div className="text-sm font-semibold text-white leading-snug">
                {activeBuyItem.title}
              </div>
              <div className="flex justify-between text-xs text-neutral-400 pt-2 border-t border-white/5">
                <span>Продавец:</span>
                <span className="font-semibold text-white">{activeBuyItem.seller.username} (★ {activeBuyItem.seller.rating})</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Гарантия на возврат:</span>
                <span className="font-semibold text-emerald-400">{activeBuyItem.warrantyHours} часов</span>
              </div>
            </div>

            {/* Сумма */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-neutral-400">Сумма списания:</span>
              <span className="text-2xl font-black text-white">
                {activeBuyItem.price.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            {/* Безопасная сделка */}
            <div className="bg-[#15161c] p-3 rounded-xl border border-emerald-500/20 text-xs text-neutral-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-white block font-semibold mb-0.5">Escrow защита покупателя</strong>
                Деньги замораживаются. Данные от аккаунта передаются вам мгновенно. Продавец получит оплату только по истечении срока гарантии.
              </div>
            </div>

            {purchaseSuccess ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Оплата заблокирована в Escrow! Данные от аккаунта отправлены в ваш чат.</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveBuyItem(null)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#252834] hover:bg-[#2e3241] text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Купить в Escrow
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
