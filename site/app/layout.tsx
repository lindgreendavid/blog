import type { Metadata } from "next";
import { indexMeta } from "./content-data";
import "./globals.css";

// Sets the theme before first paint: the saved choice, else the system preference.
const themeScript = `(function(){var d=false;try{var s=localStorage.getItem("theme");d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches}catch(e){d=matchMedia("(prefers-color-scheme: dark)").matches}document.documentElement.dataset.theme=d?"dark":"light"})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://notes.lindgreendavid.com"),
  title: indexMeta.title,
  description: indexMeta.tagline,
  applicationName: "Lab Notes",
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  keywords: [
    "responsible AI",
    "data observability",
    "quantitative finance",
    "physics",
    "biology",
    "climate data",
    "reproducible research",
    "preregistered research",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preload" href="/fonts/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
