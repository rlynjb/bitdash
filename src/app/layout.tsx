import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { sidebarNav } from "@/const/sidebarNav";

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

interface TopicProps {
  topic_title: string;
  subtopics: SubtopicProps[]
}
interface SubtopicProps {
  title: string;
  path: string;
  subtitle?: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const topics: TopicProps[] = sidebarNav;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-mono)]`}
      >
        <header className="sticky top-0 p-4 z-10 bg-black">
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
          <div className="col-span-2 bg-black">
            <ul>
            {topics.map((topic: TopicProps, index) => {
              return <li key={'topic'+index}>
                <h6 className="text-sm text-gray-400">{topic.topic_title}</h6>
                <ul className="text-sm mb-4 pl-3 list-['.']">
                  {topic.subtopics.map((subtopicItem: SubtopicProps, subtopicIndex) => {
                    return <li key={'subtopic'+subtopicIndex}
                      className="pl-1"
                    >
                      <Link  
                        className="block"
                        href={subtopicItem.path}
                      >
                        {subtopicItem.title}
                        {subtopicItem.subtitle &&
                          <span className="block text-xs text-gray-400">
                            ({subtopicItem.subtitle})
                          </span>
                        }
                      </Link>
                    </li>
                  })}

                </ul>
              </li>
            })}
            </ul>
          </div>

          <div className="col-span-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
