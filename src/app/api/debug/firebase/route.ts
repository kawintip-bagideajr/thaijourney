import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
  const adminEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  return NextResponse.json({
    apiKey: apiKey ? apiKey.slice(0, 12) + "..." : "MISSING",
    authDomain: authDomain || "MISSING",
    projectId: projectId || "MISSING",
    appId: appId ? appId.slice(0, 10) + "..." : "MISSING",
    adminProjectId: process.env.FIREBASE_ADMIN_PROJECT_ID || "MISSING",
    adminEmail: adminEmail ? adminEmail.split("@")[0] + "@..." : "MISSING",
    hasAdminKey: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64,
    nodeEnv: process.env.NODE_ENV,
  });
}
