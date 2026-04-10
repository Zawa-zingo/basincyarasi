# Egitim Portali

GitHub Pages uzerinde calisan, Firebase Authentication ve Firestore kullanan statik bir video egitim sitesidir. Arayuz tamamen HTML, CSS ve JavaScript ile hazirlanmistir.

## Mimari Ozeti

- Hosting: GitHub Pages
- Kimlik Dogrulama: Firebase Authentication (Email/Password)
- Veri Saklama: Cloud Firestore (`users`, `videos`, `progress`)
- Video Kaynagi: Harici MP4, YouTube veya Vimeo URL'leri
- Quiz: Google Forms prefilled links
- Erisim Modeli: Client-side auth guard + Firestore profil/progress takibi

## Klasor Yapisi

```text
.
|-- index.html
|-- login.html
|-- dashboard.html
|-- video.html
|-- profile.html
|-- 404.html
|-- .nojekyll
|-- assets
|   |-- css
|   |   `-- style.css
|   `-- js
|       |-- auth-helpers.js
|       |-- dashboard.js
|       |-- data-service.js
|       |-- firebase-config.js
|       |-- firebase-init.js
|       |-- forms.js
|       |-- index.js
|       |-- login.js
|       |-- profile.js
|       |-- renderers.js
|       |-- utils.js
|       |-- video-data.js
|       `-- video.js
`-- README.md
```

## Kurulum ve Devreye Alma

### Firebase kurulumu

1. Firebase Console uzerinden yeni proje olusturun.
2. Bir Web App ekleyin.
3. `assets/js/firebase-config.js` dosyasindaki alanlari kendi Firebase bilgilerinizle degistirin.
4. Authentication icinde `Email/Password` oturum acma yontemini etkinlestirin.
5. Firestore Database olusturun.

### Firestore ornek yapi

`users/{uid}`

```json
{
  "uid": "firebase-user-uid",
  "email": "kullanici@ornek.com",
  "username": "emreaksu",
  "createdAt": "serverTimestamp"
}
```

`progress/{uid}/videos/{videoId}`

```json
{
  "videoId": "hafta-1",
  "weekNumber": 1,
  "title": "Hafta 1 - Programa Giris ve Yol Haritasi",
  "completed": true,
  "quizUnlocked": true,
  "createdAt": "serverTimestamp",
  "completedAt": "serverTimestamp",
  "updatedAt": "serverTimestamp"
}
```

`videos/{videoId}`

```json
{
  "id": "hafta-1",
  "weekNumber": 1,
  "title": "Hafta 1 - Programa Giris ve Yol Haritasi",
  "description": "Programin genel akisina giris yapin.",
  "thumbnail": "https://...",
  "videoUrl": "https://...",
  "formBaseUrl": "https://docs.google.com/forms/d/e/.../viewform"
}
```

### Firestore guvenlik kurallari

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /progress/{userId}/videos/{videoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /videos/{videoId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

### Kullanici adi ve profil akisi

- Ilk giriste `users/{uid}` dokumani otomatik olusur.
- `username` bos ise kullanici `profile.html` sayfasina yonlendirilir.
- Profil kaydindan sonra dashboard aktif olur.

### Google Form prefilled link kurulumu

1. Yeni Google Form olusturun.
2. Kullanici adi, hafta numarasi ve video basligi icin alanlar ekleyin.
3. Uc nokta menuden `Onceden doldurulmus baglanti al` secin.
4. Deneme degerleri girin ve linki kopyalayin.
5. Linkteki `entry.xxxxx` parametrelerini bulun.
6. `assets/js/forms.js` icindeki su alanlari guncelleyin:

```js
const ENTRY_USERNAME = "ENTRY_USERNAME";
const ENTRY_WEEK = "ENTRY_WEEK";
const ENTRY_VIDEO = "ENTRY_VIDEO";
```

7. Her haftanin form temel linkini `assets/js/video-data.js` icindeki `formBaseUrl` alanina yazin.

### Haftalik video guncelleme

En sade kullanim icin iki secenek vardir:

- Firestore `videos` koleksiyonunu doldurursaniz sistem once burayi okur.
- Firestore bossa `assets/js/video-data.js` icindeki yerel yer tutucu veriler kullanilir.

Video dokumanlari veya yerel config icin alanlar aynidir:

```js
{
  id: "hafta-1",
  weekNumber: 1,
  title: "Baslik",
  description: "Aciklama",
  thumbnail: "https://...",
  videoUrl: "https://...",
  formBaseUrl: "https://docs.google.com/forms/d/e/.../viewform"
}
```

### GitHub Pages yayinlama

1. Dosyalari GitHub reposuna yukleyin.
2. Repo ayarlarinda `Pages` bolumune gidin.
3. Source olarak branch ve root klasoru secin.
4. Yayin URL'si olustugunda Firebase Authentication icindeki yetkili alan adlarina GitHub Pages domaininizi de ekleyin.

Hizli kontrol listesi:

1. `assets/js/firebase-config.js` icindeki Firebase bilgilerini girin.
2. `assets/js/forms.js` icindeki `ENTRY_*` alanlarini guncelleyin.
3. `assets/js/video-data.js` icindeki video ve form linklerini doldurun veya Firestore `videos` koleksiyonunu kullanin.
4. Firebase Authentication icinde GitHub Pages alan adinizi `Authorized domains` listesine ekleyin.

## Onemli Notlar

- GitHub Pages statik hosting oldugu icin backend sunucu yoktur.
- Video dosyalari repo icinde tutulmaz; URL ile referans edilir.
- YouTube ve Vimeo iframe oynaticilarinda video bitis olayi bu sade yapi icinde dogrudan izlenmez. Bu nedenle `Videoyu Tamamladim` butonu yedek akistir.
