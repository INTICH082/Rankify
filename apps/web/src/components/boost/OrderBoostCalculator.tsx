'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  Tv,
  Globe,
  Clock,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  Trophy,
  GraduationCap,
  Target
} from 'lucide-react';
import { GAMES_CONFIG, CS2_FACEIT_CONFIG, type GameConfig } from './boost-data';
import { Dota2Logo, CS2Logo, FaceitLogo } from '@/components/icons/GameLogos';
import { cn } from '@/lib/utils';

export function OrderBoostCalculator() {
  const [selectedGameId, setSelectedGameId] = useState<'dota2' | 'cs2'>('dota2');
  const [cs2Mode, setCs2Mode] = useState<'premier' | 'faceit'>('premier');
  const [selectedService, setSelectedService] = useState<'rank' | 'calibration' | 'wins' | 'coaching'>('rank');

  // Active game config based on selection and sub-mode
  const game: GameConfig =
    selectedGameId === 'cs2' && cs2Mode === 'faceit'
      ? CS2_FACEIT_CONFIG
      : GAMES_CONFIG[selectedGameId];

  // 1. Rating Boost state
  const [currentRating, setCurrentRating] = useState<number>(2000);
  const [targetRating, setTargetRating] = useState<number>(3500);

  // 2. Calibration state
  const [calibrationMatches, setCalibrationMatches] = useState<number>(10);
  const [calibrationRank, setCalibrationRank] = useState<string>('archon');

  // 3. Net Wins state
  const [netWinsCount, setNetWinsCount] = useState<number>(3);
  const [currentRankForWins, setCurrentRankForWins] = useState<string>('archon');

  // 4. Coaching state
  const [coachingHours, setCoachingHours] = useState<number>(2);
  const [coachingType, setCoachingType] = useState<'replay' | 'duo'>('duo');

  // Extra options
  const [isDuo, setIsDuo] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const [isStream, setIsStream] = useState(false);
  const [isVpn, setIsVpn] = useState(true);

  // Feedback state
  const [orderCreated, setOrderCreated] = useState(false);

  // Switch game
  const handleGameChange = (gameId: 'dota2' | 'cs2') => {
    setSelectedGameId(gameId);
    if (gameId === 'dota2') {
      setCurrentRating(2000);
      setTargetRating(3500);
      setCalibrationRank('archon');
      setCurrentRankForWins('archon');
    } else {
      if (cs2Mode === 'premier') {
        setCurrentRating(8000);
        setTargetRating(15000);
        setCalibrationRank('blue');
        setCurrentRankForWins('blue');
      } else {
        setCurrentRating(1000);
        setTargetRating(1750);
        setCalibrationRank('lvl4');
        setCurrentRankForWins('lvl4');
      }
    }
  };

  // Switch CS2 submode (Premier vs Faceit)
  const handleCs2ModeChange = (mode: 'premier' | 'faceit') => {
    setCs2Mode(mode);
    if (mode === 'premier') {
      setCurrentRating(8000);
      setTargetRating(15000);
      setCalibrationRank('blue');
      setCurrentRankForWins('blue');
    } else {
      setCurrentRating(1000);
      setTargetRating(1750);
      setCalibrationRank('lvl4');
      setCurrentRankForWins('lvl4');
    }
  };

  // Find rank name by rating value
  const getRankName = (val: number) => {
    const sorted = [...game.ranks].sort((a, b) => b.value - a.value);
    const found = sorted.find((r) => val >= r.value);
    return found ? found.name : game.ranks[0].name;
  };

  // Dynamic price calculation tailored to each service
  let basePrice = 0;
  let summaryDetails = '';
  let estTime = '~ 1-2 дня';

  if (selectedService === 'rank') {
    const delta = Math.max(0, targetRating - currentRating);
    const steps = Math.ceil(delta / game.step);
    basePrice = steps * game.basePricePerStep;
    summaryDetails = `${currentRating} ➔ ${targetRating} ${game.ratingUnit}`;
    const estDays = Math.max(1, Math.ceil(steps / 4));
    estTime = `~ ${estDays} ${estDays === 1 ? 'день' : estDays < 5 ? 'дня' : 'дней'}`;
  } else if (selectedService === 'calibration') {
    const pricePerMatch = selectedGameId === 'dota2' ? 180 : cs2Mode === 'faceit' ? 220 : 190;
    basePrice = calibrationMatches * pricePerMatch;
    summaryDetails = `${calibrationMatches} матчей (${game.ranks.find((r) => r.id === calibrationRank)?.name || 'Калибровка'})`;
    estTime = calibrationMatches <= 5 ? '~ 1 день' : '~ 2 дня';
  } else if (selectedService === 'wins') {
    const pricePerWin = selectedGameId === 'dota2' ? 240 : cs2Mode === 'faceit' ? 320 : 260;
    basePrice = netWinsCount * pricePerWin;
    summaryDetails = `${netWinsCount} чистых побед`;
    estTime = netWinsCount <= 3 ? '~ 1 день' : '~ 2-3 дня';
  } else if (selectedService === 'coaching') {
    const pricePerHour = selectedGameId === 'dota2' ? 650 : cs2Mode === 'faceit' ? 850 : 700;
    basePrice = coachingHours * pricePerHour;
    summaryDetails = `${coachingHours} ч. (${coachingType === 'duo' ? 'Duo в игре' : 'Разбор реплеев'})`;
    estTime = 'По согласованию в чате';
  }

  // Multipliers for extras (only apply duo if service is not already coaching)
  let multiplier = 1;
  if (isDuo && selectedService !== 'coaching') multiplier += 0.25;
  if (isExpress) multiplier += 0.15;
  if (isStream) multiplier += 0.1;

  const totalPrice = Math.round(basePrice * multiplier);

  const handleCreateOrder = () => {
    setOrderCreated(true);
    setTimeout(() => {
      setOrderCreated(false);
    }, 4500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      {/* 1. Выбор игры (БЕЗ лишнего описания в названиях, с официальными лого) */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
          1. Выберите игру
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
          {/* Dota 2 */}
          <button
            type="button"
            onClick={() => handleGameChange('dota2')}
            className={cn(
              'flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer',
              selectedGameId === 'dota2'
                ? 'bg-[#22242e] border-white/30 shadow-lg ring-1 ring-white/20'
                : 'bg-[#1a1b22] border-white/5 hover:border-white/15 hover:bg-[#20212a]'
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/20 flex items-center justify-center shrink-0">
              <Dota2Logo className="w-6 h-6 text-red-500" />
            </div>
            <span className="font-bold text-white text-base">Dota 2</span>
          </button>

          {/* Counter-Strike 2 */}
          <button
            type="button"
            onClick={() => handleGameChange('cs2')}
            className={cn(
              'flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer',
              selectedGameId === 'cs2'
                ? 'bg-[#22242e] border-white/30 shadow-lg ring-1 ring-white/20'
                : 'bg-[#1a1b22] border-white/5 hover:border-white/15 hover:bg-[#20212a]'
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
              <CS2Logo className="w-6 h-6 text-amber-500" />
            </div>
            <span className="font-bold text-white text-base">Counter-Strike 2</span>
          </button>
        </div>
      </div>

      {/* 2. Подрежим для CS2: Premier/ММ vs Faceit */}
      {selectedGameId === 'cs2' && (
        <div className="mb-6 animate-in fade-in duration-200">
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2.5">
            Платформа матчей
          </label>
          <div className="inline-flex p-1 bg-[#1c1e26] rounded-xl border border-white/10 shadow-sm gap-1">
            <button
              type="button"
              onClick={() => handleCs2ModeChange('premier')}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2',
                cs2Mode === 'premier'
                  ? 'bg-white text-neutral-900 shadow-sm font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              )}
            >
              <span>Premier / ММ (до 30k)</span>
            </button>
            <button
              type="button"
              onClick={() => handleCs2ModeChange('faceit')}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2',
                cs2Mode === 'faceit'
                  ? 'bg-white text-neutral-900 shadow-sm font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              )}
            >
              <FaceitLogo className="w-3.5 h-3.5 text-orange-500" />
              <span>FACEIT (1-10 lvl)</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Выбор типа услуги */}
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
                  ? 'bg-[#252834] border-white/30 shadow-md ring-1 ring-white/15'
                  : 'bg-[#1a1b22] border-white/5 hover:bg-[#20222a] hover:border-white/10'
              )}
            >
              <div className="font-semibold text-white text-sm mb-1">{srv.title}</div>
              <div className="text-[11px] text-neutral-400 leading-snug">{srv.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Контекстная панель настройки услуги */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка: параметры конкретной услуги */}
        <div className="lg:col-span-2 space-y-6">
          {/* СЦЕНАРИЙ А: Поднятие рейтинга (Rank/Elo Boost) — ползунки рейтинга */}
          {selectedService === 'rank' && (
            <div className="bg-[#1c1e26] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                <span>Диапазон рейтинга ({game.ratingUnit})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Текущий рейтинг */}
                <div className="bg-[#15161c] p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-neutral-400 font-medium mb-1">Текущий рейтинг</div>
                  <div className="text-2xl font-black text-white mb-2">
                    {currentRating}{' '}
                    <span className="text-xs font-normal text-neutral-500">{game.ratingUnit}</span>
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

                {/* Желаемый результат */}
                <div className="bg-[#15161c] p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-neutral-400 font-medium mb-1">Желаемый результат</div>
                  <div className="text-2xl font-black text-red-500 mb-2">
                    {targetRating}{' '}
                    <span className="text-xs font-normal text-neutral-500">{game.ratingUnit}</span>
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

              <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-white/5 pt-4">
                <span>Прирост рейтинга:</span>
                <span className="font-bold text-white">
                  +{Math.max(0, targetRating - currentRating)} {game.ratingUnit}
                </span>
              </div>
            </div>
          )}

          {/* СЦЕНАРИЙ Б: Калибровка (без лишнего ползунка MMR!) */}
          {selectedService === 'calibration' && (
            <div className="bg-[#1c1e26] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Параметры калибровки</span>
              </h3>

              {/* Выбор количества матчей */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">
                  Количество калибровочных матчей:
                </label>
                <div className="flex items-center gap-2 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setCalibrationMatches((m) => Math.max(1, m - 1))}
                    className="w-10 h-10 rounded-xl bg-[#15161c] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 bg-[#15161c] border border-white/10 rounded-xl py-2 text-center text-lg font-black text-white">
                    {calibrationMatches} {calibrationMatches === 1 ? 'матч' : calibrationMatches < 5 ? 'матча' : 'матчей'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCalibrationMatches((m) => Math.min(10, m + 1))}
                    className="w-10 h-10 rounded-xl bg-[#15161c] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ориентировочный ранг аккаунта */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">
                  Ориентировочный ранг прошлого сезона (для подбора бустера):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {game.ranks.slice(0, 8).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setCalibrationRank(r.id)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer',
                        calibrationRank === r.id
                          ? 'bg-white text-neutral-900 border-white'
                          : 'bg-[#15161c] border-white/5 text-neutral-300 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {r.name.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* СЦЕНАРИЙ В: Чистые победы (Net Wins) */}
          {selectedService === 'wins' && (
            <div className="bg-[#1c1e26] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>Количество чистых побед (Net Wins)</span>
              </h3>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">
                  Количество гарантированных побед:
                </label>
                <div className="flex items-center gap-2 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setNetWinsCount((w) => Math.max(1, w - 1))}
                    className="w-10 h-10 rounded-xl bg-[#15161c] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 bg-[#15161c] border border-white/10 rounded-xl py-2 text-center text-lg font-black text-emerald-400">
                    +{netWinsCount} {netWinsCount === 1 ? 'победа' : netWinsCount < 5 ? 'победы' : 'побед'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setNetWinsCount((w) => Math.min(20, w + 1))}
                    className="w-10 h-10 rounded-xl bg-[#15161c] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2">
                  * Каждое поражение бустера компенсируется дополнительной победой.
                </p>
              </div>

              {/* Текущее звание */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">
                  Ваш текущий ранг:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {game.ranks.slice(0, 8).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setCurrentRankForWins(r.id)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer',
                        currentRankForWins === r.id
                          ? 'bg-white text-neutral-900 border-white'
                          : 'bg-[#15161c] border-white/5 text-neutral-300 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {r.name.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* СЦЕНАРИЙ Г: Duo / Обучение с тренером */}
          {selectedService === 'coaching' && (
            <div className="bg-[#1c1e26] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Обучение и Duo игра с тренером</span>
              </h3>

              {/* Количество часов */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">
                  Количество часов тренировки / игры:
                </label>
                <div className="flex items-center gap-2 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setCoachingHours((h) => Math.max(1, h - 1))}
                    className="w-10 h-10 rounded-xl bg-[#15161c] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 bg-[#15161c] border border-white/10 rounded-xl py-2 text-center text-lg font-black text-indigo-400">
                    {coachingHours} {coachingHours === 1 ? 'час' : coachingHours < 5 ? 'часа' : 'часов'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCoachingHours((h) => Math.min(10, h + 1))}
                    className="w-10 h-10 rounded-xl bg-[#15161c] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Формат обучения */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">
                  Формат сессии:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCoachingType('duo')}
                    className={cn(
                      'p-3.5 rounded-xl border text-left transition-all cursor-pointer',
                      coachingType === 'duo'
                        ? 'bg-[#252834] border-white/30 text-white'
                        : 'bg-[#15161c] border-white/5 text-neutral-400 hover:text-white'
                    )}
                  >
                    <div className="text-sm font-semibold text-white mb-0.5">Совместная игра (Duo)</div>
                    <div className="text-xs text-neutral-400">Игра в рейтинговом лобби с голосовой связью и подсказками</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoachingType('replay')}
                    className={cn(
                      'p-3.5 rounded-xl border text-left transition-all cursor-pointer',
                      coachingType === 'replay'
                        ? 'bg-[#252834] border-white/30 text-white'
                        : 'bg-[#15161c] border-white/5 text-neutral-400 hover:text-white'
                    )}
                  >
                    <div className="text-sm font-semibold text-white mb-0.5">Разбор реплеев</div>
                    <div className="text-xs text-neutral-400">Детальный анализ ошибок, макро, вардинга и микроконтроля</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Дополнительные опции выполнения */}
          <div className="bg-[#1c1e26] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Параметры выполнения
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Опция: Duo буст (если услуга не коучинг) */}
              {selectedService !== 'coaching' && (
                <label
                  className={cn(
                    'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                    isDuo ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
                  )}
                >
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
                      <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded ml-1">
                        +25%
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Без передачи пароля — играете вместе с бустером в группе
                    </div>
                  </div>
                </label>
              )}

              {/* Опция: Экспресс */}
              <label
                className={cn(
                  'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                  isExpress ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
                )}
              >
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
                    <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded ml-1">
                      +15%
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Приоритетный подбор топовых бустеров и ускоренное закрытие
                  </div>
                </div>
              </label>

              {/* Опция: Стрим */}
              <label
                className={cn(
                  'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                  isStream ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
                )}
              >
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
                    <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded ml-1">
                      +10%
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Бустер запустит скрытую трансляцию на YouTube/Twitch
                  </div>
                </div>
              </label>

              {/* Опция: VPN */}
              <label
                className={cn(
                  'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none',
                  isVpn ? 'bg-[#242735] border-white/30' : 'bg-[#15161c] border-white/5 hover:border-white/15'
                )}
              >
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
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded ml-1">
                      Бесплатно
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Защита от проверок платформы по IP и геолокации
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Правая колонка: Сводка заказа и Escrow */}
        <div className="lg:col-span-1">
          <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/10 shadow-xl sticky top-20">
            <h3 className="text-base font-bold text-white mb-4">Сводка заказа</h3>

            <div className="space-y-3 text-xs mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between text-neutral-400">
                <span>Игра:</span>
                <span className="font-semibold text-white">
                  {selectedGameId === 'cs2'
                    ? cs2Mode === 'faceit'
                      ? 'CS2 (FACEIT)'
                      : 'CS2 (Premier/ММ)'
                    : 'Dota 2'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Услуга:</span>
                <span className="font-semibold text-white">
                  {game.services.find((s) => s.id === selectedService)?.title}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Параметры:</span>
                <span className="font-semibold text-white">{summaryDetails}</span>
              </div>
              {selectedService !== 'coaching' && (
                <div className="flex justify-between text-neutral-400">
                  <span>Формат:</span>
                  <span className="font-semibold text-white">
                    {isDuo ? 'Duo (в пати)' : 'Solo (передача)'}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  Срок:
                </span>
                <span className="font-semibold text-white">{estTime}</span>
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
                <strong className="text-white block font-semibold mb-0.5">
                  Безопасная сделка (Escrow)
                </strong>
                Деньги замораживаются на сервисе и будут выплачены бустеру только после того, как вы
                подтвердите результат.
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
