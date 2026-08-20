import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CrutsanimiaRON - Patriotism Economic",
  description:
    "Economie locală rezilientă: Mânzare, Logistică, Scofalută, Apa — P2P pentru România.",
  manifest: "/manifest.json",
  verification: {
    google: "<meta name="google-site-verification" content="2f5vTT-H2dBALWquYc9ni3Vi5EQPkUl7bEt6f1PbhCc" />",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CrutsanimiaRON",
  },
  applicationName: "CrutsanimiaRON",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-slate-950 text-slate-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
