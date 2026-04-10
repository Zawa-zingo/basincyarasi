import { watchAuth } from "./auth-helpers.js";
import { ensureUserProfile } from "./data-service.js";
import { redirectTo } from "./utils.js";

watchAuth(async (user) => {
  if (!user) {
    redirectTo("./login.html");
    return;
  }

  const profile = await ensureUserProfile(user);
  redirectTo(profile.username ? "./dashboard.html" : "./profile.html");
});
