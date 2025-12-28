import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Sharpnr
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("features")} className="text-gray-600 dark:text-gray-300 hover:text-cyan-400 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("pricing")} className="text-gray-600 dark:text-gray-300 hover:text-cyan-400 transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-gray-600 dark:text-gray-300 hover:text-cyan-400 transition-colors">
              Testimonials
            </button>
          </nav>
          <div className="hidden md:flex items-center">
            <Button variant="outline" className="mr-4">Login</Button>
            <Button className="bg-cyan-400 hover:bg-cyan-500 text-white">
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="text-gray-800 dark:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;