# 📊 Statistika Sistemi - İstifadə Təlimatı

## 🎯 Xüsusiyyətlər

### Real-Time Tracking
Vebsaytda avtomatik olaraq izlənilir:
- ✅ **Səhifə Baxışları** - Hər səhifə açılanda qeyd edilir
- ✅ **Ziyarətçilər** - Unikal ziyarətçilər (session əsasında)
- ✅ **Mesajlar** - Contact formu vasitəsilə göndərilən mesajlar
- ✅ **Cihaz Tipi** - Desktop, Mobile, Tablet
- ✅ **Brauzer** - Chrome, Safari, Firefox, Edge
- ✅ **Ölkə** - Ziyarətçinin ölkəsi (default: Azərbaycan)

### Vaxt Aralıqları
Admin paneldə 4 müxtəlif vaxt aralığı ilə statistikaya baxa bilərsiniz:
- 📅 **1 Gün** - Bugünkü statistika
- 📅 **7 Gün** - Son həftə
- 📅 **30 Gün** - Son ay
- 📅 **90 Gün** - Son 3 ay

### Statistika Göstəriciləri
- **Ziyarətçilər** - Ümumi ziyarətçi sayı və dəyişiklik faizi
- **Səhifə Baxışları** - Ümumi baxış sayı və trend
- **Mesajlar** - Göndərilən mesaj sayı
- **Bounce Rate** - Səhifədən dərhal çıxma nisbəti

## 🚀 Necə İşləyir?

### 1. Avtomatik Tracking
Hər səhifədə `Analytics` komponenti avtomatik işləyir:

```typescript
// src/app/components/Layout.tsx
import Analytics from './Analytics';

// Layout-da
<Analytics />
```

### 2. Səhifə Baxışı
Hər səhifə açılanda avtomatik qeyd edilir:
- URL path qeyd olunur
- Top Pages siyahısına əlavə edilir
- Günlük statistikaya əlavə olunur

### 3. Ziyarətçi Tracking
İlk dəfə ziyarət edəndə:
- Session storage-də qeyd edilir
- Cihaz tipi müəyyən edilir
- Brauzer tipi müəyyən edilir
- Ölkə məlumatı əlavə edilir

### 4. Mesaj Tracking
Contact formundan mesaj göndəriləndə:
```typescript
import { trackMessage } from '../../components/Analytics';

// Form submit olduqda
trackMessage();
```

## 📁 Fayl Strukturu

```
batino-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analytics/
│   │   │   │   └── route.ts          # Analytics API (GET)
│   │   │   └── track/
│   │   │       └── route.ts          # Tracking API (POST)
│   │   ├── admin/
│   │   │   └── analytics/
│   │   │       └── page.tsx          # Analytics Dashboard
│   │   └── components/
│   │       └── Analytics.tsx         # Tracking Component
│   └── data/
│       └── analytics.json            # Statistika məlumatları
```

## 🔧 API Endpoints

### GET /api/analytics
Statistika məlumatlarını əldə et:
```typescript
// Query parametrləri
?range=1d   // 1 gün
?range=7d   // 7 gün
?range=30d  // 30 gün (default)
?range=90d  // 90 gün

// Response
{
  overview: { totalVisitors, totalPageViews, totalMessages, ... },
  trends: { visitors, pageViews, messages, bounceRate },
  dailyStats: [...],
  topPages: [...],
  devices: [...],
  browsers: [...],
  countries: [...]
}
```

### POST /api/track
Event tracking:
```typescript
// Səhifə baxışı
{
  type: 'pageview',
  data: { path: '/az/about' }
}

// Ziyarətçi
{
  type: 'visitor',
  data: { 
    device: 'Desktop',
    browser: 'Chrome',
    country: 'Azərbaycan'
  }
}

// Mesaj
{
  type: 'message',
  data: {}
}
```

## 📊 Admin Panel

### Statistika Səhifəsi
`/admin/analytics` - Tam statistika dashboard

**Xüsusiyyətlər:**
- 🔄 Real-time yenilənmə (hər 30 saniyə)
- 📈 İnteraktiv qrafiklər
- 📱 Responsive dizayn
- 🎨 Gradient rənglər və animasiyalar

**Göstərilən Məlumatlar:**
1. **Key Metrics** - 4 əsas göstərici kartları
2. **Daily Stats Chart** - Son günlərin qrafiki
3. **Device Stats** - Cihaz bölgüsü
4. **Top Pages** - Ən çox baxılan səhifələr
5. **Countries** - Ölkələr üzrə statistika
6. **Browsers** - Brauzer statistikası

## 🎨 Vizual Elementlər

### Rəng Sxemi
- **Blue Gradient** - Ziyarətçilər (#667eea)
- **Purple Gradient** - Səhifə baxışları (#764ba2)
- **Green** - Mesajlar
- **Orange** - Bounce Rate

### Animasiyalar
- Hover effektləri
- Smooth transitions
- Loading states
- Tooltip-lər

## 💾 Data Storage

Statistika məlumatları `src/data/analytics.json` faylında saxlanılır:

```json
{
  "overview": { ... },
  "trends": { ... },
  "dailyStats": [
    {
      "date": "2025-10-26",
      "visitors": 150,
      "pageViews": 450,
      "messages": 5
    }
  ],
  "topPages": [ ... ],
  "devices": [ ... ],
  "browsers": [ ... ],
  "countries": [ ... ]
}
```

## 🔐 Təhlükəsizlik

- ✅ Admin panel authentication tələb edir
- ✅ API route-ları server-side işləyir
- ✅ File system əməliyyatları təhlükəsizdir
- ✅ Session-based visitor tracking

## 📈 Performans

- **Minimal overhead** - Tracking async işləyir
- **Efficient storage** - JSON file-based
- **Fast queries** - In-memory filtering
- **Auto-cleanup** - Köhnə məlumatlar silinə bilər

## 🛠️ Genişləndirmə

### Yeni Metric Əlavə Etmək
1. `analytics.json`-a yeni field əlavə et
2. `track/route.ts`-də yeni event type yarat
3. `Analytics.tsx`-də tracking funksiyası əlavə et
4. `analytics/page.tsx`-də vizualizasiya et

### Database İnteqrasiyası
Gələcəkdə MongoDB və ya PostgreSQL əlavə edilə bilər:
- Real-time data
- Daha çox məlumat
- Advanced analytics
- User behavior tracking

## 📞 Dəstək

Suallarınız olarsa:
- Email: info@batinogroup.az
- Telefon: +994 XX XXX XX XX

---

**Son Yenilənmə:** 26 Oktyabr 2025
**Versiya:** 1.0.0
