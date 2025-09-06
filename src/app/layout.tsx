import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Thoven - Connect with Music Teachers",
  description: "Find qualified music instructors for your child. Browse profiles, read reviews, and book lessons with verified teachers in your area.",
  keywords: "music teachers, music lessons, piano lessons, guitar lessons, music education, music instructors",
  authors: [{ name: "Thoven Team" }],
  openGraph: {
    title: "Thoven - Connect with Music Teachers",
    description: "Find qualified music instructors for your child. Browse profiles, read reviews, and book lessons with verified teachers in your area.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}