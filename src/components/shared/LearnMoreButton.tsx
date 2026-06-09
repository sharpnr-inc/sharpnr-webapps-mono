import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface LearnMoreButtonProps {
  websiteLink?: string;
}
export function LearnMoreButton({}: LearnMoreButtonProps) {
  useGSAP(() => {
    gsap.to(buttonContainer.current, {});
  });

  
  const buttonContainer = useRef(null);
  const buttonRef = useRef(null);
  return (
    <div ref={buttonContainer}>
      <button ref={buttonRef}>Learn More</button>
    </div>
  );
}
