import type { Metadata } from 'next';
import '../styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { SideDrawers } from '@/components/layout/SideDrawers';

export const metadata: Metadata = {
  title: 'Rankify',
  description: 'Production-ready game boosting and account marketplace platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <SideDrawers />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
