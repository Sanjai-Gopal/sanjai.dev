import { AskSanjaiEntry } from "@/components/ask-sanjai";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const geist = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  metadataBase: new URL(sanjaiProfile.url),
  title: {
    default: `${sanjaiProfile.name} — AI & Full Stack Developer`,
    template: `%s — ${sanjaiProfile.name}`,
  },
  description:
    "Portfolio of Sanjai, AI & Data Science Engineer at SKCET building autonomous AI agents, distributed systems, and production web applications.",
  keywords: [
    "Sanjai",
    "sanjaibuilds",
    "Full Stack Developer",
    "AI Agent Builder",
    "AI and Data Science",
    "Freelancer",
    "Machine Learning",
    "React",
    "Next.js",
    "FastAPI",
    "Portfolio",
  ],
  openGraph: {
    title: `${sanjaiProfile.name} — AI & Full Stack Developer`,
    description:
      "Portfolio of Sanjai, AI & Data Science Engineer at SKCET building autonomous AI agents, distributed systems, and production web applications.",
    url: sanjaiProfile.url,
    siteName: sanjaiProfile.name,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${sanjaiProfile.name} — AI & Full Stack Developer`,
    description:
      "Portfolio of Sanjai, AI & Data Science Engineer at SKCET building autonomous AI agents, distributed systems, and production web applications.",
    card: "summary_large_image",
  },
  icons: {
    icon: { url: "/sanjai-favicon.png", type: "image/png", sizes: "192x192" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative selection:bg-primary selection:text-primary-foreground",
          geist.variable,
          geistMono.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: sanjaiProfile.name,
              url: sanjaiProfile.url,
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MotionProvider>
            <TooltipProvider delayDuration={0}>
              {/* Subtle executive top ambient glow */}
              <div
                className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[480px] bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent"
                aria-hidden
              />
              <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-24">
                {children}
              </div>
              <Footer />
              <Navbar />
              <AskSanjaiEntry />
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
