import "./App.css";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center mx-auto px-4 py-5 max-w-7xl">
          <h1 className="font-bold text-blue-600 text-2xl">Sharpnr</h1>
          <nav className="space-x-6">
            <a href="#features" className="font-medium hover:text-blue-600">Features</a>
            <a href="#pricing" className="font-medium hover:text-blue-600">Pricing</a>
            <a href="#contact" className="font-medium hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 text-center">
        <div className="mx-auto px-4 max-w-3xl">
          <h2 className="mb-6 font-bold text-4xl sm:text-5xl">
            Modern Hotel Management Made Simple
          </h2>
          <p className="mb-8 text-gray-700 text-lg">
            Sharpnr helps you manage bookings, staff, billing, and guest experience — all in one place.
          </p>
          <a href="#contact" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold text-white transition">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="gap-10 grid grid-cols-1 md:grid-cols-3 mx-auto px-4 max-w-6xl">
          {[
            { title: "Smart Booking", desc: "Real-time reservations with calendar sync." },
            { title: "Staff Management", desc: "Assign roles and track performance easily." },
            { title: "Billing & Reports", desc: "Track payments, invoices, and performance." }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-100 shadow hover:shadow-md p-6 rounded-xl transition">
              <h3 className="mb-3 font-semibold text-blue-600 text-xl">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-blue-50 py-16 text-center">
        <h2 className="mb-6 font-bold text-3xl">Simple Pricing</h2>
        <p className="mb-10 text-gray-600">No hidden fees. Upgrade anytime.</p>
        <div className="flex md:flex-row flex-col justify-center gap-8">
          {[
            { plan: "Starter", price: "$29/mo", features: ["Basic Booking", "Email Support"] },
            { plan: "Pro", price: "$59/mo", features: ["All Starter features", "Advanced Reports", "Priority Support"] }
          ].map((p, idx) => (
            <div key={idx} className="bg-white hover:shadow-lg p-8 border border-blue-200 rounded-xl w-72 transition">
              <h3 className="mb-2 font-bold text-blue-600 text-xl">{p.plan}</h3>
              <p className="mb-4 font-bold text-2xl">{p.price}</p>
              <ul className="space-y-2 mb-6 text-gray-700 text-left">
                {p.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <a href="#contact" className="block bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold text-white transition">
                Choose Plan
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16 text-center">
        <h2 className="mb-6 font-bold text-3xl">Ready to simplify hotel operations?</h2>
        <p className="mb-8 text-gray-600">Get in touch or schedule a demo today.</p>
        <a href="mailto:contact@sharpnr.com" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold text-white transition">
          Contact Us
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-gray-600 text-sm text-center">
        © {new Date().getFullYear()} Sharpnr. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
