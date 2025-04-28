'use client';

import { SessionProvider } from 'next-auth/react';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
} 