import type { Metadata } from "next";
import { indexMeta } from "./content-data";
import "./globals.css";
import Motion from "./motion";

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
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: {
    title: indexMeta.title,
    description: indexMeta.tagline,
    type: "website",
    url: "/",
    siteName: "Lab Notes",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: indexMeta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: indexMeta.title,
    description: indexMeta.tagline,
    images: ["/og/home.png"],
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
      <body className="antialiased">
        <Motion />
        {children}
      </body>
    </html>
  );
}
