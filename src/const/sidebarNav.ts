export const sidebarNav = [
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
      {
        title: "Heap Sort",
        path: "/sorting/heap-sort"
      },
    ]
  },
  {
    topic_title: "Trees",
    subtopics: [
      {
        title: "Binary Search Tree",
        path: "/trees/binary-search-tree"
      },
      {
        title: "Binary Heap",
        subtitle: "Priority Queue",
        path: "/trees/binary-heap"
      },
      /*
      {
        title: "Reconstructing BST w/ Traversals",
        subtitle: "Fibonacci Sequence (Divide & Conquer)",
        path: "/trees/n-ary-tree"
      },
      {
        title: "N-ary Tree",
        path: "/trees/n-ary-tree"
      }
      */
    ]
  },
  {
    topic_title: "Graphs",
    subtopics: [
      {
        title: "Network Diagram",
        subtitle: "D3.js",
        path: "/graphs/network"
      },
      {
        title: "Grid Diagram",
        path: "/graphs/grid"
      },
      {
        title: "River-crossing Puzzle",
        path: "/graphs/river-crossing-puzzle"
      },
      /*
      {
        title: "Tower of Hanoii",
        path: "/graphs/tower-of-hanoii"
      },
      */
      {
        title: "Finding Shortest Path",
        subtitle: "Dijkstra's Algorithm",
        path: "/graphs/finding-shortest-path",
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
        subtitle: "Linear approach",
        path: "/recursions/fibonacci-numbers"
      },
      /*
      {
        title: "Fibonacci Number",
        subtitle: "Divide & Conquer",
        path: "/recursions/fibonacci-numbers-p2"
      },
      {
        title: "N Choose K",
        path: "/recursions/n-choose-k"
      }
      */
    ]
  },
  {
    topic_title: "Personal Projects",
    subtopics: [
      // this works: https://developers.netlify.com/guides/build-rag-application-with-neon-netlify-openai/
      {
        title: "Smart Travel Buddy",
        subtitle: "RAG app with OpenAI, Netlify Functions, Neon",
        path: "https://adventurecue.netlify.app/"
      },
      /**
       * Project idea:
       * Building an AI Search App with Next.js and OpenAI
       * https://medium.com/designly/building-an-ai-search-app-with-next-js-and-openai-a-step-by-step-guide-52f24499b979
       */
      {
        title: "UI Design System",
        subtitle: "Vue3, Styleguidist",
        path: "https://rlynjb.github.io/uids/"
      },
      {
        title: "Reincodes Portfolio",
        subtitle: "React, Next.js",
        path: "https://reincodes.netlify.app/"
      },
      {
        title: "SpaceX Reservation System",
        subtitle: "GraphQL, Apollo",
        path: "https://spacex-reserve-seat.netlify.app/"
      }
    ]
  }
];