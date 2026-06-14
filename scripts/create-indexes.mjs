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
const b64 = getEnv("FIREBASE_ADMIN_PRIVATE_KEY_BASE64");
const privateKey = b64 ? Buffer.from(b64, "base64").toString("utf8") : getEnv("FIREBASE_ADMIN_PRIVATE_KEY");
const clientEmail = getEnv("FIREBASE_ADMIN_CLIENT_EMAIL");

const gauth = new GoogleAuth({
  credentials: { client_email: clientEmail, private_key: privateKey },
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});
const client = await gauth.getClient();
const { token } = await client.getAccessToken();

async function createIndex(collection, fields) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/collectionGroups/${collection}/indexes`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ queryScope: "COLLECTION", fields }),
  });
  const data = await res.json();
  if (res.ok) return `✅ ${collection}: creating (${data.name?.split("/").pop()})`;
  if (data.error?.message?.includes("already exists")) return `⚠️  ${collection}: already exists`;
  return `❌ ${collection}: ${data.error?.message?.slice(0, 80)}`;
}

// All composite indexes needed by the app
const indexes = [
  // dashboard: daily_activity by user_id + activity_date
  ["daily_activity", [
    { fieldPath: "user_id", order: "ASCENDING" },
    { fieldPath: "activity_date", order: "ASCENDING" },
  ]],
  // leaderboard: daily_activity by activity_date + total_xp
  ["daily_activity", [
    { fieldPath: "activity_date", order: "ASCENDING" },
    { fieldPath: "total_xp", order: "DESCENDING" },
  ]],
  // achievements: user_achievements by user_id
  ["user_achievements", [
    { fieldPath: "user_id", order: "ASCENDING" },
    { fieldPath: "achievement_slug", order: "ASCENDING" },
  ]],
  // learn: user_lesson_progress by user_id + status
  ["user_lesson_progress", [
    { fieldPath: "user_id", order: "ASCENDING" },
    { fieldPath: "status", order: "ASCENDING" },
  ]],
  // chat: chat_messages by user_id + created_at
  ["chat_messages", [
    { fieldPath: "user_id", order: "ASCENDING" },
    { fieldPath: "created_at", order: "ASCENDING" },
  ]],
];

console.log("Creating Firestore indexes...\n");
for (const [col, fields] of indexes) {
  const result = await createIndex(col, fields);
  console.log(result);
}
console.log("\nDone! Indexes may take 1-2 minutes to build.");
