import React from 'react'
import PeoplePageComponent from './page-component'

export const generateMetadata = () => {
    return {
        title: "Discover People | Umediagram - Explore & Connect",
        description:
          "Discover people on Umediagram, connect with creators, and explore new stories.",
        openGraph: {
          title: "Discover People | Umediagram - Explore & Connect",
          description:
            "Discover people on Umediagram, connect with creators, and explore new stories.",
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
          title: "Discover People | Umediagram - Explore & Connect",
          description:
            "Discover people on Umediagram, connect with creators, and explore new stories.",
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
          title: "Umediagram - Explore & Connect",
          capable: true,
          statusBarStyle: "default",
        },
        colorScheme: "dark",
      }
}

const PeoplePage = () => {
  return (
    <PeoplePageComponent />
  )
}

export default PeoplePage