'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Provider store={store}>
          <main className="flex-grow">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
