// Enables all required Firebase services for the project
import { GoogleAuth } from "google-auth-library";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envContent = readFileSync(join(__dirname, "../.env.local"), "utf8");
function getEnv(key) {
  const match = envContent.match(new RegExp(`^${key}=(.+)$`, "m"));
  if (!match) return "";
  return match[1].replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

const projectId = getEnv("FIREBASE_ADMIN_PROJECT_ID");
const clientEmail = getEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
const privateKey = getEnv("FIREBASE_ADMIN_PRIVATE_KEY");

const gauth = new GoogleAuth({
  credentials: { client_email: clientEmail, private_key: privateKey },
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});
const client = await gauth.getClient();
const { token } = await client.getAccessToken();

async function apiCall(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

// Step 1: Enable Firestore API
console.log("1. Enabling Cloud Firestore API...");
const r1 = await apiCall(
  "POST",
  `https://serviceusage.googleapis.com/v1/projects/${projectId}/services/firestore.googleapis.com:enable`
);
if (r1.ok || r1.data?.error?.message?.includes("already")) {
  console.log("   ✅ Firestore API enabled");
} else {
  console.log("   ❌", r1.data?.error?.message);
}

// Step 2: Enable Identity Toolkit API (Firebase Auth)
console.log("2. Enabling Identity Toolkit API (Firebase Auth)...");
const r2 = await apiCall(
  "POST",
  `https://serviceusage.googleapis.com/v1/projects/${projectId}/services/identitytoolkit.googleapis.com:enable`
);
if (r2.ok || r2.data?.error?.message?.includes("already")) {
  console.log("   ✅ Identity Toolkit API enabled");
} else {
  console.log("   ❌", r2.data?.error?.message);
}

// Wait a moment for APIs to propagate
console.log("   (waiting 5 seconds for API propagation...)");
await new Promise(r => setTimeout(r, 5000));

// Step 3: Create Firestore database
console.log("3. Creating Firestore database...");
const r3 = await apiCall(
  "POST",
  `https://firestore.googleapis.com/v1/projects/${projectId}/databases?databaseId=(default)`,
  { locationId: "asia-southeast1", type: "FIRESTORE_NATIVE" }
);
if (r3.ok) {
  console.log("   ✅ Firestore database created (asia-southeast1)");
} else if (r3.data?.error?.message?.includes("already exists") || r3.data?.error?.status === "ALREADY_EXISTS") {
  console.log("   ✅ Firestore database already exists");
} else {
  console.log("   ❌", r3.data?.error?.message ?? JSON.stringify(r3.data));
}

// Step 4: Enable Email/Password sign-in
console.log("4. Enabling Email/Password sign-in...");
const r4 = await apiCall(
  "PATCH",
  `https://identitytoolkit.googleapis.com/v2/projects/${projectId}/config?updateMask=signIn`,
  { signIn: { email: { enabled: true, passwordRequired: true } } }
);
if (r4.ok) {
  console.log("   ✅ Email/Password sign-in enabled");
} else {
  console.log("   ❌", r4.data?.error?.message);
}

// Step 5: Enable Google sign-in
console.log("5. Enabling Google sign-in...");
const r5 = await apiCall(
  "POST",
  `https://identitytoolkit.googleapis.com/v2/projects/${projectId}/defaultSupportedIdpConfigs?idpId=google.com`,
  { name: `projects/${projectId}/defaultSupportedIdpConfigs/google.com`, enabled: true,
    clientId: "placeholder", clientSecret: "placeholder" }
);
if (r5.ok) {
  console.log("   ✅ Google sign-in enabled");
} else if (r5.data?.error?.message?.includes("already exists")) {
  // Try PATCH to enable it
  const r5b = await apiCall(
    "PATCH",
    `https://identitytoolkit.googleapis.com/v2/projects/${projectId}/defaultSupportedIdpConfigs/google.com?updateMask=enabled`,
    { enabled: true }
  );
  if (r5b.ok) console.log("   ✅ Google sign-in enabled");
  else console.log("   ⚠️  Google sign-in needs OAuth Client ID from Google Cloud Console");
} else {
  console.log("   ⚠️  Google sign-in:", r5.data?.error?.message);
  console.log("      → Google sign-in needs OAuth Client ID. Enable manually in Firebase Console → Authentication → Sign-in method → Google");
}

// Step 6: Set permissive Firestore rules (for development)
console.log("6. Setting Firestore security rules (dev mode)...");
const r6 = await apiCall(
  "PATCH",
  `https://firebaserules.googleapis.com/v1/projects/${projectId}/rulesets`,
  {
    source: {
      files: [{
        name: "firestore.rules",
        content: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`
      }]
    }
  }
);
if (r6.ok) {
  console.log("   ✅ Firestore rules updated (authenticated users can read/write)");
} else {
  console.log("   ⚠️  Rules update:", r6.data?.error?.message?.slice(0, 80));
}

console.log("\n=== Setup complete! Run: npm run dev ===");
