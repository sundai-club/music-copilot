import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_40%),radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.1),transparent_40%)]" />
            <HeaderWrapper />
            <main className="flex-1 animate-in fade-in duration-500">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
