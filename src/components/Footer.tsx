/**
 * File: Footer.tsx
 * Responsibility: Reusable footer component displaying copyright and branding information
 * Usage: Used across pages to maintain consistent footer branding
 */

'use client';

export default function Footer() {
  return (
    <footer className="mt-auto py-6 text-center border-t border-white/10">
      <p className="text-white/60 text-sm">
        © 2025 CineBoard AI — Crafted for Creators
      </p>
    </footer>
  );
}

