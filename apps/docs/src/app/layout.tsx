import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Banner } from "fumadocs-ui/components/banner";
import { baseUrl } from "@/lib/shared";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Sharpnr Docs",
    default: "Sharpnr Docs",
  },
  description: "Sharpnr Suite Documentation - Comprehensive guides, tutorials, and API references for Sharpnr services. Learn how to integrate and use Sharpnr effectively.",
  icons: {
    icon: "https://cdn.sharpnr.com/shicon.svg",
    apple: "https://cdn.sharpnr.com/shicon.svg",
  },
  openGraph: {
    title: "Sharpnr Docs",
    description: "Sharpnr Suite Documentation - Tutorials and How-to Guides",
    url: baseUrl,
    siteName: "Sharpnr Docs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharpnr Docs",
    description: "Sharpnr Suite Documentation - Tutorials and How-to Guides",
  },
  keywords: [
    "sharpnr",
    "sharpnr documentation",
    "sharpnr how to guide",
    "sharpnr tutorials",
    "sharpnr suite",
    "sharpnr platform",
    "api documentation",
    "software guides",
    "hospitality software",
    "accounting software",
    "hrms documentation",
  ],
  alternates: {
    types: {
      "text/plain": `${baseUrl}/llms.txt`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Sharpnr Docs",
              "url": baseUrl,
              "description": "Sharpnr Suite Documentation - Tutorials and How-to Guides",
              "publisher": {
                "@type": "Organization",
                "name": "Sharpnr",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://cdn.sharpnr.com/shicon.svg"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Banner changeLayout variant="rainbow">
          🚧 Documentation is under active development. Some sections may be
          incomplete.
        </Banner>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
