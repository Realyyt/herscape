import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../src/components/Navbar';

export const metadata = {
  title: "Herscape Women's Retreat Website",
  description: 'A community for ambitious women founders, creators, and leaders.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-[#eaffd0] flex flex-col font-quantico">
        {children}
        <Navbar />
      </body>
    </html>
  );
}
