import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meet Mehta, full-stack developer",
  description: "Meet Mehta is a full-stack developer in Ahmedabad, India, building software for operational work: food rescue, interview practice, IELTS preparation, and clinical operations.",
  keywords: ["Meet Mehta", "Portfolio", "Software Engineer", "Full-Stack Developer", "Adani University", "Next.js", "TypeScript", "Supabase", "AI-ML"],
};

export const viewport: Viewport = {
  themeColor: "#f0f0ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hanken.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
