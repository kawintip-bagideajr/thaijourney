// Syncs .env.local to Vercel project (removes Supabase, adds Firebase)
import { execSync, spawnSync } from "child_process";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(join(__dirname, "../.env.local"), "utf8");

function getEnv(key) {
  const match = envContent.match(new RegExp(`^${key}=(.+)$`, "m"));
  if (!match) return null;
  return match[1].replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

function vercelSet(name, value) {
  const result = spawnSync("vercel", ["env", "add", name, "production"], {
    input: value,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
    cwd: join(__dirname, ".."),
    shell: true,
  });
  if (result.stdout?.includes("Added") || result.stderr?.includes("already")) {
    console.log(`   ✅ ${name}`);
  } else if (result.stderr?.includes("already exists")) {
    console.log(`   ⚠️  ${name} already exists — skipping`);
  } else {
    console.log(`   ➡ ${name}:`, (result.stdout + result.stderr).replace(/\n/g, " ").slice(0, 100));
  }
}

function vercelRm(name) {
  const result = spawnSync("vercel", ["env", "rm", name, "production", "--yes"], {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
    cwd: join(__dirname, ".."),
    shell: true,
  });
  if (result.stdout?.includes("Removed") || result.status === 0) {
    console.log(`   ✅ Removed ${name}`);
  } else {
    console.log(`   ⚠️  ${name}: not found or error`);
  }
}

console.log("--- Removing old Supabase vars ---");
vercelRm("NEXT_PUBLIC_SUPABASE_ANON_KEY");
vercelRm("NEXT_PUBLIC_SUPABASE_URL");
// SUPABASE_SERVICE_ROLE_KEY already removed

console.log("\n--- Adding Firebase vars ---");
const vars = {
  NEXT_PUBLIC_FIREBASE_API_KEY: getEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: getEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: getEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: getEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  NEXT_PUBLIC_FIREBASE_APP_ID: getEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  FIREBASE_ADMIN_PROJECT_ID: getEnv("FIREBASE_ADMIN_PROJECT_ID"),
  FIREBASE_ADMIN_CLIENT_EMAIL: getEnv("FIREBASE_ADMIN_CLIENT_EMAIL"),
  FIREBASE_ADMIN_PRIVATE_KEY: getEnv("FIREBASE_ADMIN_PRIVATE_KEY"),
  OPENROUTER_API_KEY: getEnv("OPENROUTER_API_KEY"),
  OPENROUTER_MODEL: getEnv("OPENROUTER_MODEL"),
};

for (const [name, value] of Object.entries(vars)) {
  if (value) vercelSet(name, value);
  else console.log(`   ⚠️  ${name}: not found in .env.local`);
}

console.log("\nDone! Run: vercel --prod");
