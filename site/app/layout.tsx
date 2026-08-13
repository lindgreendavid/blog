import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { indexMeta } from "./content-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog-interactive.lindgreendavid.workers.dev"),
  title: indexMeta.title,
  description: indexMeta.tagline,
  applicationName: "Lab Notes",
  keywords: [
    "responsible AI",
    "physics",
    "astrophysics",
    "biology",
    "climate data",
    "reproducible research",
    "preregistered research",
    "interactive research",
    "web accessibility",
  ],
  openGraph: {
    title: indexMeta.title,
    description: indexMeta.tagline,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: indexMeta.title,
    description: indexMeta.tagline,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
