import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import c from "./home.module.scss";
import Face from "./Face";
import SplitType from "split-type";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const component = useRef();
  const sliderRef = useRef();
  const faceRef = useRef();
  const panelRef = useRef();
  const nameRef = useRef();
  const firstNavItemRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [updatedX, setUpdatedX] = useState();

  const updateFacePosition = () => {
    if (nameRef.current && faceRef.current) {
      let toPositionX =
        nameRef.current.getBoundingClientRect().left +
        nameRef.current.getBoundingClientRect().width * 0.6;
      setUpdatedX(toPositionX);
      let toPositionY =
        nameRef.current.getBoundingClientRect().top +
        nameRef.current.getBoundingClientRect().height / 2 -
        80;

      gsap.to(faceRef.current, {
        duration: 2,
        left: toPositionX,
        top: toPositionY,
        rotation: 360,
        ease: "power4.out",
        delay: 0.5,
        onComplete: () => {
          const rect = faceRef.current.getBoundingClientRect();
          console.log(rect.left);
          setUpdatedX(rect.left);
        },
      });
    }
  };
  // // UseEffect to react to changes in updatedX
  // useEffect(() => {
  //   if (updatedX) {
  //     // Perform actions that depend on updatedX here
  //     console.log("Updated X position:", updatedX);
  //   }
  // }, [updatedX]); // This will run whenever updatedX changes
  // useLayoutEffect(() => {
  //   let ctx = gsap.context(() => {
  //     const tl = gsap.timeline();

  //     updateFacePosition(); // Initial position update

  //     console.log(window.innerWidth / 2, updatedX);
  //     tl.to(faceRef.current, {
  //       scale: 40 / faceRef.current.getBoundingClientRect().height,
  //       x: window.innerWidth / 2 - updatedX, // Use the ref here
  //       y: 55,
  //       scrollTrigger: {
  //         trigger: faceRef.current,
  //         start: "top 80",
  //         scrub: 1,
  //         end: "60px",
  //         markers: true,
  //       },
  //       delay: 0.5,
  //     });

  //     gsap.to(panelRef.current, {
  //       xPercent: -200,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: sliderRef.current,
  //         pin: true,
  //         scrub: 1,
  //         end: () => "+=" + sliderRef.current.offsetWidth,
  //       },
  //     });
  //   }, component.current);

  //   // Update face position on resize
  //   window.addEventListener("resize", updateFacePosition);

  //   return () => {
  //     ctx.revert();
  //     window.removeEventListener("resize", updateFacePosition);
  //   };
  // }, []); // Empty dependency array to run only on mount

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
        const tl = gsap.timeline();

        console.log(window.innerWidth / 2, updatedX);
        tl.to(faceRef.current, {
          scale: 40 / faceRef.current.getBoundingClientRect().height,
          x: window.innerWidth / 2 - updatedX, // Use the updatedX value
          y: 55,
          scrollTrigger: {
            trigger: faceRef.current,
            start: "top 80",
            scrub: 1,
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
                    <div className={c.sLetter}>S</div>
                    <div className={c.cover}>NG</div>
                  </div>
                </div>
              </div>
              <div className={c.placeholder}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>
        </div>
        <div className={c.lastContainer}>Last Container</div>
      </div>
    </>
  );
};

export default Home;
