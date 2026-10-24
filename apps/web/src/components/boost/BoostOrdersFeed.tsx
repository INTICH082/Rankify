'use client';

import { useState } from 'react';
import { Users, Zap, Clock, Star, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { INITIAL_FEED_ORDERS, type FeedOrder } from './boost-data';
import { Dota2Logo, CS2Logo, FaceitLogo } from '@/components/icons/GameLogos';
import { cn } from '@/lib/utils';

export function BoostOrdersFeed() {
  const [orders, setOrders] = useState<FeedOrder[]>(INITIAL_FEED_ORDERS);
  const [gameFilter, setGameFilter] = useState<'all' | 'dota2' | 'cs2'>('all');
  const [modeFilter, setModeFilter] = useState<'all' | 'solo' | 'duo'>('all');
  const [claimedOrder, setClaimedOrder] = useState<string | null>(null);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (gameFilter !== 'all' && order.gameId !== gameFilter) return false;
    if (modeFilter === 'solo' && order.isDuo) return false;
    if (modeFilter === 'duo' && !order.isDuo) return false;
    return true;
  });

  const handleClaimOrder = (orderId: string) => {
    setClaimedOrder(orderId);
    setTimeout(() => {
      // Remove or mark as claimed
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setClaimedOrder(null);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      {/* Панель фильтров */}
      <div className="bg-[#1c1e26] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Фильтр по играм */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-semibold mr-1">Игра:</span>
          <button
            type="button"
            onClick={() => setGameFilter('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
              gameFilter === 'all'
                ? 'bg-white text-neutral-900 font-bold'
                : 'bg-[#252834] text-neutral-300 hover:text-white hover:bg-[#2e3241]'
            )}
          >
            Все игры
          </button>
          <button
            type="button"
            onClick={() => setGameFilter('dota2')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5',
              gameFilter === 'dota2'
                ? 'bg-white text-neutral-900 font-bold'
                : 'bg-[#252834] text-neutral-300 hover:text-white hover:bg-[#2e3241]'
            )}
          >
            <Dota2Logo className="w-3.5 h-3.5 text-red-500" />
            <span>Dota 2</span>
          </button>
          <button
            type="button"
            onClick={() => setGameFilter('cs2')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5',
              gameFilter === 'cs2'
                ? 'bg-white text-neutral-900 font-bold'
                : 'bg-[#252834] text-neutral-300 hover:text-white hover:bg-[#2e3241]'
            )}
          >
            <CS2Logo className="w-3.5 h-3.5 text-amber-500" />
            <span>CS2</span>
          </button>
        </div>

        {/* Фильтр по режиму */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-semibold mr-1">Режим:</span>
          <button
            type="button"
            onClick={() => setModeFilter('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
              modeFilter === 'all'
                ? 'bg-white text-neutral-900 font-bold'
                : 'bg-[#252834] text-neutral-300 hover:text-white hover:bg-[#2e3241]'
            )}
          >
            Все
          </button>
          <button
            type="button"
            onClick={() => setModeFilter('solo')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
              modeFilter === 'solo'
                ? 'bg-white text-neutral-900 font-bold'
                : 'bg-[#252834] text-neutral-300 hover:text-white hover:bg-[#2e3241]'
            )}
          >
            Solo
          </button>
          <button
            type="button"
            onClick={() => setModeFilter('duo')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
              modeFilter === 'duo'
                ? 'bg-white text-neutral-900 font-bold'
                : 'bg-[#252834] text-neutral-300 hover:text-white hover:bg-[#2e3241]'
            )}
          >
            Duo (в пати)
          </button>
        </div>
      </div>

      {/* Оповещение об успешном взятии заказа */}
      {claimedOrder && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-between animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5" />
            <span>
              <strong>Заказ успешно принят!</strong> Средства клиента заблокированы в Escrow. Открываем чат по заказу...
            </span>
          </div>
        </div>
      )}

      {/* Список активных заявок */}
      {filteredOrders.length === 0 ? (
        <div className="bg-[#1c1e26] p-12 rounded-2xl border border-white/10 text-center">
          <p className="text-neutral-400 text-sm">Нет доступных заказов по выбранным фильтрам.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1c1e26] hover:bg-[#20222b] p-4 sm:p-5 rounded-2xl border border-white/10 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Левая часть: Игра с официальным лого, звания, детали */}
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border mt-0.5',
                    order.gameId === 'dota2'
                      ? 'bg-red-600/15 border-red-500/25'
                      : order.subMode === 'faceit'
                      ? 'bg-orange-500/15 border-orange-500/25'
                      : 'bg-amber-500/15 border-amber-500/25'
                  )}
                >
                  {order.gameId === 'dota2' ? (
                    <Dota2Logo className="w-6 h-6 text-red-500" />
                  ) : order.subMode === 'faceit' ? (
                    <FaceitLogo className="w-5 h-5 text-orange-500" />
                  ) : (
                    <CS2Logo className="w-6 h-6 text-amber-500" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{order.title}</span>
                    {order.subMode === 'faceit' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-md">
                        FACEIT
                      </span>
                    )}
                    {order.isDuo && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                        <Users className="w-3 h-3" />
                        Duo
                      </span>
                    )}
                    {order.isExpress && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        <Zap className="w-3 h-3" />
                        Срочно
                      </span>
                    )}
                  </div>

                  {/* Диапазон рангов */}
                  <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium mb-2">
                    <span className="bg-[#15161c] px-2 py-0.5 rounded border border-white/5">{order.currentRank}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-500" />
                    <span className="bg-[#15161c] px-2 py-0.5 rounded border border-white/5 text-red-400 font-semibold">{order.targetRank}</span>
                  </div>

                  {/* Метаданные: Заказчик и время */}
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {order.customerRating.toFixed(1)} {order.customerName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {order.createdAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Правая часть: Вознаграждение бустера и действие */}
              <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white text-right">
                    {order.price.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    <span>В Escrow</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleClaimOrder(order.id)}
                  disabled={claimedOrder === order.id}
                  className="py-2.5 px-5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  Взять заказ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
