import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}