# Firebase Deployment Guide

## Problem: API Routes və Static Export

Next.js App Router ilə API routes istifadə edərkən `output: 'export'` işləmir. İki həll yolu var:

### Həll 1: Vercel istifadə edin (Tövsiyə olunur)

Vercel Next.js-in yaradıcılarıdır və bütün özəllikləri dəstəkləyir:

```bash
npm i -g vercel
vercel login
vercel
```

Firebase-i yalnız database üçün istifadə edin, hosting üçün Vercel.

### Həll 2: API Routes-ları Firestore-a çevirin

API routes əvəzinə birbaşa Firestore istifadə edin:

1. `src/lib/firestore.ts` faylında hazır funksiyalar var
2. API çağırışları əvəzinə bu funksiyaları istifadə edin:

```typescript
// Əvvəl (API route)
const response = await fetch('/api/messages', {
  method: 'POST',
  body: JSON.stringify(data)
});

// İndi (Firestore)
import { addMessage } from '@/lib/firestore';
await addMessage(data);
```

## Firebase Hosting Deploy

```bash
npm run build
npx firebase-tools deploy --only hosting
```

## Firestore Rules Deploy

```bash
npx firebase-tools deploy --only firestore:rules
```

## Tam Deploy

```bash
npm run deploy
```

## Qeyd

- Email göndərmə üçün Firebase Functions lazımdır (ödənişli plan)
- Və ya email-i client-side EmailJS kimi xidmətlə göndərin
