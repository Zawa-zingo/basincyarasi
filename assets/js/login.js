import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-init.js";
import { ensureUserProfile } from "./data-service.js";
import { requireGuest } from "./auth-helpers.js";
import { setMessage, redirectTo } from "./utils.js";

const form = document.getElementById("login-form");
const messageBox = document.getElementById("login-message");

await requireGuest();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");
  const email = form.email.value.trim();
  const password = form.password.value;

  setMessage(messageBox, "");
  submitButton.disabled = true;

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await ensureUserProfile(credential.user);
    redirectTo(profile.username ? "./dashboard.html" : "./profile.html");
  } catch (error) {
    setMessage(
      messageBox,
      "Giris basarisiz. E-posta ve sifrenizi kontrol edip tekrar deneyin.",
      "error"
    );
  } finally {
    submitButton.disabled = false;
  }
});
