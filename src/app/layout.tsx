import type { Metadata } from "next";
import { JetBrains_Mono, Syne, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rashminda Ekanayake — Software Engineer & Graphic Designer",
  description:
    "Portfolio of Rashminda Ekanayake — building logic-driven architecture and crafting emotion-driven visuals.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jetBrainsMono.variable} ${syne.variable} ${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
