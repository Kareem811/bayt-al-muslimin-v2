import type { Metadata, Viewport } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { KahfReminder } from "@/components/layout/KahfReminder";
import { publicConfig } from "@/lib/api/endpoints";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: publicConfig.siteName,
    template: `%s · ${publicConfig.siteName}`,
  },
  description:
    "بيت المسلمين — قراءة القرآن الكريم مع التفسير الميسر، تلاوات نخبة من القراء، الأحاديث النبوية ومواقيت الصلاة.",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/icon.webp",
    shortcut: "/icon.webp",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: publicConfig.siteName,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F4C5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${amiri.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <AudioPlayer />
          <KahfReminder />
        </Providers>
      </body>
    </html>
  );
}
