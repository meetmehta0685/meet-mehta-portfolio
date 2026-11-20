import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import BackToTop from "./components/BackToTop";
import "./globals.css";

// Jost is a geometric sans in the Futura tradition, matching the theme's bold lowercase voice.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Meet Mehta, full-stack developer",
    template: "%s · Meet Mehta",
  },
  description: "Meet Mehta is a full-stack developer in Ahmedabad, India, building software for operational work: food rescue, interview practice, IELTS preparation, and clinical operations.",
  keywords: ["Meet Mehta", "Portfolio", "Software Engineer", "Full-Stack Developer", "Adani University", "Next.js", "TypeScript", "Supabase", "AI-ML"],
};

export const viewport: Viewport = {
  themeColor: "#f75a56",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body>
        <SiteHeader />
        <main className="site-main">{children}</main>
        <footer className="site-footer">© 2026 Meet Mehta · Ahmedabad, India</footer>
        <BackToTop />
      </body>
    </html>
  );
}
