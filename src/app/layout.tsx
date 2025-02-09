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
  title: "DSA Visualizer",
  description: "Generated by create next app",
};

interface TopicProps {
  topic_title: string;
  subtopics: SubtopicProps[]
}
interface SubtopicProps {
  title: string;
  path: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const topics: TopicProps[] = [
    {
      topic_title: "Sorting Algorithms",
      subtopics: [
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
      ]
    },
    {
      topic_title: "Recursion & Backtracking",
      subtopics: [
        {
          title: "Count all Subsets",
          path: "/recursions/count-all-subsets"
        },
        {
          title: "Fibonacci Number",
          path: "/recursions/fibonacci-numbers"
        },
        /*
        {
          title: "N Choose K",
          path: "/recursions/n-choose-k"
        }
        */
      ]
    }
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-mono)]`}
      >
        <header className="sticky top-0 p-4 z-10 bg-black">
          <h1 className="text-xl">
            DSA Visualizer
          </h1>
        </header>

        <main className="mx-4 relative grid grid-cols-12"
          style={{ height: "85vh" }}
        >
          <div className="col-span-2 bg-black">
            <ul>
            {topics.map((topic: TopicProps, index) => {
              return <li key={'topic'+index}>
                <h6 className="text-sm">{topic.topic_title}</h6>
                <ul className="text-sm">
                  {topic.subtopics.map((subtopicItem: SubtopicProps, subtopicIndex) => {
                    return <li key={'subtopic'+subtopicIndex}>
                      <Link  
                        className="px-4"
                        href={subtopicItem.path}
                      >
                        {subtopicItem.title}
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
