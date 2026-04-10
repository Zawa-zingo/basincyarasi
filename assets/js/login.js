import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-init.js";
import { ensureUserProfile } from "./data-service.js";
import { requireGuest } from "./auth-helpers.js";
import { setMessage, redirectTo } from "./utils.js";

const form = document.getElementById("login-form");
const messageBox = document.getElementById("login-message");

function getAuthErrorMessage(error) {
  const code = error?.code ?? "";

  switch (code) {
    case "auth/invalid-credential":
      return "Giris basarisiz. E-posta veya sifre hatali gorunuyor.";
    case "auth/invalid-email":
      return "E-posta adresi gecersiz formatta.";
    case "auth/user-disabled":
      return "Bu kullanici hesabi devre disi birakilmis.";
    case "auth/network-request-failed":
      return "Ag baglantisi kurulamadigi icin giris yapilamadi.";
    case "auth/too-many-requests":
      return "Cok fazla deneme yapildi. Biraz bekleyip tekrar deneyin.";
    case "auth/operation-not-allowed":
      return "Firebase tarafinda Email/Password giris yontemi henuz etkin degil.";
    case "auth/unauthorized-domain":
      return `Bu alan adi yetkili degil: ${window.location.hostname}`;
    default:
      return `Giris basarisiz. Firebase hata kodu: ${code || "bilinmiyor"}`;
  }
}

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
    console.error("Firebase giris hatasi:", error);
    setMessage(
      messageBox,
      getAuthErrorMessage(error),
      "error"
    );
  } finally {
    submitButton.disabled = false;
  }
});
