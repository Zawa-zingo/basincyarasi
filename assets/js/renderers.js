import { escapeHtml } from "./utils.js";

export function createVideoCard({ video, completed, unlocked }) {
  const statusLabel = completed
    ? "Tamamlandi"
    : unlocked
      ? "Erisilebilir"
      : "Kilitli";

  const statusClass = completed
    ? "status-completed"
    : unlocked
      ? "status-available"
      : "status-locked";

  const buttonLabel = completed ? "Tekrar Ac" : "Videoyu Ac";
  const disabledAttribute = unlocked ? "" : "aria-disabled=\"true\" tabindex=\"-1\"";
  const linkHref = unlocked ? `./video.html?id=${encodeURIComponent(video.id)}` : "#";

  return `
    <article class="video-card">
      <img src="${escapeHtml(video.thumbnail)}" alt="${escapeHtml(video.title)} kucuk resmi" />
      <div class="video-card-header">
        <div>
          <span class="eyebrow">Hafta ${video.weekNumber}</span>
          <h3>${escapeHtml(video.title)}</h3>
        </div>
        <span class="status-pill ${statusClass}">${statusLabel}</span>
      </div>
      <p>${escapeHtml(video.description)}</p>
      <a class="btn ${unlocked ? "btn-primary" : "btn-secondary"}" href="${linkHref}" ${disabledAttribute}>
        ${buttonLabel}
      </a>
    </article>
  `;
}

export function createVideoEmbed(video) {
  const url = video.videoUrl;

  if (url.includes("youtube.com/watch")) {
    const videoId = new URL(url).searchParams.get("v");
    return `<iframe src="https://www.youtube.com/embed/${videoId}?rel=0" title="${escapeHtml(video.title)}" allowfullscreen></iframe>`;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `<iframe src="https://www.youtube.com/embed/${videoId}?rel=0" title="${escapeHtml(video.title)}" allowfullscreen></iframe>`;
  }

  if (url.includes("vimeo.com")) {
    const embedUrl = url.includes("player.vimeo.com")
      ? url
      : `https://player.vimeo.com/video/${url.split("/").pop()}`;
    return `<iframe src="${escapeHtml(embedUrl)}" title="${escapeHtml(video.title)}" allowfullscreen></iframe>`;
  }

  return `<video controls preload="metadata"><source src="${escapeHtml(url)}" />Tarayiciniz video oynatmayi desteklemiyor.</video>`;
}
