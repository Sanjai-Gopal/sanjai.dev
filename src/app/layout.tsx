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
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(sanjaiProfile.url),
  title: {
    default: "Sanjai Gopal — AI & Full Stack Developer",
    template: `%s — ${sanjaiProfile.name}`,
  },
  description:
    "Portfolio of Sanjai Gopal, an AI & Data Science student, full-stack developer, freelancer, and machine learning enthusiast building modern software and AI-driven applications.",
  keywords: [
    "Sanjai Gopal",
    "Full Stack Developer",
    "AI and Data Science",
    "Freelancer",
    "Machine Learning",
    "React",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Sanjai Gopal — AI & Full Stack Developer",
    description:
      "Portfolio of Sanjai Gopal, an AI & Data Science student, full-stack developer, freelancer, and machine learning enthusiast building modern software and AI-driven applications.",
    url: sanjaiProfile.url,
    siteName: `${sanjaiProfile.name} — Portfolio`,
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
    title: "Sanjai Gopal — AI & Full Stack Developer",
    description:
      "Portfolio of Sanjai Gopal, an AI & Data Science student, full-stack developer, freelancer, and machine learning enthusiast building modern software and AI-driven applications.",
    card: "summary_large_image",
  },
  icons: {
    icon: "/sanjai-logo.svg",
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
        <ThemeProvider attribute="class" defaultTheme="light">
          <MotionProvider>
            <TooltipProvider delayDuration={0}>
              <div className="absolute inset-x-0 top-0 h-[140px] overflow-hidden z-0">
                <FlickeringGrid
                  className="h-full w-full"
                  squareSize={2}
                  gridGap={2}
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black, transparent)",
                  }}
                />
              </div>
              <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-32 sm:pt-32">
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
