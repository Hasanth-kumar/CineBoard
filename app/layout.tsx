/**
 * File: layout.tsx
 * Responsibility: Next.js root layout component
 * Features: Configures fonts, global styles, and wraps app with AppShell
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/src/layouts/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineBoard AI",
  description: "A cinematic AI-powered dashboard with premium glassmorphic design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
