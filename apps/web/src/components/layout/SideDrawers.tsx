'use client';

import { useState, useEffect } from 'react';
import { Bell, MessageSquare, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActivePanel = 'notifications' | 'chat' | null;

interface SideDrawersProps {
  notificationsCount?: number;
  messagesCount?: number;
}

export function SideDrawers({
  notificationsCount = 0,
  messagesCount = 0,
}: SideDrawersProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePanel(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePanel = (panel: 'notifications' | 'chat') => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const closePanel = () => setActivePanel(null);

  return (
    <>
      {/* Маленькие кнопки слева: при открытии панели плавно смещаются к её правому краю */}
      <div
        className={cn(
          'fixed top-3 z-50 flex flex-col gap-1.5 transition-all duration-300 ease-out',
          activePanel ? 'left-[320px] sm:left-[360px]' : 'left-0'
        )}
      >
        {/* Кнопка Уведомлений */}
        <button
          type="button"
          onClick={() => togglePanel('notifications')}
          aria-label="Уведомления"
          title="Уведомления"
          className={cn(
            'group relative flex items-center gap-1 px-2.5 py-2 rounded-r-lg border border-l-0 border-white/10 shadow-md backdrop-blur-md transition-all duration-150 cursor-pointer',
            activePanel === 'notifications'
              ? 'bg-[#2f323e] border-white/20'
              : 'bg-[#22242c] hover:bg-[#2b2d37]'
          )}
        >
          <div className="relative flex items-center justify-center">
            <Bell className="w-4 h-4 text-white" />
            {notificationsCount > 0 && (
              <span className="absolute -top-2 -right-2 px-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#22242c]">
                {notificationsCount > 99 ? '99+' : notificationsCount}
              </span>
            )}
          </div>
          <ChevronRight
            className={cn(
              'w-3.5 h-3.5 text-white/70 group-hover:text-white transition-transform duration-200',
              activePanel === 'notifications' && 'rotate-180'
            )}
          />
        </button>

        {/* Кнопка Чата */}
        <button
          type="button"
          onClick={() => togglePanel('chat')}
          aria-label="Чат"
          title="Чат"
          className={cn(
            'group relative flex items-center gap-1 px-2.5 py-2 rounded-r-lg border border-l-0 border-white/10 shadow-md backdrop-blur-md transition-all duration-150 cursor-pointer',
            activePanel === 'chat'
              ? 'bg-[#2f323e] border-white/20'
              : 'bg-[#22242c] hover:bg-[#2b2d37]'
          )}
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
            {messagesCount > 0 && (
              <span className="absolute -top-2 -right-2 px-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#22242c]">
                {messagesCount > 99 ? '99+' : messagesCount}
              </span>
            )}
          </div>
          <ChevronRight
            className={cn(
              'w-3.5 h-3.5 text-white/70 group-hover:text-white transition-transform duration-200',
              activePanel === 'chat' && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* Выдвижная панель слева (не блокирует остальной сайт, можно одновременно листать и писать) */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-40 w-[320px] sm:w-[360px] bg-[#1a1b22] border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-out',
          activePanel ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Шапка выдвижной панели */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-[#20222a]">
          <div className="flex items-center gap-2.5">
            {activePanel === 'notifications' ? (
              <>
                <div className="w-7 h-7 rounded-lg bg-[#272934] border border-white/10 flex items-center justify-center text-white">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-sm font-semibold text-white">Уведомления</h2>
              </>
            ) : (
              <>
                <div className="w-7 h-7 rounded-lg bg-[#272934] border border-white/10 flex items-center justify-center text-white">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-sm font-semibold text-white">Чат</h2>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={closePanel}
            aria-label="Закрыть панель"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Тело панели: Уведомления */}
        {activePanel === 'notifications' && (
          <div className="flex-1 flex flex-col p-6 items-center justify-center text-center">
            <h3 className="text-sm font-semibold text-white mb-1.5">Нет новых уведомлений</h3>
            <p className="text-xs text-neutral-400 max-w-[260px] leading-relaxed">
              Здесь будут отображаться новые заявки, изменения статусов сделок и сообщения арбитража.
            </p>
          </div>
        )}

        {/* Тело панели: Чат */}
        {activePanel === 'chat' && (
          <div className="flex-1 flex flex-col p-6 items-center justify-center text-center">
            <h3 className="text-sm font-semibold text-white mb-1.5">Нет активных диалогов</h3>
            <p className="text-xs text-neutral-400 max-w-[260px] leading-relaxed">
              Диалог открывается автоматически, когда вы берёте заказ или кто-то откликается на вашу заявку.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
