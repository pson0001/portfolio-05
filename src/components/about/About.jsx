import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import c from "./about.module.scss";
import FallingBalls from "../falling-balls/FallingBalls";
import boulder from "../assets/about/boulder.jpg";
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
        "Like tackling tough bouldering routes, I approach UX challenges with persistence, analysing issues from multiple angles until I find the right solution.",
    },
    {
      title: "Iterate the method",
      paragraph:
        "Success in bouldering, design and development both require constant refinement. I iterate on my work, using feedback and testing to create seamless experiences.",
    },

    {
      title: "Solving problems together",
      paragraph:
        "I thrive in collaborative environments, just as I do when sharing strategies with fellow climbers. Diverse perspectives lead to the best solutions.",
    },
  ];
  return (
    <div className={c.introWrapper}>
      <div className={c.intro}>
        <div>Hi, I am Ping.</div>
        <div>
          {content.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </div>
      </div>
      <div>
        Here's how I have approached design, programming and life — in the form
        of bouldering metaphors.
      </div>
      <div className={c.content}>
        <div className={c.imageContainer}>
          <img src={boulder} alt="" />
        </div>
        <div className={c.detailContainer}>
          {contentDetails.map((item) => (
            <div key={item.title}>
              <div>{item.title}</div>
              <div className={c.paragraph}>{item.paragraph}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={c.contact}>
        <div className={c.title}>
          <span>
            If you are interested to chat, feel free to reach out on{" "}
            <a
              href="https://www.linkedin.com/in/ping-song-pson0001/"
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
            </a>
            <span>.</span>
          </span>
        </div>
        <div className={c.title}>
          <span>Thank you for stopping by!</span>
          <span className={c.note}>
            © 2025 Design and developed by Ping Song
          </span>
        </div>
      </div>
      {/* <div className={c.canvasContainer}>
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
      </div> */}
    </div>
  );
};

export default About;
