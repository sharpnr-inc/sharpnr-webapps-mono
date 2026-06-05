// this is sharpnr platform Introduction section, this is going to be a timeline animation
// this is what we are we gonna do, :-->
// so this gonna be a scrolltriggered animation on first this gonna be a video kinda a scene.

import { useGSAP, gsap, SplitText } from "@/animations/gsap";
import PhysicsBox from "@/components/shared/PhysicsBox";
import { useRef } from "react";

const SharpnrPlatformIntro = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  // gsap hooks so all the animation will be used here
  useGSAP(
    () => {
      // the timeline for the generating animation.
      const timeline = gsap.timeline({
        repeat: 1,
      });

      const splitText = SplitText.create(boxRef2.current, {
        type: "words, chars lines",
      });

      // animation of Box 1
      timeline.fromTo(
        boxRef.current,
        {
          opacity: 0,
          padding: 0,
        },
        {
          opacity: 1,
          padding: 10,
          margin: 20,
          ease: "circ.inOut",
          skewX: "17",
          skewY: 12,
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            markers: true,
            toggleActions: "play none none reverse",
          },
        },
      );

      // animation for the box2 which is text
      // Use splitText.chars
      // chars — nuclear fission
      timeline.fromTo(
        splitText.chars,
        {
          autoAlpha: 0,
          scale: 0,
          x: () => gsap.utils.random(-500, 500),
          y: () => gsap.utils.random(-300, 300),
          rotation: () => gsap.utils.random(-720, 720),
          filter: "blur(20px)",
          color: "#ff4400",
          transformOrigin: "center center",
        },
        {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          filter: "blur(0px)",
          color: "#ffffff",
          ease: "expo.out",
          duration: 2,
          stagger: { each: 0.02, from: "random" },
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        },
      );

      // words — gravity drop
      timeline.fromTo(
        splitText.words,
        {
          autoAlpha: 0,
          y: -200,
          rotationX: 120,
          scale: 0.6,
          z: -600,
          transformOrigin: "50% 0%",
          transformPerspective: 1000,
        },
        {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          z: 0,
          ease: "bounce.out",
          duration: 1.8,
          stagger: { each: 0.12, from: "start" },
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
      // lines — vault door
      timeline.fromTo(
        splitText.lines,
        {
          autoAlpha: 0,
          x: (i) => (i % 2 === 0 ? -800 : 800),
          skewX: (i) => (i % 2 === 0 ? -20 : 20),
          scale: 0.8,
          filter: "blur(10px)",
          transformOrigin: "50% 50%",
        },
        {
          autoAlpha: 1,
          x: 0,
          skewX: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "power4.out",
          duration: 1.4,
          stagger: { each: 0.18, from: "start" },
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top 65%",
            end: "top 20%",
            scrub: 1,
          },
        },
      );

      timeline.fromTo(
        box3Ref.current,
        {
          y: -400,
          scale: 1,
          scaleX: 1,
          scaleY: 1,
        },
        {
          scrollTrigger: {
            trigger: box3Ref.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
          keyframes: [
            // drop to floor — hit 1
            {
              y: 0,
              scaleY: 0.6,
              scaleX: 1.5,
              ease: "power2.in",
              duration: 0.5,
            },
            // bounce 1
            {
              y: -180,
              scaleY: 1,
              scaleX: 1,
              ease: "power1.out",
              duration: 0.35,
            },
            // hit 2 — getting smaller
            {
              y: 0,
              scaleY: 0.7,
              scaleX: 1.35,
              ease: "power2.in",
              duration: 0.28,
            },
            // bounce 2
            {
              y: -80,
              scaleY: 0.9,
              scaleX: 0.9,
              ease: "power1.out",
              duration: 0.25,
            },
            // hit 3 — even smaller
            {
              y: 0,
              scaleY: 0.75,
              scaleX: 1.2,
              ease: "power2.in",
              duration: 0.2,
            },
            // bounce 3 — tiny hop
            {
              y: -25,
              scaleY: 0.85,
              scaleX: 0.85,
              ease: "power1.out",
              duration: 0.18,
            },
            // settle
            {
              y: 0,
              scaleY: 1,
              scaleX: 1,
              ease: "power2.inOut",
              duration: 0.15,
            },
          ],
        },
      );
    },
    { scope: mainContainerRef },
  );

  return (
    // this is the main container which contains all the animation and all the elements.
    <section ref={mainContainerRef} className="min-h-screen border">
      <div ref={boxRef} className=" w-50 h-50 border">
        this the section{" "}
      </div>

      <div
        ref={boxRef2}
        className="w-full text-4xl font-bold text-white leading-tight"
      >
        We are building the future of intelligent platforms. Every pixel. Every
        interaction. Every moment.
      </div>

      <PhysicsBox />
    </section>
  );
};

export default SharpnrPlatformIntro;
