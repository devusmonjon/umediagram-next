import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Umediagram - Explore & Connect",
  description:
    "Share your moments, connect with creators, and explore new stories on Umediagram.",
  openGraph: {
    title: "Umediagram - Explore & Connect",
    description:
      "Share your moments, connect with creators, and explore new stories on Umediagram.",
    url: "https://umediagram.vercel.app",
    siteName: "Umediagram",
    images: [
      {
        url: "/preview.png", // Path to your thumbnail image
        width: 1438,
        height: 1023,
        alt: "Umediagram Home Feed",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umediagram - Explore & Connect",
    description:
      "Share your moments, connect with creators, and explore new stories on Umediagram.",
    images: ["/preview.png"], // Path to your image
  },
  manifest: "/manifest.json",
  // canonical
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL("https://umediagram.vercel.app"),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  appleWebApp: {
    title: "Umediagram - Explore & Connect",
    capable: true,
    statusBarStyle: "default",
  },
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Umediagram Pro Plan",
              description: "Upgrade to Umediagram Pro for unlimited access.",
              brand: {
                "@type": "Organization",
                name: "Umediagram",
              },
            }),
          }}
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
