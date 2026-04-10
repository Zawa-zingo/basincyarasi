// Google Form alanlarini prefill etmek icin:
// 1. Formu acin.
// 2. Uc nokta menuden "Onceden doldurulmus baglanti al" secin.
// 3. Ornek degerler girip olusan linki kopyalayin.
// 4. Link icindeki `entry.123456789=` kisimlari alan kimligidir.
// 5. Asagidaki ENTRY_* yer tutucularini kendi formunuzdaki kimliklerle degistirin.

const ENTRY_USERNAME = "ENTRY_USERNAME";
const ENTRY_WEEK = "ENTRY_WEEK";
const ENTRY_VIDEO = "ENTRY_VIDEO";

export function createPrefilledFormUrl({ formBaseUrl, username, weekNumber, videoTitle }) {
  if (!formBaseUrl || formBaseUrl.startsWith("FORM_BASE_URL_")) {
    return "";
  }

  const url = new URL(formBaseUrl);
  url.searchParams.set(ENTRY_USERNAME, username ?? "");
  url.searchParams.set(ENTRY_WEEK, String(weekNumber ?? ""));
  url.searchParams.set(ENTRY_VIDEO, videoTitle ?? "");

  if (!url.searchParams.has("usp")) {
    url.searchParams.set("usp", "pp_url");
  }

  return url.toString();
}
