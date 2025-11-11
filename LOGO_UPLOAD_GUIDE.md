# Logo Yükləmə Funksiyası

## Xüsusiyyətlər

Admin panelində logo yükləmə funksiyası əlavə edildi. Bu funksiya aşağıdakı imkanları təqdim edir:

### 1. Logo Yükləmə
- Admin panelində **Parametrlər** səhifəsinə gedin (`/admin/settings`)
- "Sayt Loqosu" bölməsində logo yükləyə bilərsiniz
- Dəstəklənən formatlar: PNG, JPG, GIF
- Maksimum fayl ölçüsü: 5MB
- Tövsiyə edilən ölçü: 200x80 piksel

### 2. Avtomatik Göstərmə
Logo yüklədikdən sonra avtomatik olaraq aşağıdakı yerlərdə göstərilir:
- **Header** (saytın yuxarı hissəsi)
- **Footer** (saytın aşağı hissəsi)
- Bütün səhifələrdə dinamik olaraq yenilənir

### 3. Texniki Detallar

#### Firebase Storage
- Logolar Firebase Storage-də `logos/` qovluğunda saxlanılır
- Hər fayl unique timestamp ilə adlandırılır
- Avtomatik olaraq download URL yaradılır

#### Komponentlər
- `LogoUpload.tsx` - Logo yükləmə komponenti
- `Header.tsx` - Dinamik logo göstərmə
- `Footer.tsx` - Dinamik logo göstərmə
- `DataContext.tsx` - Logo məlumatlarının idarə edilməsi

#### Fayl Yolları
```
components/admin/LogoUpload.tsx  - Logo yükləmə komponenti
contexts/DataContext.tsx         - Logo məlumatı state-də saxlanılır
lib/firebaseHelpers.ts          - uploadFile funksiyası
```

### 4. İstifadə Qaydası

1. Admin panelə daxil olun: `http://localhost:3001/en/admin/login`
2. Sol sidebar-da **"Parametrlər"** menyusuna klikləyin
3. Səhifənin yuxarısında **"Sayt Loqosu"** bölməsini görəcəksiniz
4. "Logo seçin" düyməsinə klikləyin və şəkil faylını seçin
5. Logo avtomatik yüklənəcək və preview göstəriləcək
6. **"Yadda Saxla"** düyməsinə basın
7. Logo dərhal saytın header və footer hissələrində görünəcək

### 4.1. Admin Panel Görünüşü

Admin settings səhifəsində:
- **Info Banner**: Logo yükləmə haqqında məlumat və təlimatlar
- **Sayt Loqosu Bölməsi**: Ayrıca card-da logo yükləmə komponenti
- **Ümumi Məlumatlar**: Digər sayt parametrləri (ad, email, telefon, ünvan)
- **Sosial Şəbəkələr**: Facebook, LinkedIn, Instagram linkləri

### 5. Xəta Halları

- **Fayl formatı səhv**: Yalnız şəkil faylları qəbul edilir
- **Fayl çox böyük**: 5MB-dan böyük fayllar qəbul edilmir
- **Firebase xətası**: Əgər Firebase konfiqurasiya edilməyibsə, placeholder URL istifadə edilir

### 6. Default Logo

Əgər heç bir logo yüklənməyibsə, default olaraq `/batinologo.png` istifadə edilir.

## Kod Nümunəsi

```typescript
// Logo yükləmə
const logoUrl = await uploadFile(file, 'logos');
onLogoChange(logoUrl);

// Logo göstərmə
<img 
  src={settings.logo || "/batinologo.png"} 
  alt={settings.siteName || "Logo"} 
/>
```

## Firebase Konfiqurasiyası

Logo yükləmə funksiyasının işləməsi üçün Firebase Storage konfiqurasiya edilməlidir:

```env
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
```

Əgər Firebase konfigurasiya edilməyibsə, development rejimində local URL istifadə edilir.