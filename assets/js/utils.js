export function setMessage(element, message = "", type = "") {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.remove("hidden", "error", "success");

  if (!message) {
    element.classList.add("hidden");
    return;
  }

  if (type) {
    element.classList.add(type);
  }
}

export function redirectTo(path) {
  window.location.href = path;
}

export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
