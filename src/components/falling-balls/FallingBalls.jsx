import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import c from "./falling-balls.module.scss";

const FallingBalls = ({
  numberOfCircles = 20,
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  minCircleSize = 30,
  maxCircleSize = 30,
  circleColors = "#ff7ec4",
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Get container dimensions and update on resize
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    };

    // Initial measurement
    updateDimensions();

    // Update on resize
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Set up intersection observer to detect when component is in view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once in view, we can disconnect the observer
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize the physics engine when component comes into view
  useEffect(() => {
    if (
      !isInView ||
      !canvasRef.current ||
      dimensions.width <= 0 ||
      dimensions.height <= 0
    )
      return;

    // Import Matter.js modules
    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = gravity;
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        width: dimensions.width,
        height: dimensions.height,
        background: backgroundColor,
        wireframes: wireframes,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const ground = Bodies.rectangle(
      dimensions.width / 2,
      dimensions.height + 30,
      dimensions.width,
      60,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    const leftWall = Bodies.rectangle(
      -30,
      dimensions.height / 2,
      60,
      dimensions.height,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    const rightWall = Bodies.rectangle(
      dimensions.width + 30,
      dimensions.height / 2,
      60,
      dimensions.height,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Create circles
    const circles = [];
    for (let i = 0; i < numberOfCircles; i++) {
      const radius = maxCircleSize;
      const x = Math.random() * dimensions.width;
      const y = -radius * 2 - Math.random() * 500; // Start above the screen

      const color = circleColors;

      const circle = Bodies.circle(x, y, radius, {
        restitution: 0.8,
        friction: 0.1,
        render: {
          fillStyle: color,
        },
      });

      circles.push(circle);
    }

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });

    // Fix scrolling issue
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Add all bodies to the world
    World.add(engine.world, [
      ground,
      leftWall,
      rightWall,
      ...circles,
      mouseConstraint,
    ]);

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);
    runnerRef.current = runner;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !render.canvas) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Update renderer dimensions
      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;

      // Reposition walls
      Matter.Body.setPosition(ground, {
        x: width / 2,
        y: height + 30,
      });

      Matter.Body.setPosition(leftWall, {
        x: -30,
        y: height / 2,
      });

      Matter.Body.setPosition(rightWall, {
        x: width + 30,
        y: height / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);

      // Stop the engine and renderer
      Render.stop(render);
      Runner.stop(runner);

      if (render.canvas) {
        render.canvas.remove();
      }

      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [
    isInView,
    dimensions,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    numberOfCircles,
    minCircleSize,
    maxCircleSize,
    circleColors,
  ]);

  return (
    <div
      ref={containerRef}
      className={c.fallingBallsContainer}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={canvasRef}
        className={c.fallingBallsCanvas}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none", // This won't affect the intersection observer
        }}
      />
    </div>
  );
};

export default FallingBalls;
