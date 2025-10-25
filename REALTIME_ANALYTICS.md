# 🔴 Real-Time Statistika Sistemi

## ✅ Yeniliklər

### 1. Real-Time Yenilənmə
- ⚡ **5 saniyə** interval ilə avtomatik yenilənmə
- 🔄 Manual yenilənmə düyməsi
- 🟢 Real-time göstəricisi (yaşıl nöqtə)
- ⏰ Son yenilənmə vaxtı

### 2. Düzəldilmiş Device/Browser Tracking
- ✅ Raw count-lar saxlanılır (`deviceCounts`, `browserCounts`)
- ✅ Faizlər düzgün hesablanır
- ✅ Hər yeni ziyarətçi düzgün qeyd olunur

### 3. Console Log-lar
Tracking işləyəndə console-da görünür:
```
✅ Pageview tracked: /az
✅ Visitor tracked: { device: 'Desktop', browser: 'Chrome', country: 'Azərbaycan' }
✅ Message tracked
```

## 🧪 Test Etmək

### 1. Serveri Başlat
```bash
cd batino-website
npm run dev
```

### 2. Vebsayta Daxil Ol
1. Brauzerdə aç: `http://localhost:3000/az`
2. F12 basıb Console-u aç
3. Console-da tracking log-larını gör

### 3. Admin Panel
1. `/admin/login` - Giriş et
2. `/admin/analytics` - Statistika səhifəsi
3. Real-time göstəricini gör (yaşıl nöqtə)
4. 5 saniyə gözlə - avtomatik yenilənir

### 4. Real-Time Test
**Tab 1:** Admin Analytics səhifəsi
**Tab 2:** Vebsayt səhifələri

1. Tab 2-də müxtəlif səhifələrə keç:
   - `/az` → Ana səhifə
   - `/az/about` → Haqqımızda
   - `/az/services` → Xidmətlər
   - `/az/contact` → Əlaqə

2. Tab 1-də 5 saniyə ərzində statistikanın yenilənməsini izlə:
   - Səhifə baxışları artır
   - Top Pages siyahısı yenilənir
   - Qrafik dəyişir

3. Contact formundan mesaj göndər:
   - Mesaj sayı artır
   - Console-da "✅ Message tracked" görünür

## 📊 Statistika Komponentləri

### Key Metrics (4 kart)
- **Ziyarətçilər** - Unikal ziyarətçi sayı
- **Səhifə Baxışları** - Ümumi baxış sayı
- **Mesajlar** - Göndərilən mesaj sayı
- **Bounce Rate** - Dərhal çıxma nisbəti

Hər kartda:
- ✅ Real-time dəyər
- ✅ Trend göstəricisi (↑ / ↓)
- ✅ Dəyişiklik faizi
- ✅ Rəngli icon

### Daily Stats Chart
- ✅ Son 15 günün qrafiki
- ✅ Hover tooltip
- ✅ Animasiyalı bar-lar
- ✅ Boş state mesajı

### Device Stats
- ✅ Desktop / Mobile / Tablet
- ✅ Progress bar
- ✅ Faiz göstəricisi
- ✅ Rəngli vizualizasiya

### Top Pages
- ✅ Ən çox baxılan 10 səhifə
- ✅ Baxış sayı
- ✅ Faiz
- ✅ Sıralama

### Countries
- ✅ Ölkələr üzrə statistika
- ✅ Bayraq emoji
- ✅ Ziyarətçi sayı

### Browsers
- ✅ Chrome / Safari / Firefox / Edge
- ✅ Faiz göstəricisi
- ✅ Grid layout

## 🔧 Texniki Detallar

### Analytics Tracking Flow
```
Ziyarətçi → Səhifə Açır
    ↓
Analytics.tsx (useEffect)
    ↓
trackPageView() → POST /api/track
    ↓
analytics.json yenilənir
    ↓
Admin Panel (5 saniyə sonra)
    ↓
GET /api/analytics?range=30d
    ↓
Dashboard yenilənir
```

