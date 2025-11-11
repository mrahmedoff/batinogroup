# Firebase Storage Rules Konfiqurasiyası

## Problem
Logo yükləmə zamanı `Firebase Storage: User does not have permission` xətası alırsınız.

## Həll

### 1. Firebase Console-a Gedin
1. https://console.firebase.google.com açın
2. `batinogroup-website` proyektini seçin

### 2. Storage Rules Dəyişdirin
1. Sol menyudan **Storage** seçin
2. **Rules** tab-ına klikləyin
3. Mövcud rules-ları silin və aşağıdakını yapışdırın:

#### Development üçün (Hər kəs yükləyə bilər):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

#### Production üçün (Yalnız authenticated users):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /logos/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Publish Edin
**Publish** düyməsinə klikləyin və dəyişiklikləri tətbiq edin.

### 4. Test Edin
Admin panelində logo yükləməyi yenidən sınayın.

## Alternativ Həll

Əgər Firebase konfiqurasiya etmək istəmirsinizsə, kod artıq local URL istifadə edəcək şəkildə yenilənib. Logo yüklənəcək lakin yalnız browser session-da qalacaq.

## Qeyd

Production mühitində mütləq authentication tələb edən rules istifadə edin!