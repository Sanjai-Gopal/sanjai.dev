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
    default: "Sanjai — AI & Full-Stack Systems Engineer | SKCET",
    template: `%s — ${sanjaiProfile.name}`,
  },
  description:
    "Official portfolio of Sanjai, AI & Data Science Engineer at SKCET (9.0 CGPA). Building autonomous AI agents, full-stack systems, and real-time ML telemetry.",
  keywords: [
    "Sanjai",
    "Sanjai Gopal",
    "heysanjai",
    "heysanjai.cv",
    "AI Engineer",
    "Full Stack Systems Engineer",
    "SKCET",
    "Sri Krishna College of Engineering and Technology",
    "Autonomous AI Agents",
    "Data Science",
    "Machine Learning",
    "Next.js",
    "React",
    "FastAPI",
    "Python",
    "TypeScript",
  ],
  authors: [{ name: sanjaiProfile.name, url: sanjaiProfile.url }],
  creator: sanjaiProfile.name,
  alternates: {
    canonical: sanjaiProfile.url,
  },
  openGraph: {
    title: "Sanjai — AI & Full-Stack Systems Engineer | SKCET",
    description:
      "Official portfolio of Sanjai, AI & Data Science Engineer at SKCET (9.0 CGPA). Building autonomous AI agents, full-stack systems, and real-time ML telemetry.",
    url: sanjaiProfile.url,
    siteName: "Sanjai Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/sanjai-logo.svg",
        width: 1200,
        height: 630,
        alt: "Sanjai — AI & Full-Stack Systems Engineer",
      },
    ],
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
    title: "Sanjai — AI & Full-Stack Systems Engineer | SKCET",
    description:
      "Official portfolio of Sanjai, AI & Data Science Engineer at SKCET (9.0 CGPA). Building autonomous AI agents, full-stack systems, and real-time ML telemetry.",
    card: "summary_large_image",
    images: ["/sanjai-logo.svg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/sanjai-favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/sanjai-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${sanjaiProfile.url}#person`,
        name: "Sanjai",
        alternateName: "Sanjai Gopal",
        url: sanjaiProfile.url,
        image: `${sanjaiProfile.url}me.jpg`,
        jobTitle: "AI & Full-Stack Systems Engineer",
        description:
          "2nd-year B.Tech AI & Data Science student at SKCET (9.0 CGPA) building production web platforms, autonomous AI agents, and competitive hackathon projects.",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Sri Krishna College of Engineering and Technology (SKCET)",
          sameAs: "https://www.skcet.ac.in",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Coimbatore",
          addressRegion: "Tamil Nadu",
          addressCountry: "India",
        },
        email: `mailto:${sanjaiProfile.email}`,
        sameAs: [sanjaiProfile.github, sanjaiProfile.linkedin],
        knowsAbout: [
          "Artificial Intelligence",
          "Autonomous AI Agents",
          "Machine Learning",
          "Data Science",
          "Full-Stack Web Development",
          "React",
          "Next.js",
          "FastAPI",
          "Python",
          "TypeScript",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${sanjaiProfile.url}#website`,
        url: sanjaiProfile.url,
        name: "Sanjai — AI & Full-Stack Systems Engineer",
        description:
          "Official portfolio of Sanjai, AI & Data Science Engineer at SKCET.",
        publisher: {
          "@id": `${sanjaiProfile.url}#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": sanjaiProfile.url,
        url: sanjaiProfile.url,
        name: "Sanjai's Portfolio & Engineering Showcase",
        mainEntity: {
          "@id": `${sanjaiProfile.url}#person`,
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
      </head>
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
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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
