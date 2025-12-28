import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function Header(): React.JSX.Element {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <h1 className="text-slate-50 text-xl font-bold dark:text-white">
            Sharpnr
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-50 hover:text-cyan-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-slate-50 hover:text-cyan-400 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-slate-50 hover:text-cyan-400 transition-colors"
            >
              Testimonials
            </button>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">Login</Button>
            <Button className="bg-indigo-950 hover:bg-cyan-500 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile */}
          <button className="md:hidden text-gray-900 dark:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
