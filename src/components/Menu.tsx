"use client";

import { useState } from "react";
import { sidebarNav } from "@/const/sidebarNav";
import Link from 'next/link';

interface TopicProps {
  topic_title: string;
  subtopics: SubtopicProps[]
}
interface SubtopicProps {
  title: string;
  path: string;
  subtitle?: string;
}

export default function Menu () {
  const topics: TopicProps[] = sidebarNav;

  const width = 14;
  const openMenu = 'left';
  const closeMenu = `-left-64`

  let [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const toggleMenu = () => {
    // NOTE: same as >> isMenuOpen = !isMenuOpen
    setIsMenuOpen(pre => !pre)
  }

  return (
    <div className={`fixed w-64 z-[300] top ${isMenuOpen ? openMenu : closeMenu} bg-black`}>
      <button
        className="absolute top-[3em] -right-[4.5em] bg-black w-[7.5em] h-[2em] text-center text-sm -rotate-90"
        onClick={toggleMenu}
      >
        {isMenuOpen ? 'close menu' : 'open menu'}
      </button>

      <ul>
      {topics.map((topic: TopicProps, index) => {
        return <li key={'topic'+index} className="inline-block align-top mr-2">
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
  )
}