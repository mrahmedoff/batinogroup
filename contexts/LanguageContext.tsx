'use client';

import { translations } from '@/lib/translations';

export function useLanguage() {
  return {
    t: translations,
    language: 'az'
  };
}