import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avarent - Fair Lending Compliance Evidence Automation",
  description: "Avarent turns the decision records you already collect into a structured evidence packet for fair lending compliance. No direct model access required, no raw PII storage.",
  keywords: ["fair lending", "compliance", "evidence packet", "regulatory exam", "disparity metrics", "adverse action", "Reg B"],
  authors: [{ name: "Avarent" }],
  openGraph: {
    title: "Avarent - Fair Lending Compliance Evidence Automation",
    description: "Turn decision records into structured evidence packets for fair lending compliance. No direct model access required.",
    type: "website",
    url: "https://avarent.com",
    siteName: "Avarent",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avarent - Fair Lending Compliance Evidence Automation",
    description: "Turn decision records into structured evidence packets for fair lending compliance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
