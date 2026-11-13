import type { Metadata, Viewport } from "next";
import { Geist, Nunito, Mitr, Chakra_Petch, IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import { AchievementPopup } from "@/components/gamification/AchievementPopup";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const display = Chakra_Petch({ subsets: ["latin", "thai"], weight: ["500", "600", "700"], variable: "--ff-display" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const mitr = Mitr({ subsets: ["latin", "thai"], weight: ["400", "500", "600"], variable: "--font-mitr" });
const body = IBM_Plex_Sans_Thai_Looped({ subsets: ["latin", "thai"], weight: ["400", "500", "600", "700"], variable: "--ff-body" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ThaiJN: a free Thai-learning game",
  description: "A free game for learning Thai. Earn XP, open 22 provinces on the map and beat 8 regional guardians.",
  keywords: ["learn Thai", "Thai language", "Thai lessons", "Thai alphabet"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${nunito.variable} ${mitr.variable} ${display.variable} ${body.variable}`}>
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
