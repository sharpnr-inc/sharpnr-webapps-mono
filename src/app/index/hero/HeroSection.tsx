import { useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return <section ref={sectionRef}>Landing Page Hero Section</section>;
}
