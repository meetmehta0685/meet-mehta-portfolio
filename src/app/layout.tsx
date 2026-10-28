import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meet Mehta, full-stack developer",
  description: "Meet Mehta is a full-stack developer in Ahmedabad, India, building software for operational work: food rescue, interview practice, IELTS preparation, and clinical operations.",
  keywords: ["Meet Mehta", "Portfolio", "Software Engineer", "Full-Stack Developer", "Adani University", "Next.js", "TypeScript", "Supabase", "AI-ML"],
};

export const viewport: Viewport = {
  themeColor: "#fbfbfa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
