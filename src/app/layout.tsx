import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Menu from "@/components/Menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reincodes",
  description: "Portfolio, DSA Visualizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-mono)]`}
      >
        <header className="sticky top-0 p-4 z-10 bg-black flex justify-between">
          <Link  
            className="block"
            href={"/"}
          >
            <h1 className="text-xl leading-none">
              Reincodes<br/>
              <span className="text-xs text-gray-400">Portfolio & DSA Visualizer</span>
            </h1>
          </Link>
        </header>

        <main className="mx-4 relative grid grid-cols-12"
          style={{ height: "85vh" }}
        >
          <Menu />

          <div className="b-container col-span-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
