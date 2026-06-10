import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="w-full py-4 lg sm:px-6 lg:px-8 lg:mx-12"
    ></section>
  );
}
