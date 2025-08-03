import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CRM × ERP Reimagined for Growing Businesses
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            One platform to manage sales, inventory, accounting, and operations — tailored for you.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
            Get Started Free
          </button>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center">
          {[
            {
              title: "Unified Dashboard",
              desc: "Track CRM and ERP data in one intuitive interface with real-time insights."
            },
            {
              title: "Sales & Customer Management",
              desc: "Handle leads, contacts, follow-ups, and deals effortlessly."
            },
            {
              title: "Inventory & Invoicing",
              desc: "Manage stock, billing, and GST-ready invoices with ease."
            }
          ].map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (placeholder) */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">What our customers say</h2>
          <p className="text-gray-600 mb-6">
            Trusted by businesses in hospitality, retail, healthcare, and more.
          </p>
          <div className="text-sm italic text-gray-500">“This CRM × ERP solution transformed how we manage operations.”</div>
          <div className="text-sm font-medium mt-2">— CEO, SharpNR Hotels</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to streamline your business?</h2>
        <p className="mb-6 text-lg">Start free. No credit card required.</p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition">
          Try it Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-gray-300 text-center text-sm">
        © {new Date().getFullYear()} SharpNR Solutions. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
