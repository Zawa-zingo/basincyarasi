import { bindLogout, requireAuth } from "./auth-helpers.js";
import {
  getVideoCatalog,
  getSequentialAvailability,
  markVideoCompleted,
  refreshUserAndProgress
} from "./data-service.js";
import { createPrefilledFormUrl } from "./forms.js";
import { createVideoEmbed } from "./renderers.js";
import { getVideoById } from "./video-data.js";
import { getQueryParam, redirectTo, setMessage } from "./utils.js";

const messageBox = document.getElementById("video-message");
const titleEl = document.getElementById("video-title");
const descriptionEl = document.getElementById("video-description");
const weekLabelEl = document.getElementById("video-week-label");
const videoContainer = document.getElementById("video-container");
const completeButton = document.getElementById("complete-button");
const quizButton = document.getElementById("quiz-button");
const statusText = document.getElementById("status-text");

bindLogout();

const videoId = getQueryParam("id");
const fallbackVideo = getVideoById(videoId);

try {
  const { user, profile } = await requireAuth();
  const videos = await getVideoCatalog();
  const currentVideo = videos.find((video) => video.id === videoId) ?? fallbackVideo;

  if (!currentVideo) {
    setMessage(messageBox, "Video bulunamadi. Panele geri donuyorsunuz.", "error");
    window.setTimeout(() => redirectTo("./dashboard.html"), 1200);
  } else {
    const { progressMap } = await refreshUserAndProgress(user.uid);
    const availability = getSequentialAvailability(progressMap, videos);
    const currentIndex = videos.findIndex((video) => video.id === currentVideo.id);
    const unlocked = availability[currentIndex];

    if (!unlocked) {
      setMessage(messageBox, "Bu video henuz kilitli. Once onceki haftayi tamamlamalisiniz.", "error");
      window.setTimeout(() => redirectTo("./dashboard.html"), 1400);
    } else {
      const currentProgress = progressMap[currentVideo.id];
      const prefilledUrl = createPrefilledFormUrl({
        formBaseUrl: currentVideo.formBaseUrl,
        username: profile.username,
        weekNumber: currentVideo.weekNumber,
        videoTitle: currentVideo.title
      });

      titleEl.textContent = currentVideo.title;
      descriptionEl.textContent = currentVideo.description;
      weekLabelEl.textContent = `Hafta ${currentVideo.weekNumber}`;
      videoContainer.innerHTML = createVideoEmbed(currentVideo);
      statusText.textContent = currentProgress?.completed
        ? "Bu video tamamlanmis durumda. Quiz baglantisini tekrar acabilirsiniz."
        : "Video tamamlandiginda quiz aktif hale gelecek.";

      const revealQuiz = async () => {
        try {
          await markVideoCompleted(user.uid, currentVideo);
          statusText.textContent = "Video tamamlandi. Quiz simdi kullanima hazir.";
          quizButton.classList.remove("hidden");
          quizButton.href = prefilledUrl || currentVideo.formBaseUrl || "#";

          if (!prefilledUrl) {
            setMessage(
              messageBox,
              "Google Form baglantisi icin form base URL veya entry ID alanlari henuz guncellenmemis. README icindeki adimlari takip ederek bunlari tamamlayin.",
              "error"
            );
          } else {
            setMessage(messageBox, "Quiz acilmaya hazir. Yeni sekmede baslatabilirsiniz.", "success");
          }
        } catch (error) {
          setMessage(messageBox, "Ilerleme kaydedilirken bir hata olustu.", "error");
        }
      };

      if (currentProgress?.completed) {
        quizButton.classList.remove("hidden");
        quizButton.href = prefilledUrl || currentVideo.formBaseUrl || "#";
      }

      completeButton.addEventListener("click", revealQuiz);

      const videoElement = videoContainer.querySelector("video");
      if (videoElement) {
        videoElement.addEventListener("ended", revealQuiz, { once: true });
      }
    }
  }
} catch (error) {
  setMessage(messageBox, "Video sayfasi yuklenemedi. Lutfen tekrar deneyin.", "error");
}
