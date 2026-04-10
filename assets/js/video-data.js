export const videoCatalog = [
  {
    id: "hafta-1",
    weekNumber: 1,
    title: "Hafta 1 - Programa Giris ve Yol Haritasi",
    description: "Programin genel akisina giris yapin ve ilk haftanin hedeflerini ogrenin.",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    formBaseUrl: "FORM_BASE_URL_HAFTA_1"
  },
  {
    id: "hafta-2",
    weekNumber: 2,
    title: "Hafta 2 - Temel Kavramlar",
    description: "Bu videoda temel terimleri ve uygulama mantigini ele aliyoruz.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://player.vimeo.com/video/76979871",
    formBaseUrl: "FORM_BASE_URL_HAFTA_2"
  },
  {
    id: "hafta-3",
    weekNumber: 3,
    title: "Hafta 3 - Is Akislarini Planlama",
    description: "Etkili bir egitim sureci icin planlama tekniklerini inceleyin.",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-3.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_3"
  },
  {
    id: "hafta-4",
    weekNumber: 4,
    title: "Hafta 4 - Uygulamali Ornekler",
    description: "Gercek senaryolar uzerinden uygulamali anlatim.",
    thumbnail: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-4.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_4"
  },
  {
    id: "hafta-5",
    weekNumber: 5,
    title: "Hafta 5 - Surec Optimizasyonu",
    description: "Surecleri hizlandiran ve kaliteyi artiran yaklasimlar.",
    thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    formBaseUrl: "FORM_BASE_URL_HAFTA_5"
  },
  {
    id: "hafta-6",
    weekNumber: 6,
    title: "Hafta 6 - Veri ile Takip",
    description: "Ilerleme takibi ve veri okuma aliskanliklari uzerine odaklanin.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-6.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_6"
  },
  {
    id: "hafta-7",
    weekNumber: 7,
    title: "Hafta 7 - Geri Bildirim Yontemleri",
    description: "Katilimci geri bildirimlerini toplama ve yorumlama teknikleri.",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-7.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_7"
  },
  {
    id: "hafta-8",
    weekNumber: 8,
    title: "Hafta 8 - Icerik Sunum Kalitesi",
    description: "Daha etkili video ve icerik kurgusu icin temel prensipler.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://player.vimeo.com/video/22439234",
    formBaseUrl: "FORM_BASE_URL_HAFTA_8"
  },
  {
    id: "hafta-9",
    weekNumber: 9,
    title: "Hafta 9 - Ekip Iletisimi",
    description: "Daha net koordinasyon ve bilgi paylasimi icin iletisim teknikleri.",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-9.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_9"
  },
  {
    id: "hafta-10",
    weekNumber: 10,
    title: "Hafta 10 - Performans Gozden Gecirme",
    description: "Haftalik ciktilari degerlendirme ve iyilestirme adimlari.",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-10.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_10"
  },
  {
    id: "hafta-11",
    weekNumber: 11,
    title: "Hafta 11 - Yetkinlik Gelistirme",
    description: "Uzun vadeli gelisim icin uzmanlik alanlarini belirleyin.",
    thumbnail: "https://images.unsplash.com/photo-1516321310764-8d15e6fe5326?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-11.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_11"
  },
  {
    id: "hafta-12",
    weekNumber: 12,
    title: "Hafta 12 - Kapanis ve Sonraki Adimlar",
    description: "Programin final ozetini tamamlayin ve sonraki hedeflerinizi planlayin.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://example.com/videos/hafta-12.mp4",
    formBaseUrl: "FORM_BASE_URL_HAFTA_12"
  }
];

export function getVideoById(videoId) {
  return videoCatalog.find((video) => video.id === videoId) ?? null;
}

export function normalizeVideoRecord(video) {
  return {
    id: video.id,
    weekNumber: Number(video.weekNumber),
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    videoUrl: video.videoUrl,
    formBaseUrl: video.formBaseUrl
  };
}
