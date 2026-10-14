'use client';

import { useState } from 'react';
import { ShieldCheck, Zap, Users, Tv, Globe, Clock, CheckCircle2, Gamepad2, Crosshair } from 'lucide-react';
import { GAMES_CONFIG, type GameConfig } from './boost-data';
import { cn } from '@/lib/utils';

export function OrderBoostCalculator() {
  const [selectedGameId, setSelectedGameId] = useState<'dota2' | 'cs2'>('dota2');
  const [selectedService, setSelectedService] = useState<'rank' | 'calibration' | 'wins' | 'coaching'>('rank');

  // Selected game config
  const game: GameConfig = GAMES_CONFIG[selectedGameId];

  // Ratings
  const [currentRating, setCurrentRating] = useState<number>(selectedGameId === 'dota2' ? 2000 : 8000);
  const [targetRating, setTargetRating] = useState<number>(selectedGameId === 'dota2' ? 3500 : 15000);

  // Extras
  const [isDuo, setIsDuo] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const [isStream, setIsStream] = useState(false);
  const [isVpn, setIsVpn] = useState(true);

  // Order submission modal/feedback
  const [orderCreated, setOrderCreated] = useState(false);

  // Handle game switch
  const handleGameChange = (gameId: 'dota2' | 'cs2') => {
    setSelectedGameId(gameId);
    if (gameId === 'dota2') {
      setCurrentRating(2000);
      setTargetRating(3500);
    } else {
      setCurrentRating(8000);
      setTargetRating(15000);
    }
  };

  // Find rank name by rating value
  const getRankName = (val: number) => {
    const sorted = [...game.ranks].sort((a, b) => b.value - a.value);
    const found = sorted.find((r) => val >= r.value);
    return found ? found.name : game.ranks[0].name;
  };

  // Price Calculation
  const delta = Math.max(0, targetRating - currentRating);
  const steps = Math.ceil(delta / game.step);
  let basePrice = steps * game.basePricePerStep;

  if (selectedService === 'calibration') basePrice = selectedGameId === 'dota2' ? 1600 : 1800;
  if (selectedService === 'wins') basePrice = selectedGameId === 'dota2' ? 1200 : 1400;
  if (selectedService === 'coaching') basePrice = selectedGameId === 'dota2' ? 1500 : 1600;

  let multiplier = 1;
  if (isDuo) multiplier += 0.25;
  if (isExpress) multiplier += 0.15;
  if (isStream) multiplier += 0.1;

  const totalPrice = Math.round(basePrice * multiplier);

  // Estimated days
  const estDays = Math.max(1, Math.ceil(steps / 4));

  const handleCreateOrder = () => {
    setOrderCreated(true);
    setTimeout(() => {
      setOrderCreated(false);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      {/* Выбор игры */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
          1. Выберите игровую дисциплину
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl">
          {/* Dota 2 */}
          <button
            type="button"
            onClick={() => handleGameChange('dota2')}
            className={cn(
              'flex items-center gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer',
              selectedGameId === 'dota2'
                ? 'bg-[#22242e] border-white/30 shadow-lg ring-1 ring-white/20'
                : 'bg-[#1a1b22] border-white/5 hover:border-white/15 hover:bg-[#20212a]'
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base">Dota 2</div>
              <div className="text-xs text-neutral-400">MMR, калибровка, порядочность</div>
            </div>
          </button>

          {/* Counter-Strike 2 */}
          <button
            type="button"
            onClick={() => handleGameChange('cs2')}
            className={cn(
              'flex items-center gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer',
              selectedGameId === 'cs2'
                ? 'bg-[#22242e] border-white/30 shadow-lg ring-1 ring-white/20'
                : 'bg-[#1a1b22] border-white/5 hover:border-white/15 hover:bg-[#20212a]'
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Crosshair className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base">Counter-Strike 2</div>
              <div className="text-xs text-neutral-400">Premier Rating, Faceit Elo, звания</div>
            </div>
          </button>
        </div>
      </div>

      {/* Выбор типа услуги */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
          2. Выберите тип услуги
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {game.services.map((srv) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => setSelectedService(srv.id)}
              className={cn(
                'p-3.5 rounded-xl border text-left transition-all cursor-pointer',
                selectedService === srv.id
                  ? 'bg-[#252834] border-white/30 shadow-md'
                  : 'bg-[#1a1b22] border-white/5 hover:bg-[#20222a] hover:border-white/10'
              )}
            >
              <div className="font-semibold text-white text-sm mb-1">{srv.title}</div>
              <div className="text-[11px] text-neutral-400 leading-snug">{srv.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Основной калькулятор и итоговая карточка */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка: Калькулятор диапазона и дополнительные опции */}
        <div className="lg:col-span-2 space-y-6">
          {/* Секция выбора ранга / рейтинга */}
          <div className="bg-[#1c1e26] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Диапазон рейтинга ({game.ratingUnit})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Текущий рейтинг */}
              <div className="bg-[#15161c] p-4 rounded-xl border border-white/5">
                <div className="text-xs text-neutral-400 font-medium mb-1">Текущий рейтинг</div>
                <div className="text-2xl font-black text-white mb-2">
                  {currentRating} <span className="text-xs font-normal text-neutral-500">{game.ratingUnit}</span>
                </div>
                <div className="text-xs font-semibold text-neutral-300 mb-3 bg-[#20222c] px-2.5 py-1 rounded-md inline-block">
                  {getRankName(currentRating)}
                </div>
                <input
                  type="range"
                  min={game.minRating}
                  max={Math.min(targetRating - game.step, game.maxRating - game.step)}
                  step={game.step}
                  value={currentRating}
                  onChange={(e) => setCurrentRating(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              {/* Желаемый рейтинг */}
              <div className="bg-[#15161c] p-4 rounded-xl border border-white/5">
                <div className="text-xs text-neutral-400 font-medium mb-1">Желаемый результат</div>
                <div className="text-2xl font-black text-red-500 mb-2">
                  {targetRating} <span className="text-xs font-normal text-neutral-500">{game.ratingUnit}</span>
                </div>
                <div className="text-xs font-semibold text-neutral-300 mb-3 bg-[#20222c] px-2.5 py-1 rounded-md inline-block">
                  {getRankName(targetRating)}
                </div>
                <input
                  type="range"
                  min={currentRating + game.step}
                  max={game.maxRating}
                  step={game.step}
                  value={targetRating}
                  onChange={(e) => setTargetRating(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Прогресс прироста */}
            <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-white/5 pt-4">
              <span>Прирост рейтинга:</span>
              <span className="font-bold text-white">+{delta} {game.ratingUnit}</span>
            </div>
          </div>

          {/* Дополнительные опции */}
          <div className="bg-[#1c1e26] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Параметры выполнения
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Опция: Duo буст */}
              <label className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                isDuo ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
              )}>
                <input
                  type="checkbox"
                  checked={isDuo}
                  onChange={(e) => setIsDuo(e.target.checked)}
                  className="mt-1 accent-red-600 rounded cursor-pointer"
                />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-neutral-300" />
                    <span>Игра в пати (Duo)</span>
                    <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded ml-1">+25%</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Без передачи пароля — играете вместе с бустером в группе
                  </div>
                </div>
              </label>

              {/* Опция: Экспресс */}
              <label className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                isExpress ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
              )}>
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="mt-1 accent-red-600 rounded cursor-pointer"
                />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-neutral-300" />
                    <span>Экспресс-буст</span>
                    <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded ml-1">+15%</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Приоритетный подбор топовых бустеров и ускоренное закрытие
                  </div>
                </div>
              </label>

              {/* Опция: Стрим */}
              <label className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                isStream ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
              )}>
                <input
                  type="checkbox"
                  checked={isStream}
                  onChange={(e) => setIsStream(e.target.checked)}
                  className="mt-1 accent-red-600 rounded cursor-pointer"
                />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-neutral-300" />
                    <span>Стрим матчей</span>
                    <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded ml-1">+10%</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Бустер запустит скрытую трансляцию на YouTube/Twitch
                  </div>
                </div>
              </label>

              {/* Опция: VPN */}
              <label className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                isVpn ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
              )}>
                <input
                  type="checkbox"
                  checked={isVpn}
                  onChange={(e) => setIsVpn(e.target.checked)}
                  className="mt-1 accent-red-600 rounded cursor-pointer"
                />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-neutral-300" />
                    <span>VPN под ваш регион</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded ml-1">Бесплатно</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Защита от проверок платформы по IP и геолокации
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Правая колонка: Карточка заказа и Escrow */}
        <div className="lg:col-span-1">
          <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/10 shadow-xl sticky top-20">
            <h3 className="text-base font-bold text-white mb-4">Сводка заказа</h3>

            <div className="space-y-3 text-xs mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between text-neutral-400">
                <span>Игра:</span>
                <span className="font-semibold text-white">{game.name}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Услуга:</span>
                <span className="font-semibold text-white">
                  {game.services.find((s) => s.id === selectedService)?.title}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Рейтинг:</span>
                <span className="font-semibold text-white">{currentRating} ➔ {targetRating}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Формат:</span>
                <span className="font-semibold text-white">{isDuo ? 'Duo (в пати)' : 'Solo (передача)'}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  Срок:
                </span>
                <span className="font-semibold text-white">~ {estDays} {estDays === 1 ? 'день' : estDays < 5 ? 'дня' : 'дней'}</span>
              </div>
            </div>

            {/* Итоговая цена */}
            <div className="mb-6">
              <div className="text-xs text-neutral-400 mb-1">Итоговая стоимость:</div>
              <div className="text-3xl font-black text-white tracking-tight">
                {totalPrice.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            {/* Плашка безопасной сделки Escrow */}
            <div className="bg-[#15161c] p-3 rounded-xl border border-emerald-500/20 flex items-start gap-2.5 mb-6 text-neutral-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-snug">
                <strong className="text-white block font-semibold mb-0.5">Безопасная сделка (Escrow)</strong>
                Деньги замораживаются на сервисе и будут выплачены бустеру только после того, как вы подтвердите результат.
              </div>
            </div>

            {/* Кнопка создания заказа */}
            <button
              type="button"
              onClick={handleCreateOrder}
              disabled={orderCreated}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-sm transition-all shadow-lg hover:shadow-white/10 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {orderCreated ? 'Заявка отправлена на биржу!' : 'Оформить заказ в Escrow'}
            </button>

            {orderCreated && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Заказ размещён на бирже! Бустеры уже видят вашу заявку.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
