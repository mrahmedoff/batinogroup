# 🧪 Statistika Sistemi Test Təlimatı

## Test Addımları

### 1️⃣ Proyekti İşə Sal
```bash
cd batino-website
npm run dev
```

### 2️⃣ Vebsayta Daxil Ol
1. Brauzerdə aç: `http://localhost:3000/az`
2. Developer Console-u aç (F12)
3. Network tab-ına keç

### 3️⃣ Səhifə Baxışını Test Et
**Gözlənilən:**
- `/api/track` endpoint-ə POST request
- `type: 'pageview'` və `data: { path: '/az' }`

**Test:**
1. Ana səhifəyə daxil ol
2. Network tab-da `/api/track` request-i gör
3. Response: `{ success: true }`

### 4️⃣ Ziyarətçi Tracking-i Test Et
**Gözlənilən:**
- İlk dəfə səhifə açılanda `/api/track` POST
- `type: 'visitor'` və device/browser məlumatları
- Session storage-də `visitor_tracked` key

**Test:**
1. Incognito/Private window aç
2. Vebsayta daxil ol
3. Console-da yaz: `sessionStorage.getItem('visitor_tracked')`
4. Cavab: `"true"`

### 5️⃣ Müxtəlif Səhifələrə Keç
**Test:**
1. `/az/about` - Haqqımızda
2. `/az/services` - Xidmətlər
3. `/az/contact` - Əlaqə

**Gözlənilən:**
- Hər səhifə üçün ayrı `/api/track` request
- Hər request-də fərqli `path`

### 6️⃣ Mesaj Göndər
**Test:**
1. `/az/contact` səhifəsinə keç
2. Formu doldur:
   - Ad: Test İstifadəçi
   - Email: test@example.com
   - Mesaj: Test mesajı
3. "Göndər" düyməsinə bas

**Gözlənilən:**
- Form submit olur
- `/api/messages` POST request
- `/api/track` POST request (`type: 'message'`)
- Uğur mesajı görünür

### 7️⃣ Admin Panelə Daxil Ol
**Test:**
1. `/admin/login` - Giriş et
2. `/admin/analytics` - Statistika səhifəsi

**Gözlənilən:**
- Statistika kartları görünür
- Ziyarətçi sayı: 1
- Səhifə baxışları: 4 (home, about, services, contact)
- Mesajlar: 1

### 8️⃣ Vaxt Aralıqlarını Test Et
**Test:**
1. Analytics səhifəsində vaxt düymələrinə bas:
   - "Bu Gün" (1d)
   - "7 Gün" (7d)
   - "30 Gün" (30d)
   - "90 Gün" (90d)

**Gözlənilən:**
- Hər dəyişiklikdə `/api/analytics?range=...` request
- Statistika yenilənir
- Qrafik dəyişir

### 9️⃣ Real-Time Yenilənməni Test Et
**Test:**
1. Analytics səhifəsini aç
2. Başqa tab-da vebsayta daxil ol
3. 30 saniyə gözlə

**Gözlənilən:**
- Analytics avtomatik yenilənir
- Yeni məlumatlar görünür

### 🔟 Cihaz və Brauzer Test Et
**Test:**
1. Desktop brauzerdə aç
2. Mobile device emulation aç (F12 → Device Toolbar)
3. Səhifəni yenilə

**Gözlənilən:**
- Device Stats-da "Mobile" artır
- Browser Stats-da brauzer növü qeyd olunur

## 📊 Gözlənilən Nəticələr

### analytics.json Faylı
```json
{
  "overview": {
    "totalVisitors": 1,
    "totalPageViews": 4,
    "totalMessages": 1
  },
  "dailyStats": [
    {
      "date": "2025-10-26",
      "visitors": 1,
      "pageViews": 4,
      "messages": 1
    }
  ],
  "topPages": [
    { "path": "/az", "views": 1, "percentage": 25 },
    { "path": "/az/about", "views": 1, "percentage": 25 },
    { "path": "/az/services", "views": 1, "percentage": 25 },
    { "path": "/az/contact", "views": 1, "percentage": 25 }
  ],
  "devices": [
    { "name": "Desktop", "value": 100, "color": "#667eea" },
    { "name": "Mobile", "value": 0, "color": "#764ba2" },
    { "name": "Tablet", "value": 0, "color": "#f093fb" }
  ],
  "browsers": [
    { "name": "Chrome", "value": 100 },
    { "name": "Safari", "value": 0 },
    { "name": "Firefox", "value": 0 },
    { "name": "Edge", "value": 0 }
  ]
}
```

## 🐛 Debugging

### Console Log-ları
```javascript
// Analytics.tsx-də
console.log('Pageview tracked:', pathname);
console.log('Visitor tracked:', { device, browser, country });
```

### Network Tab
- Request URL: `/api/track`
- Method: POST
- Status: 200
- Response: `{ success: true }`

### File System
```bash
# analytics.json faylını yoxla
type src\data\analytics.json
```

## ✅ Uğurlu Test Kriteriləri

- [ ] Səhifə baxışları qeyd olunur
- [ ] Ziyarətçi sayı artır
- [ ] Mesaj göndərmə işləyir
- [ ] Top Pages siyahısı doldurulur
- [ ] Device/Browser statistikası düzgündür
- [ ] Vaxt aralıqları düzgün filter edir
- [ ] Real-time yenilənmə işləyir
- [ ] Admin panel statistikaları göstərir

## 🚨 Potensial Problemlər

### Problem 1: Tracking işləmir
**Həll:**
- Console-da error yoxla
- Network tab-da request-ləri yoxla
- `Analytics.tsx` import olunubmu?

### Problem 2: analytics.json yenilənmir
**Həll:**
- File permissions yoxla
- `src/data/` qovluğu varmı?
- API route düzgün işləyirmi?

### Problem 3: Admin panel boşdur
**Həll:**
- `/api/analytics` endpoint işləyirmi?
- `analytics.json` faylı varmı?
- Default data generate olurmu?

## 📝 Test Nəticələri

| Test | Status | Qeydlər |
|------|--------|---------|
| Səhifə Baxışı | ⏳ | |
| Ziyarətçi Tracking | ⏳ | |
| Mesaj Göndərmə | ⏳ | |
| Vaxt Aralıqları | ⏳ | |
| Real-time Yenilənmə | ⏳ | |
| Device Stats | ⏳ | |
| Browser Stats | ⏳ | |
| Top Pages | ⏳ | |

**Qeyd:** ⏳ = Test edilməyib, ✅ = Uğurlu, ❌ = Uğursuz

---

**Test Tarixi:** _____________________
**Test Edən:** _____________________
**Nəticə:** _____________________
