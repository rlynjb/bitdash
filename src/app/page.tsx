export default function Home() {
  return (
    <div className="p-6 text-sm">
      <h2 className="mb-6">Hi! Welcome to my Porfolio & DSA Visualizer...</h2>
      
      <p className="mb-6">
      Software Engineer - Front End with 7+ yrs of experience working in small/large teams
      <br></br>
      using Vue.js to develop interactive, user-friendly, and feature-rich web applications.
      </p>

      <p className="mb-6">
      A self-motivated and lifelong learner familiar with modern web development, <br></br>
      with a goal to be proficient in <span className="text-red-600">Data Structures & Algorithms</span> and <span className="text-red-600">AI tech stack</span>.
      </p>

      <p className="mb-6">
        Current tech stack I have experience with are:
        <br></br>
        <span className="text-red-600">Vue, Nuxt, React, Nextjs, JavaScript, HTML/CSS</span>, <br></br>
        and I've dabbled with <span className="text-red-600">Python</span>
      </p>

      <p className="mb-6">
        Lately, I also find myself intrigued by <span className="text-red-600">classic Atari games</span>. <br></br>
        I'm curious how they are built and how DSA are used in those games.
      </p>

      <p>
        I’m currently looking to network and see where my skillset takes me.<br/>
        If you have a question or just want to say hi, feel free to contact me via:
      </p>
      <ul className="text-center">
        <li>
          <a href="https://www.linkedin.com/in/rlynpro/" target="_blank">
            LinkedIn
          </a>
        </li>
        {/**
        <li>
          <a href="https://docs.google.com/document/d/1FgxFN4W5GsixebRV8TnxKGZW8e57vjXb/edit?usp=sharing&ouid=114519242602697145196&rtpof=true&sd=true" target="_blank">
            Resume
          </a>
        </li>
         */}
        <li>
          <a href="https://github.com/rlynjb" target="_blank">
            Github
          </a>
        
        </li>
      </ul>
    </div>
  );
}
