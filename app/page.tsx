/**
 * File: page.tsx
 * Responsibility: Next.js root page route (/)
 * Action: Redirects to /dashboard
 */

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}
