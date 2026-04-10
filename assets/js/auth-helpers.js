import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-init.js";
import { ensureUserProfile } from "./data-service.js";
import { redirectTo } from "./utils.js";

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function requireAuth({ allowMissingUsername = false } = {}) {
  return new Promise((resolve) => {
    const unsubscribe = watchAuth(async (user) => {
      unsubscribe();

      if (!user) {
        redirectTo("./login.html");
        return;
      }

      const profile = await ensureUserProfile(user);

      if (!allowMissingUsername && !profile.username) {
        redirectTo("./profile.html");
        return;
      }

      resolve({ user, profile });
    });
  });
}

export function requireGuest() {
  return new Promise((resolve) => {
    const unsubscribe = watchAuth(async (user) => {
      unsubscribe();

      if (!user) {
        resolve(null);
        return;
      }

      const profile = await ensureUserProfile(user);
      redirectTo(profile.username ? "./dashboard.html" : "./profile.html");
    });
  });
}

export function bindLogout(buttonId = "logout-button") {
  const button = document.getElementById(buttonId);
  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    button.disabled = true;

    try {
      await signOut(auth);
      redirectTo("./login.html");
    } catch (error) {
      button.disabled = false;
      window.alert("Cikis yapilirken bir hata olustu. Lutfen tekrar deneyin.");
    }
  });
}
