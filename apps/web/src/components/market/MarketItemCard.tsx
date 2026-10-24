'use client';

import { ShieldCheck, Mail, Clock, ShoppingBag, Star, AlertTriangle, Sparkles } from 'lucide-react';
import { Dota2Logo, CS2Logo, FaceitLogo } from '@/components/icons/GameLogos';
import { type MarketListing, type MarketViewMode } from './market-data';
import { cn } from '@/lib/utils';

interface MarketItemCardProps {
  item: MarketListing;
  viewMode: MarketViewMode;
  onBuy: (item: MarketListing) => void;
}

export function MarketItemCard({ item, viewMode, onBuy }: MarketItemCardProps) {
  const isList = viewMode === 'list';
  const isGrid2 = viewMode === 'grid-2';

  return (
    <div
      className={cn(
        'bg-[#1c1e26] hover:bg-[#20222b] border border-white/10 rounded-2xl transition-all shadow-md group flex',
        isList
          ? 'flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 gap-4'
          : 'flex-col justify-between p-5'
      )}
    >
      {/* Основная часть информации */}
      <div className={cn('flex items-start gap-3.5', isList ? 'flex-1' : 'flex-col w-full')}>
        {/* Иконка игры */}
        <div
          className={cn(
            'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border',
            item.gameId === 'dota2'
              ? 'bg-red-600/15 border-red-500/20'
              : item.subType === 'faceit'
              ? 'bg-orange-500/15 border-orange-500/20'
              : 'bg-amber-500/15 border-amber-500/20',
            !isList && 'mb-1'
          )}
        >
          {item.gameId === 'dota2' ? (
            <Dota2Logo className="w-6 h-6 text-red-500" />
          ) : item.subType === 'faceit' ? (
            <FaceitLogo className="w-5 h-5 text-orange-500" />
          ) : (
            <CS2Logo className="w-6 h-6 text-amber-500" />
          )}
        </div>

        {/* Текст и атрибуты */}
        <div className="flex-1 min-w-0">
          {/* Верхняя строка: Ранг и бейджи игры */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className="text-xs font-bold text-white bg-[#15161c] px-2.5 py-0.5 rounded-md border border-white/10">
              {item.rankTitle}
            </span>
            {item.hasPrime && (
              <span className="text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded-md">
                Prime
              </span>
            )}
            {item.hasNativeEmail && (
              <span className="text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Родная почта
              </span>
            )}
            {item.inactivityDays > 0 && (
              <span className="text-[11px] font-medium bg-[#15161c] text-neutral-300 border border-white/5 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-400" />
                Отлега {item.inactivityDays} дн.
              </span>
            )}
          </div>

          {/* Заголовок объявления */}
          <h3
            className={cn(
              'font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-2',
              isList ? 'text-sm' : isGrid2 ? 'text-base' : 'text-sm'
            )}
          >
            {item.title}
          </h3>

          {/* Инвентарь и подсветка ценных скинов */}
          {item.inventoryValue > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 mb-2">
              <span className="text-indigo-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Скины: {item.inventoryValue.toLocaleString('ru-RU')} ₽
              </span>
              {item.inventoryHighlights && item.inventoryHighlights.length > 0 && (
                <span className="text-neutral-500 text-[11px]">
                  ({item.inventoryHighlights.slice(0, 2).join(', ')})
                </span>
              )}
            </div>
          )}

          {/* Данные о продавце */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="relative flex items-center gap-1.5 font-medium text-neutral-300">
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  item.seller.isOnline ? 'bg-emerald-500' : 'bg-neutral-600'
                )}
              />
              {item.seller.username}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-amber-400 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400" />
              {item.seller.rating.toFixed(1)}
            </span>
            <span className="text-neutral-500 text-[11px]">({item.seller.salesCount} отзывов)</span>
            <span>•</span>
            <span className="text-emerald-400 text-[11px]">Гарантия {item.warrantyHours}ч</span>
          </div>
        </div>
      </div>

      {/* Правая часть (или подвал для сетки): Цена и кнопка покупки */}
      <div
        className={cn(
          'flex items-center justify-between gap-4 shrink-0',
          isList
            ? 'sm:flex-col sm:items-end sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5'
            : 'border-t border-white/5 pt-4 mt-4 w-full'
        )}
      >
        <div className={cn(isList ? 'sm:text-right' : 'text-left')}>
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {item.price.toLocaleString('ru-RU')} ₽
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3 h-3" />
            <span>Escrow гарантия</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onBuy(item)}
          className="py-2.5 px-5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Купить
        </button>
      </div>
    </div>
  );
}
