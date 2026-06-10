import { useNavigate } from "@tanstack/react-router";

const NAV_LINKS = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com" },
];

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="z-50 w-full">
      <div className="mx-auto max-w-7xl h-14 grid grid-cols-2 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 justify-self-start">
          <img src="/layer1.png" alt="Sharpnr" className="h-8 w-7 rounded-md" />
          <span className="font-bold font-serif text-lg sm:text-2xl tracking-tight text-slate-50">
            Sharpnr
          </span>
        </a>

        {/* Centered Nav */}
        <nav className="hidden lg:flex items-center justify-center relative">
          {NAV_LINKS.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-lg"
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => navigate({ to: link.to! })}
                className="px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-lg"
              >
                {link.label}
              </button>
            ),
          )}
        </nav>

        {/* Right spacer */}
        <div />
      </div>
    </header>
  );
}
