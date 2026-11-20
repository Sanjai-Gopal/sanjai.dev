import { AskSanjaiEntry } from "@/components/ask-sanjai";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
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
    "Portfolio of Sanjai, an AI & Data Science student, full-stack developer, AI agent builder, and freelancer building production-grade software and AI-driven applications.",
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
      "Portfolio of Sanjai, an AI & Data Science student, full-stack developer, AI agent builder, and freelancer building production-grade software and AI-driven applications.",
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
      "Portfolio of Sanjai, an AI & Data Science student, full-stack developer, AI agent builder, and freelancer building production-grade software and AI-driven applications.",
    card: "summary_large_image",
  },
  icons: {
    icon: { url: "/sanjai-favicon.png", type: "image/png", sizes: "192x192" },
  },
  verification: {
    google: "",
    yandex: "",
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
          "min-h-screen bg-background font-sans antialiased relative",
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
        <ThemeProvider attribute="class" defaultTheme="light">
          <MotionProvider>
            <TooltipProvider delayDuration={0}>
              <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-25 dark:opacity-20">
                <FlickeringGrid
                  className="h-full w-full"
                  squareSize={3}
                  gridGap={3}
                  maxOpacity={0.25}
                  style={{
                    maskImage:
                      "radial-gradient(ellipse at 50% 25%, black 40%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at 50% 25%, black 40%, transparent 80%)",
                  }}
                />
              </div>
              <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-28 sm:pt-28">
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
