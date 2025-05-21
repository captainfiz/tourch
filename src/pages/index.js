import React, { useRef, useEffect } from "react";

export default function App() {
  const imgRef = useRef(null);

  useEffect(() => {
    async function setupAnimation() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Pin the image container during scroll animation
      ScrollTrigger.create({
        trigger: "#image-wrapper",
        start: "top center",
        end: "bottom+=500 center", // adjust as needed
        scrub: true,
        pin: true,
        anticipatePin: 1,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Step 2: rotate to 0 (straight)
      timeline.to(imgRef.current, {
        rotation: 0,
        y: -120, // image scrolls slightly up
        x: -300, // image scrolls slightly left
        duration: 0.25, // 5% of timeline
        ease: "none",
      });
      // Step 3: move right & down + scale down
      timeline.to(imgRef.current, {
        y: 120, // image scrolls slightly up
        x:-100,
        scale: 0.75,
        duration: 0.25,
        ease: "none",
      });

      // Step 4: only rotate left (-24 deg), keep position & scale
      timeline.to(imgRef.current, {
        y: 800, // image scrolls slightly up
        rotation: -20,
        duration: 0.25,
        ease: "none",
      });

      // Step 5: scroll down the image itself (reveal bottom part)
      timeline.to(imgRef.current, {
        y: 500, // scrolls image vertically
        duration: 0.25,
        ease: "none",
      });
    }

    setupAnimation();
  }, []);

  return (
    <div
      id="scroll-container"
      className="h-[400vh] bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 flex flex-col items-center pt-40 overflow-hidden relative"
    >
      <h1 className="text-white text-4xl font-bold mb-20">
        Scroll to Animate Image (5 Stages)
      </h1>

      <img
        ref={imgRef}
        src="./image.png"
        alt="Animated"
        className="relative max-w-[700px] w-full  
             -translate-x-[40vw] rotate-[24deg] scale-[1.1]"
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
