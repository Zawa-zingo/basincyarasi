import { bindLogout, requireAuth } from "./auth-helpers.js";
import { saveUsername } from "./data-service.js";
import { redirectTo, setMessage } from "./utils.js";

const form = document.getElementById("profile-form");
const emailInput = document.getElementById("profile-email");
const usernameInput = document.getElementById("username");
const messageBox = document.getElementById("profile-message");

bindLogout();

const { user, profile } = await requireAuth({ allowMissingUsername: true });
emailInput.value = user.email ?? "";
usernameInput.value = profile.username ?? "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  if (username.length < 3) {
    setMessage(messageBox, "Kullanici adi en az 3 karakter olmalidir.", "error");
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  setMessage(messageBox, "");

  try {
    await saveUsername(user.uid, username);
    setMessage(messageBox, "Profiliniz basariyla kaydedildi. Yonlendiriliyorsunuz...", "success");
    window.setTimeout(() => redirectTo("./dashboard.html"), 800);
  } catch (error) {
    submitButton.disabled = false;
    setMessage(messageBox, "Profil kaydedilemedi. Lutfen tekrar deneyin.", "error");
  }
});
