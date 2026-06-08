import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AchievementPopup } from "@/components/gamification/AchievementPopup";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "ThaiJourney — Learn Thai Through Adventure",
  description: "The gamified Thai language learning platform. Unlock Thailand's 77 provinces as you master the language.",
  keywords: ["learn Thai", "Thai language", "Thai lessons", "Thai alphabet"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen">
        {children}
        <AchievementPopup />
      </body>
    </html>
  );
}
