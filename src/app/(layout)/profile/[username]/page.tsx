import { getProfile } from "@/work-with-api";
import ProfilePageComponent from "./page-component";
let username1: string | null = null;
const Profile = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  username1 = username;
  const profile = await getProfile(username, true);

  return (
    <>
      <ProfilePageComponent profile={profile} />
    </>
  );
};
async function generateMetadata() {
  const profile = await getProfile(username1 ?? "", true);
  if (!profile) {
    // metadata
    return {
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
  }
  return {
    title: `${profile.fullName} (${profile.username}) ` + "• UMEDIAGRAM",
    description:
      "Share your moments, connect with creators, and explore new stories on Snapgram.",
    openGraph: {
      title: `${profile.fullName} (${profile.username}) ` + "• UMEDIAGRAM",
      description:
        "Share your moments, connect with creators, and explore new stories on Snapgram.",
      url: "https://umediagram.vercel.app",
      siteName: "Snapgram",
      images: [
        {
          url:
            profile.photo ??
            "https://files.moontv.uz/uploads/profile_not_found.png", // Path to your thumbnail image
          width: 300,
          height: 300,
          alt: profile.fullName ?? "Snapgram",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.fullName} (${profile.username}) ` + "• UMEDIAGRAM",
      description:
        "Share your moments, connect with creators, and explore new stories on Snapgram.",
      images: [
        profile.photo ??
          "https://files.moontv.uz/uploads/profile_not_found.png",
      ], // Path to your image
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
      title: `${profile.fullName} (${profile.username}) ` + "• UMEDIAGRAM",
      capable: true,
      statusBarStyle: "default",
    },
    colorScheme: "dark",
  };
}
export { generateMetadata };

export default Profile;
