import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Music Copilot - AI-Powered Artist Branding",
  description: "AI-powered agents that generate actionable branding and social media content for music artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_40%),radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.1),transparent_40%)]" />
          <SiteHeader />
          <main className="flex-1 animate-in fade-in duration-500">{children}</main>
        </div>
      </body>
    </html>
  );
}
