# Email Konfiqurasiyası

Admin paneldən mesajlara cavab vermək üçün email konfiqurasiyası lazımdır.

## Gmail ilə Konfiqurasiya

### 1. Gmail App Password Yaradın

1. Google hesabınıza daxil olun
2. [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) ünvanına gedin
3. "App passwords" seçin
4. App seçin: "Mail"
5. Device seçin: "Other" və "BatinoGroup" yazın
6. "Generate" düyməsini basın
7. Yaradılan 16 simvollu şifrəni kopyalayın

### 2. .env.local Faylını Konfiqurasiya Edin

`.env.local` faylını açın və aşağıdakı məlumatları daxil edin:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App Password
```

**Qeyd:** `your-email@gmail.com` və `xxxx xxxx xxxx xxxx` yerlərinə öz məlumatlarınızı yazın.

## Mailtrap ilə Test (Development)

Development zamanı real email göndərmək əvəzinə Mailtrap istifadə edə bilərsiniz:

1. [https://mailtrap.io](https://mailtrap.io) saytında qeydiyyatdan keçin
2. Inbox yaradın
3. SMTP credentials-ı kopyalayın

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASS=your-mailtrap-password
```

## Başqa SMTP Providers

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

## Test Edin

1. Serveri yenidən başladın: `npm run dev`
2. Admin panelə daxil olun: `/admin/login`
3. Mesajlar səhifəsinə gedin: `/admin/messages`
4. Bir mesaj seçin və "Cavab Ver" düyməsini basın
5. Cavab yazın və "Email Göndər" düyməsini basın

## Troubleshooting

### "Failed to send email" xətası

1. `.env.local` faylının mövcud olduğunu yoxlayın
2. SMTP məlumatlarının düzgün olduğunu yoxlayın
3. Gmail üçün "Less secure app access" aktivləşdirin və ya App Password istifadə edin
4. Serveri yenidən başladın

### Email göndərilir amma çatmır

1. Spam qovluğunu yoxlayın
2. SMTP provider-in limitlərini yoxlayın
3. Email ünvanının düzgün olduğunu yoxlayın

## Production Deployment

Production-da environment variables-ı hosting provider-də təyin edin:

- **Vercel:** Settings → Environment Variables
- **Netlify:** Site settings → Build & deploy → Environment
- **Railway:** Variables tab
- **Heroku:** Settings → Config Vars

**Qeyd:** `.env.local` faylını heç vaxt Git-ə commit etməyin!
