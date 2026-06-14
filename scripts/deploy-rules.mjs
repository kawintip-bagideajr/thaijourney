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

async function api(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}

const rulesContent = readFileSync(join(__dirname, "../firestore.rules"), "utf8");

// Step 1: Create ruleset
console.log("Creating Firestore ruleset...");
const r1 = await api("POST", `https://firebaserules.googleapis.com/v1/projects/${projectId}/rulesets`, {
  source: { files: [{ name: "firestore.rules", content: rulesContent }] }
});

if (!r1.ok) {
  console.log("❌ Create ruleset failed:", JSON.stringify(r1.data)?.slice(0, 200));
  process.exit(1);
}

const rulesetName = r1.data.name;
console.log("✅ Ruleset created:", rulesetName);

// Step 2: Deploy to release
console.log("Deploying rules...");
const r2 = await api("PATCH", `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases/cloud.firestore`, {
  release: { name: `projects/${projectId}/releases/cloud.firestore`, rulesetName }
});

if (r2.ok) {
  console.log("✅ Firestore rules deployed successfully!");
} else {
  // Try creating the release if it doesn't exist
  const r3 = await api("POST", `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases`, {
    name: `projects/${projectId}/releases/cloud.firestore`,
    rulesetName,
  });
  if (r3.ok) {
    console.log("✅ Firestore rules deployed successfully!");
  } else {
    console.log("❌ Deploy failed:", JSON.stringify(r2.data)?.slice(0, 200));
  }
}
