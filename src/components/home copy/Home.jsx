import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import c from "./home.module.scss";
import Face from "./Face";
import SplitType from "split-type";
import Work from "../work/Work";
import About from "../about/About";
const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const component = useRef();
  const sliderRef = useRef();
  const faceRef = useRef();
  const panelRef = useRef();
  const nameRef = useRef();
  const sLetterRef = useRef();
  const firstNavItemRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const landingRef = useRef();
  const [updatedX, setUpdatedX] = useState();
  const bottomNavRef = useRef();
  const workContainerRef = useRef();
  const updateFacePosition = () => {
    if (nameRef.current && faceRef.current && sLetterRef.current) {
      let toPositionX =
        nameRef.current.getBoundingClientRect().left +
        nameRef.current.getBoundingClientRect().width * 0.585;

      setUpdatedX(toPositionX);
      let toPositionY = nameRef.current.getBoundingClientRect().top;

      gsap.to(faceRef.current, {
        duration: 2,
        left: toPositionX,
        top: toPositionY,
        rotation: 360,
        ease: "power4.out",
        delay: 0.5,
        onComplete: () => {
          const rect = faceRef.current.getBoundingClientRect();
          setUpdatedX(rect.left);
        },
      });
    }
  };

  useLayoutEffect(() => {
    // Initial position update
    updateFacePosition();

    // Update face position on resize
    window.addEventListener("resize", updateFacePosition);

    return () => {
      window.removeEventListener("resize", updateFacePosition);
    };
  }, []); // Run only on mount

  // This effect will run whenever updatedX changes
  useEffect(() => {
    if (updatedX) {
      let ctx = gsap.context(() => {
        const faceTl = gsap.timeline();

        faceTl.to(faceRef.current, {
          // scale: 40 / faceRef.current.getBoundingClientRect().height,
          scale: 60,
          opacity: 1,
          rotation: 360,
          x:
            window.innerWidth / 2 -
            updatedX -
            faceRef.current.getBoundingClientRect().width / 2 -
            104 +
            20, // Use the updatedX value
          y: 45,
          scrollTrigger: {
            trigger: faceRef.current,
            start: `top ${faceRef.current.getBoundingClientRect().top - 12}px`,
            scrub: 1,
            end: "top 300",
            // markers: true,
            zIndex: 1,
            onEnterBack: () => {
              console.log("Scrolled back to the animation area");
              // Reset opacity and background color when scrolling back
              gsap.to(faceRef.current, {
                opacity: 1, // Reset opacity to 1
                duration: 0,
                zIndex: 1,
              });
              gsap.to(sliderRef.current, {
                backgroundColor: "#1e1e1e", // Reset background color
                duration: 0.2,
              });
              gsap.to(landingRef.current, {
                opacity: 1, // Reset opacity to 1
                duration: 0.5,
                delay: 1,
                zIndex: 1,
              });
            },
          },

          // delay: 0.2,
          onComplete: () => {
            gsap.to(sliderRef.current, {
              backgroundColor: "#FF7EC4",
              duration: 0, // Duration for fading out
            });
            gsap.to(landingRef.current, {
              opacity: 0, // Reset opacity to 1
              zIndex: -9,
            });
            gsap.to(faceRef.current, {
              opacity: 0,
              duration: 0,
              zIndex: -1,
              delay: 0.4,
            });
          },
        });
        const dots = bottomNavRef.current.querySelectorAll(`.${c.dot}`);
        // Staggered animation for the dots using ScrollTrigger
        gsap.to(dots, {
          scale: 1, // Ensure dots are visible
          y: 0, // Move dots to their original position
          stagger: 0.2, // Stagger each dot by 0.2 seconds
          duration: 0.5, // Duration of each dot's animation
          ease: "power2.out", // Easing function
          scrollTrigger: {
            trigger: bottomNavRef.current,
            start: `top ${window.innerHeight / 2}px`,
            end: "top top",
            scrub: 1,
            // markers: true,
          },
        });
        gsap.to(panelRef.current, {
          xPercent: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sliderRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + panelRef.current.offsetWidth,
          },
        });
      }, component.current);

      return () => {
        ctx.revert();
      };
    }
  }, [updatedX]); // Run this effect whenever updatedX changes

  useEffect(() => {
    if (descriptionRef.current && titleRef.current && nameRef.current) {
      const splitText = new SplitType(descriptionRef.current, {
        types: "words, chars",
      });
      const splitTextBig = new SplitType(titleRef.current);
      const splitTextDisplay = new SplitType(nameRef.current, {
        types: "words, chars",
      });

      let ctx = gsap.context(() => {
        gsap.to(splitText.chars, {
          y: 0,
          stagger: 0.005,
          delay: 2.5,
          duration: 0.3,
        });
        gsap.to(splitTextBig.chars, {
          y: 0,
          stagger: 0.02,
          delay: 2.5,
          duration: 0.3,
        });

        gsap.to(splitTextDisplay.chars, {
          y: 0,
          stagger: 0.05,
          delay: 2,
          duration: 0.3,
        });
      }, component);
      return () => ctx.revert();
    }
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      <Face faceRef={faceRef} />
      <div className={c.bottomNav} ref={bottomNavRef}>
        <div className={`${c.dot} ${c.black}`} ref={firstNavItemRef}></div>
        <div className={`${c.dot} ${c.white}`}></div>
        <div className={`${c.dot} ${c.pink}`}></div>
      </div>
      <div ref={component}>
        <div ref={sliderRef} className={c.container}>
          <div ref={panelRef}>
            <div className={c.contentContainer}>
              <div className={c.landing} ref={landingRef}>
                <div className={c.topContainer}>
                  <div className={c.top} ref={titleRef}>
                    <div className={c.cover}>Hi, I'm</div>
                  </div>
                  <div className={c.description} ref={descriptionRef}>
                    <div className={c.cover}>a designer and developer.</div>
                    <div className={c.cover}>
                      I build meaningful products and create memorable digital
                      experiences from concept to launch.
                    </div>
                  </div>
                </div>
                <div className={c.bottom}>
                  <div ref={nameRef} className={`${c.name} ${c.cover}`}>
                    <div>PING</div>
                    <div className={c.sLetter} ref={sLetterRef}>
                      S
                    </div>
                    <div className={c.cover}>NG</div>
                  </div>
                </div>
              </div>
              <div className={c.workContainer} ref={workContainerRef}>
                <Work />
              </div>
            </div>
          </div>
        </div>
        <About />
      </div>
    </>
  );
};

export default Home;
