import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const subtopics = [
    {
      title: "Selection Sort",
      path: "/sorting/selection-sort"
    },
    {
      title: "Bubble Sort",
      path: "/sorting/bubble-sort"
    },
    {
      title: "Insertion Sort",
      path: "/sorting/insertion-sort"
    },
    {
      title: "Merge Sort",
      path: "/sorting/merge-sort"
    },
    {
      title: "Quick Sort",
      path: "/sorting/quick-sort"
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-mono)]`}
      >
        <header className="sticky top-0 p-4 z-10 bg-black flex justify-between">
          <h1 className="text-xl">
            Sorting Algorithms
          </h1>

          <div>
            {subtopics.map((item: any, index) => {
              return <Link
                key={'subtopic'+index}
                className="px-4"
                href={item.path}
              >
                {item.title}
              </Link>
            })}
          </div>

          <div>
            for other stuff
          </div>
        </header>

        <main className="my-6 mx-4 relative"
          style={{ height: "75vh" }}
        >
          {children}
        </main>
        
        <footer className="bg-black z-10 sticky bottom-0 left-0 right-0 p-4 flex gap-6 flex-wrap items-center justify-center">
          controls | input size | etc
        </footer>
      </body>
    </html>
  );
}
