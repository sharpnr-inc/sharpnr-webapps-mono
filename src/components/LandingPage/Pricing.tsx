import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    features: [
      "Basic CRM features",
      "Up to 5 users",
      "1GB storage",
      "Email support",
    ],
    cta: "Choose Plan",
  },
  {
    name: "Business",
    price: "$99",
    period: "/month",
    features: [
      "Advanced CRM & ERP features",
      "Up to 20 users",
      "10GB storage",
      "Priority email support",
    ],
    cta: "Choose Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "All features included",
      "Unlimited users",
      "Dedicated infrastructure",
      "24/7 support",
    ],
    cta: "Contact Us",
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function Pricing() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Find the perfect plan for your business
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Simple, transparent pricing. No hidden fees.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              className={`rounded-lg shadow-lg p-8 flex flex-col ${
                plan.popular ? "border-2 border-cyan-400" : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-cyan-400 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
                {plan.name}
              </h3>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-gray-500 dark:text-gray-400">
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-400 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
