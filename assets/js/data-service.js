import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase-init.js";
import { appSettings } from "./firebase-config.js";
import { normalizeVideoRecord, videoCatalog } from "./video-data.js";

const usersCollectionRef = collection(db, appSettings.usersCollection);
const progressCollectionRef = collection(db, appSettings.progressCollection);
const videosCollectionRef = collection(db, appSettings.videosCollection);

export async function ensureUserProfile(user) {
  const ref = doc(usersCollectionRef, user.uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    const newProfile = {
      uid: user.uid,
      email: user.email ?? "",
      username: "",
      createdAt: serverTimestamp()
    };

    await setDoc(ref, newProfile);
    return newProfile;
  }

  return snapshot.data();
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(usersCollectionRef, uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function saveUsername(uid, username) {
  await setDoc(
    doc(usersCollectionRef, uid),
    {
      username,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function getAllProgressForUser(uid) {
  const snapshots = await getDocs(collection(progressCollectionRef, uid, "videos"));
  const map = {};

  snapshots.forEach((item) => {
    map[item.id] = item.data();
  });

  return map;
}

export async function markVideoCompleted(uid, video) {
  const ref = doc(progressCollectionRef, uid, "videos", video.id);
  await setDoc(
    ref,
    {
      videoId: video.id,
      weekNumber: video.weekNumber,
      title: video.title,
      quizUnlocked: true,
      completed: true,
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function getVideoCatalog() {
  try {
    const snapshots = await getDocs(query(videosCollectionRef, orderBy("weekNumber", "asc")));

    if (!snapshots.empty) {
      return snapshots.docs.map((item) =>
        normalizeVideoRecord({
          id: item.id,
          ...item.data()
        })
      );
    }
  } catch (error) {
    console.warn("Firestore video koleksiyonu okunamadi, yerel config kullaniliyor.", error);
  }

  return videoCatalog;
}

export function getSequentialAvailability(progressMap, videos) {
  return videos.map((video, index) => {
    if (index === 0) {
      return true;
    }

    const previousVideo = videos[index - 1];
    return Boolean(progressMap[previousVideo.id]?.completed);
  });
}

export function getCompletedCount(progressMap) {
  return Object.values(progressMap).filter((item) => item.completed).length;
}

export async function refreshUserAndProgress(uid) {
  const [profile, progressMap] = await Promise.all([
    getUserProfile(uid),
    getAllProgressForUser(uid)
  ]);

  return { profile, progressMap };
}
