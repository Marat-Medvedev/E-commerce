import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import Header from '@/components/layout/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-commerce Store - Modern Shopping Experience',
  description:
    'Discover amazing products in our modern e-commerce store. Shop with confidence and enjoy fast, secure checkout.',
  keywords: 'ecommerce, shopping, online store, products, fashion, electronics',
  authors: [{ name: 'E-commerce Store' }],
  openGraph: {
    title: 'E-commerce Store - Modern Shopping Experience',
    description: 'Discover amazing products in our modern e-commerce store.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce Store',
    description: 'Discover amazing products in our modern e-commerce store.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
