import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boubacar Mounkaila - Fullstack Developer",
  description: "Développeur Fullstack passionné avec +5 ans d'expérience. Expert en Laravel, Symfony, React.js, Next.js et Vue.js. Création d'applications web performantes et innovantes. Basé à Niamey, Niger.",
  keywords: ["Boubacar Mounkaila", "Fullstack Developer", "Laravel", "Symfony", "React", "Next.js", "Vue.js", "Développeur Web", "Niger", "Niamey"],
  authors: [{ name: "Boubacar Mounkaila" }],
  creator: "Boubacar Mounkaila",
  metadataBase: new URL('https://portfolio.nigerdev.com'),

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio.nigerdev.com",
    title: "Boubacar Mounkaila - Fullstack Developer",
    description: "Développeur Fullstack passionné avec +5 ans d'expérience. Expert en Laravel, Symfony, React.js, Next.js et Vue.js. Création d'applications web performantes et innovantes.",
    siteName: "Portfolio Boubacar Mounkaila",
    images: [
      {
        url: "/image/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Boubacar Mounkaila - Fullstack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Boubacar Mounkaila - Fullstack Developer",
    description: "Développeur Fullstack passionné avec +5 ans d'expérience. Expert en Laravel, Symfony, React.js, Next.js et Vue.js.",
    images: ["/image/profile.jpeg"],
    creator: "@mounkaila144", // Remplacez par votre handle Twitter si vous en avez un
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
