// Run with: node scripts/firebase-setup.mjs
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read .env.local manually
const envPath = join(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf8");
function getEnv(key) {
  const match = envContent.match(new RegExp(`^${key}=(.+)$`, "m"));
  if (!match) return "";
  return match[1].replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

const projectId = getEnv("FIREBASE_ADMIN_PROJECT_ID");
const clientEmail = getEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
const privateKey = getEnv("FIREBASE_ADMIN_PRIVATE_KEY");

console.log("Project ID:", projectId);
console.log("Client Email:", clientEmail);
console.log("Private Key starts with:", privateKey.slice(0, 30));

const app = initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
});

// Test Firestore
const db = getFirestore(app);
console.log("\n--- Testing Firestore ---");
try {
  const snap = await db.collection("_setup_test").limit(1).get();
  console.log("✅ Firestore: Connected! (docs:", snap.size, ")");
} catch (e) {
  console.log("❌ Firestore error:", e.code, "-", e.message.slice(0, 120));
  if (e.code === 5 || e.message.includes("database")) {
    console.log("  → Firestore database not created yet. Go to Firebase Console → Firestore → Create database");
  }
}

// Test Auth
const auth = getAuth(app);
console.log("\n--- Testing Auth ---");
try {
  const result = await auth.listUsers(1);
  console.log("✅ Firebase Auth: Connected! (users so far:", result.users.length, ")");
} catch (e) {
  console.log("❌ Auth error:", e.code, "-", e.message.slice(0, 120));
}

// Enable Email/Password and Google via Identity Platform REST API
console.log("\n--- Enabling Auth Providers via REST API ---");
try {
  const { GoogleAuth } = await import("google-auth-library");
  const gauth = new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await gauth.getClient();
  const token = await client.getAccessToken();
  const accessToken = token.token;

  const url = `https://identitytoolkit.googleapis.com/v2/projects/${projectId}/config?updateMask=signIn`;
  const body = {
    signIn: {
      email: { enabled: true, passwordRequired: true },
    },
  };
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (res.ok) {
    console.log("✅ Email/Password auth: Enabled!");
  } else {
    console.log("❌ Enable email auth failed:", data.error?.message);
  }
} catch (e) {
  console.log("❌ REST API error:", e.message.slice(0, 120));
  console.log("  → google-auth-library may not be installed. Trying alternative...");
}

console.log("\nDone! Check above for any ❌ that need manual action in Firebase Console.");
