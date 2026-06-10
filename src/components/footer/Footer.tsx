import { Terminal, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const productCategories = [
    {
      title: "Core Platform",
      links: [
        { name: "SharpIAM", href: "#iam" },
        { name: "Orchestrator", href: "#orchestrator" },
        { name: "Marketplace", href: "#marketplace" },
      ],
    },
    {
      title: "Business Ops",
      links: [
        { name: "Sharp-HR", href: "#hr" },
        { name: "Sharp-Accounting", href: "#accounting" },
        { name: "Sharp-Marketing", href: "#marketing" },
      ],
    },
    {
      title: "Productivity",
      links: [
        { name: "Sharp-Folio", href: "#folio" },
        { name: "Sharp-Cable", href: "#cable" },
        { name: "Sharp-Silo", href: "#silo" },
      ],
    },
    {
      title: "Company",
      links: [{ name: "Documentation", href: "https://docs.sharpnr.com" }],
    },
  ];

  return (
    <footer className=" border-t border-slate-900 pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-slate-50 flex items-center justify-center rounded-sm rotate-45">
                <Terminal size={14} className="text-slate-950 -rotate-45" />
              </div>
              <span className="text-xl font-serif text-slate-50">Sharpnr</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-sans">
              One Platform. Every Business. The deeply integrated ecosystem for
              modern organizations.
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="text-slate-500 hover:text-slate-50 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-50 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-50 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {productCategories.map((cat) => (
            <div key={cat.title}>
              <h4 className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">
                {cat.title}
              </h4>
              <ul className="space-y-4">
                {cat.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-slate-50 text-sm font-sans transition-colors block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            All Systems Operational
          </div>
          <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Sharpnr Protocol. All rights reserved.
          </p>
        </div>
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
    </footer>
  );
}
