import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Sharpnr's modular approach gave us the flexibility we needed. We started with the basics and added more as we grew. It's been a perfect fit for our hotel.",
    name: "Independent Hotel Owner",
    title: "Hospitality Module User",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    quote:
      "The kitchen orchestration is a lifesaver. Our multi-outlet restaurant runs so much smoother now. No more chaos during peak hours.",
    name: "Restaurant Operator",
    title: "Kitchen Module User",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
  {
    quote:
      "Finally, accounting that makes sense. The event-driven journal entries are transparent and easy to audit. It has saved our finance team countless hours.",
    name: "Finance Manager",
    title: "Accounting Module User",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
];

export function Testimonials() {
  useEffect(() => {
    gsap.fromTo(
      ".testimonial-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Built by engineers who understand operations.
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            No hype. No marketing noise. Just a solid platform that works.
          </p>
        </div>
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="testimonial-card bg-card/80 backdrop-blur-sm rounded-lg shadow-lg p-8"
            >
              <p className="text-muted-foreground text-lg mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <p className="text-foreground font-bold">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

