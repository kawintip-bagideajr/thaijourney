// Re-adds FIREBASE_ADMIN_PRIVATE_KEY to Vercel with literal \n (not actual newlines)
import { spawnSync } from "child_process";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(join(__dirname, "../.env.local"), "utf8");

// Read the raw value (with literal \n sequences, NOT converted to real newlines)
const match = envContent.match(/^FIREBASE_ADMIN_PRIVATE_KEY="(.+)"$/m);
if (!match) { console.error("Key not found in .env.local"); process.exit(1); }

// Raw value still has \n as literal sequences (from .env.local file)
const rawKey = match[1]; // e.g. "-----BEGIN PRIVATE KEY-----\nMIIEvA...\n-----END PRIVATE KEY-----\n"
console.log("Key starts with:", rawKey.slice(0, 40));
console.log("Contains literal \\n:", rawKey.includes("\\n"));

const result = spawnSync("vercel", ["env", "add", "FIREBASE_ADMIN_PRIVATE_KEY", "production"], {
  input: rawKey,
  encoding: "utf8",
  stdio: ["pipe", "pipe", "pipe"],
  cwd: join(__dirname, ".."),
  shell: true,
});

console.log("stdout:", result.stdout?.slice(0, 200));
console.log("stderr:", result.stderr?.slice(0, 200));
