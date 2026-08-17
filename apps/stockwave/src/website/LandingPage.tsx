import { useState, type ReactNode } from 'react';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Use cases', href: '#use-cases' },
];

const USE_CASES = ['Retail', 'E-commerce', 'Warehousing', 'Manufacturing', 'Distribution'];

const FEATURES: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: 'Real-time stock tracking',
    description:
      'Every sale, transfer, and restock updates instantly across every location, so the count on screen always matches the shelf.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5v9L12 21l9-4.5v-9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v9" />
      </svg>
    ),
  },
  {
    title: 'Multi-warehouse & locations',
    description:
      'Manage stock across as many warehouses, stores, or bins as you need, and move inventory between them with a full audit trail.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </svg>
    ),
  },
  {
    title: 'Low-stock alerts',
    description:
      'Set reorder points per SKU and get notified before you run out, so you stop losing sales to empty shelves.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: 'Purchase orders & suppliers',
    description:
      'Raise purchase orders, track supplier lead times, and receive stock straight into the right warehouse.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h6a1 1 0 0 1 1 1V6H8v-1.25a1 1 0 0 1 1-1Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v13.25a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h6M9 15h4" />
      </svg>
    ),
  },
  {
    title: 'Barcode & SKU scanning',
    description:
      'Scan items in and out with any barcode scanner or phone camera to keep counts accurate without manual entry.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" d="M4 5v14M8 5v14M11 5v14M13 5v14M17 5v14M20 5v14" />
      </svg>
    ),
  },
  {
    title: 'Reports & analytics',
    description:
      'See stock value, turnover, and demand trends by product or location, so buying decisions are backed by data.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    title: 'Connect your inventory',
    description: 'Import products, SKUs, and warehouses in minutes, or add them by hand as you go.',
  },
  {
    title: 'Track every movement',
    description: 'Sales, transfers, and restocks sync in real time, so every location stays in agreement.',
  },
  {
    title: 'Make smarter decisions',
    description: 'Reorder alerts and reporting keep you ahead of demand instead of reacting to it.',
  },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            StockWave
          </span>
          <span className="hidden rounded-full border border-violet-600/20 bg-violet-600/10 px-2 py-0.5 text-xs font-medium text-violet-700 sm:inline dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            by sharpnr
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            Sign in
          </a>
          <a
            href="/app"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 md:hidden dark:text-neutral-300"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 px-6 py-4 md:hidden dark:border-white/10">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-black/5 dark:border-white/10" />
            <a href="/login" className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Sign in
            </a>
            <a
              href="/app"
              className="rounded-lg bg-violet-600 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Get started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function DashboardPreview() {
  const bars = [45, 70, 55, 85, 60, 95, 75];

  return (
    <div className="relative rounded-2xl border border-black/5 bg-white p-4 shadow-xl shadow-violet-950/5 sm:p-6 dark:border-white/10 dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-400">Total stock value</p>
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">$284,910</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          +12.4%
        </span>
      </div>

      <div className="mt-6 flex h-32 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-linear-to-t from-violet-600 to-sky-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-black/5 pt-4 dark:border-white/10">
        {[
          { name: 'Warehouse — East Wing', qty: '4,208 units', status: 'Healthy' },
          { name: 'Retail Store #3', qty: '96 units', status: 'Low stock' },
          { name: 'Distribution Center', qty: '12,884 units', status: 'Healthy' },
        ].map((row) => (
          <div key={row.name} className="flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-300">{row.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400">{row.qty}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  row.status === 'Low stock'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 -z-10 h-96 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(134,59,255,0.15),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-600/20 bg-violet-600/5 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <span className="size-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
            A sharpnr product
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-neutral-900 sm:text-5xl dark:text-white">
            Inventory management that keeps up with your business
          </h1>

          <p className="mt-6 max-w-lg text-lg text-neutral-600 dark:text-neutral-300">
            StockWave gives growing teams real-time visibility into stock levels, purchase
            orders, and warehouses — so you never oversell or run out again.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/app"
              className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
            >
              Get started free
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
            >
              See how it works →
            </a>
          </div>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section id="use-cases" className="border-y border-black/5 bg-neutral-50 dark:border-white/10 dark:bg-white/2">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Built for teams who manage physical goods
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {USE_CASES.map((useCase) => (
            <span
              key={useCase}
              className="rounded-full border border-black/5 bg-white px-4 py-1.5 text-sm font-medium text-neutral-600 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          Everything you need to run inventory well
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
          One system for stock, purchasing, and reporting across every location you operate.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
            <div className="inline-flex size-11 items-center justify-center rounded-lg bg-violet-600/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
              {feature.icon}
            </div>
            <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-black/5 bg-neutral-50 dark:border-white/10 dark:bg-white/2">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Up and running in three steps
          </h2>
        </div>

        <ol className="mt-16 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="flex size-10 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-violet-600 px-8 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_100%,rgba(71,191,255,0.35),transparent)]"
        />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            Ready to take control of your inventory?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-violet-100">
            Join teams running their stock and warehouses on StockWave, built by sharpnr.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/app"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-violet-700 shadow-sm hover:bg-violet-50"
            >
              Get started free
            </a>
            <a
              href="/login"
              className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2">
              <Logo className="size-7" />
              <span className="text-base font-semibold text-neutral-900 dark:text-white">StockWave</span>
            </a>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Stock and inventory management, built by sharpnr.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li><a href="#features" className="hover:text-neutral-900 dark:hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-neutral-900 dark:hover:text-white">How it works</a></li>
                <li><a href="/login" className="hover:text-neutral-900 dark:hover:text-white">Sign in</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">Company</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li><span>sharpnr</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black/5 pt-6 text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
          © {new Date().getFullYear()} sharpnr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const LandingPage = () => {
  return (
    <div className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <SiteHeader />
      <main>
        <Hero />
        <UseCases />
        <Features />
        <HowItWorks />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
};

export default LandingPage;
