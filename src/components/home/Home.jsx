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
  const panelRef = useRef();
  const nameRef = useRef();
  const aboutRef = useRef();
  const faceRef = useRef();
  const letterRef = useRef();
  const [updatedX, setUpdatedX] = useState();

  // Intro text animation
  useEffect(() => {
    if (nameRef.current) {
      const splitTextDisplay = new SplitType(nameRef.current, {
        types: "words, chars",
      });

      let ctx = gsap.context(() => {
        gsap.from(splitTextDisplay.chars, {
          yPercent: 130,
          stagger: 0.02,
          delay: 2,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }, component);
      return () => ctx.revert();
    }
  }, []);

  // For horizontal scroll
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(panelRef.current, {
        xPercent: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sliderRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + panelRef.current.offsetWidth,
          // markers: true,
        },
      });
    }, component.current);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animation face on load
  useEffect(() => {
    const updateFacePosition = () => {
      if (letterRef.current) {
        // Get bounding rect
        const rect = letterRef.current.getBoundingClientRect();
        // setUpdatedX(rect.left);
        gsap.to(faceRef.current, {
          duration: 2,
          left: rect.left + 10,
          top: rect.top - 10,
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

    // Initial position update
    updateFacePosition();

    // ResizeObserver to track element size changes
    const observer = new ResizeObserver(() => {
      updateFacePosition();
    });

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    // Window resize event listener
    const handleResize = () => {
      updateFacePosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (letterRef.current) {
        observer.unobserve(letterRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (updatedX) {
      let ctx = gsap.context(() => {
        const faceTl = gsap.timeline();

        faceTl.to(faceRef.current, {
          scale: 100,
          opacity: 1,
          rotation: 720,
          zIndex: 1,
          scrollTrigger: {
            trigger: faceRef.current,
            start: `left ${faceRef.current.getBoundingClientRect().top}px`,
            scrub: 1,
            ease: "none",
            end: () => "+=" + "200px",
            markers: true,
            onEnterBack: () => {
              gsap.to(faceRef.current, {
                opacity: 1,
                duration: 0,
                zIndex: 1,
                delay: 0,
              });
              gsap.to(sliderRef.current, {
                backgroundColor: "#1e1e1e",
                duration: 0,
              });
              gsap.to(nameRef.current, {
                opacity: 1,
                duration: 0,
              });
            },
          },
          onComplete: () => {
            gsap.to(faceRef.current, {
              opacity: 0,
              duration: 0,
              zIndex: -1,
              delay: 0,
            });
            gsap.to(sliderRef.current, {
              backgroundColor: "#FF7EC4",
              duration: 0,
            });
            gsap.to(nameRef.current, {
              opacity: 0,
              duration: 0,
            });
          },
        });
      });

      return () => {
        ctx.revert();
      };
    }
  }, [updatedX]);

  return (
    <>
      <Face faceRef={faceRef} />
      <div ref={component}>
        <div ref={sliderRef}>
          <div ref={panelRef} className={c.panelContainer}>
            <div className={c.introContainer}>
              <div className={c.bottom}>
                <div className={c.name} ref={nameRef}>
                  <div>PING</div>
                  <div className={c.lastName}>
                    S<div className={c.facePlaceholder}></div>
                    NG
                  </div>
                </div>

                <div className={`${c.hidden} ${c.name}`}>
                  <div>PING</div>
                  <div className={c.lastName}>
                    S
                    <div className={c.facePlaceholder} ref={letterRef}>
                      ?
                    </div>
                    NG
                  </div>
                </div>
              </div>
            </div>
            <div className={c.workContainer}>
              <Work />
            </div>
          </div>
        </div>
        <div ref={aboutRef} className={c.aboutContainer}></div>
      </div>
    </>
  );
};

export default Home;
