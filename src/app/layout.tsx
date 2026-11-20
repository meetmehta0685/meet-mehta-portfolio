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

const siteTitle = "Meet Mehta · Full-stack developer";
const siteDescription = "Meet Mehta is a full-stack developer in Ahmedabad, India, building software for operational work: food rescue, interview practice, IELTS preparation, and clinical operations.";

export const metadata: Metadata = {
  // Share previews need absolute URLs. Change this if the site moves to its own domain.
  metadataBase: new URL("https://meet-mehta-portfolio.vercel.app"),
  title: {
    default: siteTitle,
    template: "%s · Meet Mehta",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Meet Mehta",
    title: siteTitle,
    description: siteDescription,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
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
