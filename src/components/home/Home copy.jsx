import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import c from "./home.module.scss";
import Work from "../work/Work";
import Face from "./Face";
import SplitType from "split-type";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const component = useRef();
  const sliderRef = useRef();
  const faceRef = useRef();
  const panelRef = useRef();
  const nameRef = useRef();
  const sLetterRef = useRef();
  const firstNavItemRef = useRef();
  const [sPosition, setSPosition] = useState([0, 0]);

  // Effect to update the position of the S letter
  useEffect(() => {
    const updatePosition = () => {
      if (nameRef.current) {
        const rect = nameRef.current.getBoundingClientRect();
        setSPosition([
          rect.left + rect.width * 0.67,
          rect.top + rect.height / 2 - 22,
        ]); // Center the position
      }
    };

    // Initial position update
    updatePosition();

    // Add resize event listener to update position on window resize
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);
  // const centerX = window.innerWidth / 2; // Center of the viewport
  // const elementWidth = faceRef.current.offsetWidth; // Width of the element
  // const startX = faceRef.current.getBoundingClientRect().left; // Current position

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(faceRef.current, {
        duration: 2,
        xPercent: -sPosition[0], // Move face to the right of the S letter
        rotation: -360,
        ease: "power4.out",
        delay: 0.5,
      });
      // const centerX = window.innerWidth / 2; // Center of the viewport
      // const elementWidth = faceRef.current.offsetWidth; // Width of the element
      // const startX = faceRef.current.getBoundingClientRect().left; // Current position

      // Calculate the final x position to center the element
      // const finalX = centerX - elementWidth / 2 - startX;

      // console.log("centerX:", centerX);
      // console.log("elementWidth:", elementWidth);
      // console.log("startX:", startX);
      // console.log("finalX:", finalX);
      // console.log(centerX - elementWidth / 2 - startX);
      const finalX = firstNavItemRef.current.getBoundingClientRect().left;
      console.log(
        finalX,
        faceRef.current.getBoundingClientRect().left,
        faceRef.current.getBoundingClientRect().left < -finalX,
        faceRef.current.getBoundingClientRect().left -
          faceRef.current.getBoundingClientRect().width +
          finalX -
          148 +
          40,
        faceRef.current.getBoundingClientRect().left -
          faceRef.current.getBoundingClientRect().width +
          finalX +
          148 -
          40
      );
      tl.to(faceRef.current, {
        scale: 0.4,
        ease: "none",
        // x: -(elementWidth / 2), // Move it to the center

        x:
          faceRef.current.getBoundingClientRect().left < finalX
            ? faceRef.current.getBoundingClientRect().left -
              faceRef.current.getBoundingClientRect().width +
              finalX -
              148 +
              40
            : faceRef.current.getBoundingClientRect().left -
              faceRef.current.getBoundingClientRect().width +
              finalX +
              148 -
              40,
        y: 10,
        scrollTrigger: {
          trigger: faceRef.current,
          start: "top 80",
          scrub: 1,
          // end: () => "+=" + sliderRef.current.offsetWidth,
          end: "60px",
          markers: true,
        },
        delay: 0.5,
      });

      gsap.to(panelRef.current, {
        xPercent: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sliderRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + sliderRef.current.offsetWidth,
          // markers: true,
        },
      });
    }, component.current);
    return () => ctx.revert();
  }, [sPosition]); // Re-run the effect when sPosition changes
  const titleRef = useRef();
  const descriptionRef = useRef();

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
      }, component.current);
      return () => ctx.revert();
    }
  });

  return (
    <>
      <Face faceRef={faceRef} position={sPosition} />
      <div className={c.bottomNav}>
        <div className={c.dot} ref={firstNavItemRef}></div>
        <div className={c.dot}></div>
        <div className={c.dot}></div>
        <div className={c.dot}></div>
      </div>
      <div ref={component}>
        <div ref={sliderRef} className={c.container}>
          <div ref={panelRef}>
            <div className={c.contentContainer}>
              <div className={c.landing}>
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
                    <div ref={sLetterRef} className={c.sLetter}>
                      S
                    </div>
                    <div className={c.cover}>NG</div>
                  </div>
                </div>
              </div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
        <div className={c.lastContainer}>Last Container</div>
      </div>
    </>
  );
};

export default Home;
