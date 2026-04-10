import { bindLogout, requireAuth } from "./auth-helpers.js";
import {
  getCompletedCount,
  getVideoCatalog,
  getSequentialAvailability,
  refreshUserAndProgress
} from "./data-service.js";
import { createVideoCard } from "./renderers.js";
import { setMessage } from "./utils.js";

const videoGrid = document.getElementById("video-grid");
const messageBox = document.getElementById("dashboard-message");
const greeting = document.getElementById("dashboard-greeting");
const subtitle = document.getElementById("dashboard-subtitle");
const progressCount = document.getElementById("progress-count");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const nextUnlockText = document.getElementById("next-unlock-text");

bindLogout();

try {
  const { user, profile } = await requireAuth();
  const videos = await getVideoCatalog();
  const { progressMap } = await refreshUserAndProgress(user.uid);
  const availability = getSequentialAvailability(progressMap, videos);
  const completedCount = getCompletedCount(progressMap);
  const percent = Math.round((completedCount / videos.length) * 100);
  const firstIncomplete = videos.find((video) => !progressMap[video.id]?.completed);

  greeting.textContent = `${profile.username || profile.email}, egitim planiniz hazir`;
  subtitle.textContent = "Her videodan sonra quiz acilir ve ilerlemeniz otomatik kaydedilir.";
  progressCount.textContent = `${completedCount}/${videos.length} tamamlandi`;
  progressPercent.textContent = `%${percent}`;
  progressFill.style.width = `${percent}%`;
  nextUnlockText.textContent = firstIncomplete
    ? `Siradaki hedef: Hafta ${firstIncomplete.weekNumber} videosu`
    : "Tum videolari tamamladiniz. Tebrikler.";

  videoGrid.innerHTML = videos
    .map((video, index) =>
      createVideoCard({
        video,
        completed: Boolean(progressMap[video.id]?.completed),
        unlocked: availability[index]
      })
    )
    .join("");
} catch (error) {
  setMessage(
    messageBox,
    "Panel yuklenirken bir hata olustu. Firebase ayarlarinizi ve erisim izinlerini kontrol edin.",
    "error"
  );
}
