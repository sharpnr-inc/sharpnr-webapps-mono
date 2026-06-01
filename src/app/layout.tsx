import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Banner } from "fumadocs-ui/components/banner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://docs.sharpnr.test"),
  title: "Sharpnr Docs",
  description: "Sharpnr Suite Documentation",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* <Banner
          changeLayout
          variant="rainbow"
          rainbowColors={[
            "rgba(255,100,0, 0.5)",
            "rgba(255,100,0, 0.5)",
            "transparent",
            "rgba(255,100,0, 0.5)",
            "transparent",
            "rgba(255,100,0, 0.5)",
            "transparent",
          ]}
        >
          <p className="font-bold">Sharpnr Docs V0.0.1</p>
        </Banner> */}
        ;<RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
