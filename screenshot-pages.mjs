import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "screenshots");

const PAGES = [
  { name: "01-landing",      url: "http://localhost:3001" },
  { name: "02-login",        url: "http://localhost:3001/login" },
  { name: "03-signup",       url: "http://localhost:3001/signup" },
  { name: "04-forgot",       url: "http://localhost:3001/forgot-password" },
  { name: "05-dashboard",    url: "http://localhost:3001/dashboard" },
  { name: "06-learn",        url: "http://localhost:3001/learn" },
  { name: "07-alphabet",     url: "http://localhost:3001/alphabet" },
  { name: "08-map",          url: "http://localhost:3001/map" },
  { name: "09-leaderboard",  url: "http://localhost:3001/leaderboard" },
  { name: "10-chat",         url: "http://localhost:3001/chat" },
  { name: "11-achievements", url: "http://localhost:3001/achievements" },
  { name: "12-profile",      url: "http://localhost:3001/profile" },
  { name: "13-admin",        url: "http://localhost:3001/admin" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

for (const p of PAGES) {
  const page = await context.newPage();
  try {
    await page.goto(p.url, { waitUntil: "networkidle", timeout: 15000 });
    // Wait for animations to settle
    await page.waitForTimeout(1500);
    // Wait for any loading spinners to disappear
    await page.waitForFunction(() => !document.querySelector(".animate-spin"), { timeout: 5000 }).catch(() => {});
    await page.screenshot({ path: `${outDir}/${p.name}.png`, fullPage: false });
    console.log(`✅ ${p.name}`);
  } catch (e) {
    console.log(`❌ ${p.name}: ${e.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("Done.");
