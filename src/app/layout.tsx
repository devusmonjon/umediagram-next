import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Snapgram - Explore & Connect",
  description:
    "Share your moments, connect with creators, and explore new stories on Snapgram.",
  openGraph: {
    title: "Snapgram - Explore & Connect",
    description:
      "Share your moments, connect with creators, and explore new stories on Snapgram.",
    url: "https://umediagram.vercel.app",
    siteName: "Snapgram",
    images: [
      {
        url: "/preview.png", // Path to your thumbnail image
        width: 1438,
        height: 1023,
        alt: "Snapgram Home Feed",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapgram - Explore & Connect",
    description:
      "Share your moments, connect with creators, and explore new stories on Snapgram.",
    images: ["/preview.png"], // Path to your image
  },
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
    title: "Snapgram - Explore & Connect",
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
              name: "Snapgram Pro Plan",
              description: "Upgrade to Snapgram Pro for unlimited access.",
              brand: {
                "@type": "Organization",
                name: "Snapgram",
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
