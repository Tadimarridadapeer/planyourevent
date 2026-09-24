import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'PlanMyEvent — Anantapur Event Marketplace',
  description: 'Discover, compare, shortlist and book venues, caterers, decorators & photographers in Anantapur, Andhra Pradesh.',
  keywords: ['Anantapur wedding venues', 'Anantapur caterers', 'Anantapur photographers', 'PlanMyEvent', 'Rayalaseema event planning'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen flex flex-col justify-between selection:bg-rose-100 selection:text-rose-900"
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
