import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oussama Sallak | Portfolio",
  description:
    "Welcome to Oussama Sallak's portfolio - Full Stack Developer passionate about creating innovative web solutions",
  authors: [{ name: "Oussama Sallak" }],
  keywords: [
    "Oussama Sallak",
    "Portfolio",
    "Full Stack Developer",
    "Web Development",
    "Software Engineer",
  ],
  creator: "Oussama Sallak",
  icons: {
    icon: [
      {
        url: "/code-icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/code-icon.svg"],
    apple: [
      {
        url: "/code-icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Oussama Sallak | Portfolio",
    description:
      "Welcome to Oussama Sallak's portfolio - Full Stack Developer passionate about creating innovative web solutions",
    siteName: "Oussama Sallak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussama Sallak | Portfolio",
    description:
      "Welcome to Oussama Sallak's portfolio - Full Stack Developer passionate about creating innovative web solutions",
    creator: "@OussamaSallak",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000]`}
      >
        <ScrollProgress />
        {children}
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
