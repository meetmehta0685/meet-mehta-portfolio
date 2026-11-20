import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import { SocialIcons } from "./components/Icons";
import { contact } from "@/data/profile";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
  themeColor: "#f9f9f9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hanken.variable}>
      <body>
        <SiteHeader />
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <SocialIcons email={contact.email} github={contact.github} linkedin={contact.linkedin} />
          <p>© 2026 Meet Mehta · {contact.city}</p>
        </footer>
      </body>
    </html>
  );
}
