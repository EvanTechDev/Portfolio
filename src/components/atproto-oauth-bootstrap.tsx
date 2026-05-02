"use client";

import { useEffect } from 'react';
import { restoreOAuthSession } from '@/lib/atreply-oauth';

export function AtprotoOAuthBootstrap() {
  useEffect(() => {
    restoreOAuthSession().catch(console.error);
  }, []);

  return null;
}
