import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herohero | Support Your Favorite Creators",
  description: "A distraction-free platform to support creators you love. No ads, no algorithm, just authentic content.",
  keywords: ["creators", "subscription", "support", "content", "community"],
  openGraph: {
    title: "Herohero | Support Your Favorite Creators",
    description: "A distraction-free platform to support creators you love.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