### Data Structure
```json
{
  "overview": { ... },
  "trends": { ... },
  "dailyStats": [
    {
      "date": "2025-10-26",
      "visitors": 5,
      "pageViews": 20,
      "messages": 2
    }
  ],
  "deviceCounts": {
    "Desktop": 3,
    "Mobile": 2,
    "Tablet": 0
  },
  "devices": [
    { "name": "Desktop", "value": 60, "color": "#667eea" },
    { "name": "Mobile", "value": 40, "color": "#764ba2" },
    { "name": "Tablet", "value": 0, "color": "#f093fb" }
  ],
  "browserCounts": {
    "Chrome": 4,
    "Safari": 1,
    "Firefox": 0,
    "Edge": 0
  },
  "browsers": [
    { "name": "Chrome", "value": 80 },
    { "name": "Safari", "value": 20 },
    { "name": "Firefox", "value": 0 },
    { "name": "Edge", "value": 0 }
  ]
}
```

### API Endpoints

#### POST /api/track
Event tracking:
```typescript
// Səhifə baxışı
{ type: 'pageview', data: { path: '/az/about' } }

// Ziyarətçi
{ type: 'visitor', data: { device: 'Desktop', browser: 'Chrome', country: 'Azərbaycan' } }

// Mesaj
{ type: 'message', data: {} }
```

#### GET /api/analytics
Statistika əldə et:
```typescript
?range=1d   // Bugün
?range=7d   // Son 7 gün
?range=30d  // Son 30 gün (default)
?range=90d  // Son 90 gün
```

## 🎯 Real-Time Xüsusiyyətləri

### Avtomatik Yenilənmə
```typescript
useEffect(() => {
  fetchAnalytics();
  
  // Hər 5 saniyədə bir yenilə
  const interval = setInterval(() => {
    fetchAnalytics();
  }, 5000);
  
  return () => clearInterval(interval);
}, [timeRange]);
```

### Manual Yenilənmə
```typescript
<button onClick={fetchAnalytics}>
  🔄 Yenilə
</button>
```

### Son Yenilənmə Vaxtı
```typescript
const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

// Fetch-dən sonra
setLastUpdate(new Date());

// Göstər
{lastUpdate.toLocaleTimeString('az-AZ')}
```

## 🎨 UI Elementləri

### Real-Time Indicator
```tsx
<div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
  <span className="text-xs font-medium text-green-700">Real-time</span>
</div>
```

### Refresh Button
```tsx
<button onClick={fetchAnalytics} className="...">
  <svg>🔄</svg>
  <span>Yenilə</span>
</button>
```

### Time Range Buttons
```tsx
{['1d', '7d', '30d', '90d'].map(range => (
  <button 
    onClick={() => setTimeRange(range)}
    className={timeRange === range ? 'active' : ''}
  >
    {range}
  </button>
))}
```

## 📈 Performans

### Optimizasiyalar
- ✅ 5 saniyə interval (real-time amma performanslı)
- ✅ Lazy loading
- ✅ Memoization
- ✅ Efficient re-renders
- ✅ JSON file-based (sürətli)

### Network Requests
- **Initial load:** 1 request
- **Auto-refresh:** 1 request / 5 saniyə
- **Manual refresh:** 1 request
- **Time range change:** 1 request

## 🐛 Debugging

### Console Log-lar
```javascript
// Tracking
console.log('✅ Pageview tracked:', pathname);
console.log('✅ Visitor tracked:', { device, browser, country });
console.log('✅ Message tracked');

// Errors
console.error('❌ Failed to track pageview:', error);
```

### Network Tab
F12 → Network → Filter: `/api/`
- `POST /api/track` - Tracking events
- `GET /api/analytics?range=30d` - Statistika

### File System
```bash
# analytics.json faylını yoxla
type src\data\analytics.json
```

## ✅ Test Checklist

- [ ] Səhifə baxışı qeyd olunur
- [ ] Ziyarətçi tracking işləyir
- [ ] Device tipi düzgün müəyyən edilir
- [ ] Browser tipi düzgün müəyyən edilir
- [ ] Mesaj tracking işləyir
- [ ] Real-time yenilənmə işləyir (5 saniyə)
- [ ] Manual yenilənmə işləyir
- [ ] Time range filter işləyir
- [ ] Top Pages yenilənir
- [ ] Device/Browser faizləri düzgündür
- [ ] Console log-lar görünür
- [ ] Son yenilənmə vaxtı göstərilir

## 🚀 İstifadəyə Hazırdır!

Real-time statistika sistemi tam işləkdir:
- ⚡ 5 saniyə interval
- 🔄 Manual refresh
- 🟢 Real-time indicator
- ⏰ Son yenilənmə vaxtı
- 📊 Tam sinxronizasiya
- ✅ Console log-lar

---

**Versiya:** 2.0.0  
**Tarix:** 26 Oktyabr 2025  
**Status:** ✅ Real-Time Aktiv
