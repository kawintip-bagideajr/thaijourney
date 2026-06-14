import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

function getPrivateKey() {
  const b64 = process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64;
  if (b64) return Buffer.from(b64, "base64").toString("utf8");
  return process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getAdminApp() {
  if (getApps().length > 0) return getApp();
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: getPrivateKey(),
    }),
  });
}

// Lazy proxies — initialize only on first method call at runtime, not during build
export const adminAuth = new Proxy({} as Auth, {
  get(_, prop) {
    const auth = getAuth(getAdminApp());
    const value = (auth as any)[prop];
    return typeof value === "function" ? value.bind(auth) : value;
  },
});

export const adminDb = new Proxy({} as Firestore, {
  get(_, prop) {
    const db = getFirestore(getAdminApp());
    const value = (db as any)[prop];
    return typeof value === "function" ? value.bind(db) : value;
  },
});

export async function getUserFromSession(sessionCookie: string | undefined) {
  if (!sessionCookie) return null;
  try {
    return await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}
