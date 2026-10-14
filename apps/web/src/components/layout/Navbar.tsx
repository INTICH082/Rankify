'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/boost',
      icon: ArrowUp,
      label: 'Услуги буста',
      isActive: pathname === '/boost' || pathname === '/',
    },
    {
      href: '/market',
      icon: ShoppingCart,
      label: 'Торговая площадка',
      isActive: pathname.startsWith('/market'),
    },
    {
      href: '/profile',
      icon: User,
      label: 'Профиль',
      isActive: pathname.startsWith('/profile'),
    },
  ];

  return (
    <header className="w-full pt-3 px-4">
      <nav
        aria-label="Главная навигация"
        className="mx-auto w-[320px] sm:w-[360px] h-11 sm:h-12 bg-[#22242c] rounded-xl border border-white/5 shadow-lg shadow-black/20 p-1.5 flex items-center justify-between gap-1.5"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={cn(
                'group flex-1 h-full flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer select-none',
                item.isActive
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'bg-transparent text-white hover:bg-white hover:text-red-600 active:bg-white active:scale-95'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 transition-colors duration-200 stroke-[2.4]',
                  item.isActive ? 'text-red-600' : 'text-white group-hover:text-red-600'
                )}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
