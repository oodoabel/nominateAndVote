import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
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
  title: "NFCS Awards | Nominate & Vote",
  description: "Nominate and vote for your favorite NFCS candidates",
};

import { getAppState } from "@/lib/appConfig";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appState = await getAppState();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
        <Navbar appState={appState} />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
