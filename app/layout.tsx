import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Harsh Kankaria - Co-founder & Product Leader",
  description: "Co-founder and product leader passionate about building AI-powered solutions. Ex-Zomato, IIT Delhi alumnus.",
  keywords: ["Harsh Kankaria", "Co-founder", "Product Leader", "AI", "Zomato", "IIT Delhi", "Entrepreneur"],
  authors: [{ name: "Harsh Kankaria" }],
  creator: "Harsh Kankaria",
  publisher: "Harsh Kankaria",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Harsh Kankaria - Co-founder & Product Leader",
    description: "Co-founder and product leader passionate about building AI-powered solutions. Ex-Zomato, IIT Delhi alumnus.",
    url: "https://harshkankaria.com", // Replace with your actual domain
    siteName: "Harsh Kankaria",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kankaria - Co-founder & Product Leader",
    description: "Co-founder and product leader passionate about building AI-powered solutions. Ex-Zomato, IIT Delhi alumnus.",
    creator: "@yourtwitter", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
