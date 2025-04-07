import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import c from "./about.module.scss";
import FallingBalls from "../falling-balls/FallingBalls";
gsap.registerPlugin(ScrollTrigger);

const About = ({}) => {
  //   const aboutContainerRef = useRef(null);
  //   const panelsRef = useRef([]);
  //   const sectionsRef = useRef([]);

  //   useEffect(() => {
  //     let ctx = gsap.context(() => {
  //       const panels = panelsRef.current;
  //       const aboutContainer = aboutContainerRef.current;
  //       //   // Calculate the start position
  //       //   const startPosition = aboutContainer.getBoundingClientRect().left;
  //       //   const aboutTl = gsap.timeline({
  //       //     scrollTrigger: {
  //       //       trigger: aboutContainer,
  //       //       start: `${startPosition}px bottom`, // Use the calculated start position
  //       //       end: "+=100px", // Adjust as needed
  //       //       // scrub: true,
  //       //       markers: true, // Keep this for debugging
  //       //     },
  //       //   });
  //       //   // Animate the aboutContainer itself if needed
  //       //   aboutTl.to(workContainerRef.current, {
  //       //     backgroundColor: "#1e1e1e", // Example animation for the container
  //       //     duration: 1,
  //       //     ease: "power2.out",
  //       //   });
  //       //   // Animate each panel
  //       //   panels.forEach((panel, i) => {
  //       //     aboutTl.to(panel, {
  //       //       opacity: 1,
  //       //       stagger: 0.02,
  //       //       duration: 0.3,
  //       //       ease: "power2.out", // Easing function
  //       //     });
  //       //   });
  //     }, aboutContainerRef.current);
  //     return () => {
  //       ctx.revert();
  //     };
  //   }, []);

  const content = [
    "A designer,",
    "A developer,",
    "A marker,",
    "A learner,",
    "and a bouldering enthusiast.",
  ];

  const contentDetails = [
    {
      title: "Try the problem",
      paragraph:
        "Just as I attempt challenging routes on the wall, I approach UX problems with persistence, analysing user pain points from different angles until I discover the right path forward.",
    },
    {
      title: "Iterate the method",
      paragraph:
        "In bouldering, adjusting your technique is key to success. Similarly, in development, I continuously refine my approach, incorporating user feedback and testing various solutions until the experience feels seamless.",
    },
    {
      title: "When to let it go",
      paragraph:
        "Sometimes, the most creative solutions emerge when you step back from a problem. I've learned that knowing when to take a break from a challenging design puzzle, like a difficult boulder problem, often leads to breakthrough insights upon return.",
    },
    {
      title: "Solving problems together",
      paragraph:
        "During bouldering sessions, I often find myself drawn to groups puzzling over difficult routes. I naturally join these conversations, offering my perspective on approach and technique. Through this collaborative exchange of ideas, we eventually find a solution that works for everyone. This mirrors my professional style—I thrive in team environments where diverse viewpoints converge to create the best possible outcome.",
    },
  ];
  return (
    <div className={c.aboutContainer}>
      <div className={c.intro}>
        <div>Hi, I am Ping.</div>
        <div>
          {content.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </div>
        <div>
          Here's how I have approached design, programming and life — in the
          form of bouldering metaphors.
        </div>
        <div className={c.detailContainer}>
          {contentDetails.map((item) => (
            <div>
              <div>{item.title}</div>
              <div className={c.paragraph}>{item.paragraph}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={c.canvasContainer}>
        <FallingBalls
          text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
          highlightWords={[
            "React",
            "Bits",
            "animated",
            "components",
            "simplify",
          ]}
          highlightClass="highlighted"
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="2rem"
          mouseConstraintStiffness={0.9}
        />
      </div>
    </div>
  );
};

export default About;
