import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/navbar/Navbar';
import RootContentLayout from './rootContentLayout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'AniQuest',
  description: 'Find all your favourite anime characters',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-peach text-gray-700`}
      >
        <Providers>
          <div className="w-full bg-dark-gray text-white">
            <div className="container px-6 sm:px-8 mx-auto w-full lg:w-8/12">
              <Navbar />
            </div>
          </div>

          <main className="flex-grow">
            <RootContentLayout>{children}</RootContentLayout>
          </main>

          <footer className="bg-dark-gray text-white p-4 text-center">
            <p className="text-sm font-bold">
              No cookies were harmed in the making of this site.
            </p>
            <p className="text-xs mt-2">
              Warning: This site was coded after 2 cups of coffee and has zero
              unit tests.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
