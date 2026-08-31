import type { Metadata } from "next";
import { Rozha_One, Karla, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Latin + Devanagari display face drawn from Indian sign painting — carries the
// Sanskrit and the English headlines in one voice.
const rozha = Rozha_One({
  variable: "--font-display",
  subsets: ["latin", "devanagari"],
  weight: "400",
});

const karla = Karla({
  variable: "--font-body",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SoHum Digital Services — Web & Software Development",
  description:
    "SoHum Digital Services builds websites and custom software. A proprietary studio developing every product under one roof.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rozha.variable} ${karla.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
