import { motion } from "framer-motion";

const features = [
  {
    title: "Integrated CRM",
    description: "Manage all your customer relationships in one place. Track leads, opportunities, and communications effortlessly.",
    icon: "🤝",
  },
  {
    title: "Advanced ERP",
    description: "Streamline your business processes, from inventory management to financial accounting, with our powerful ERP tools.",
    icon: "⚙️",
  },
  {
    title: "Analytics & Reporting",
    description: "Gain valuable insights with our advanced analytics and customizable reports. Make data-driven decisions.",
    icon: "📊",
  },
    {
    title: "Project Management",
    description: "Plan, execute, and track your projects with ease. Collaborate with your team and ensure timely delivery.",
    icon: "📝",
  },
  {
    title: "Financial Management",
    description: "Keep your finances in check with our comprehensive financial management tools, from invoicing to expense tracking.",
    icon: "💰",
  },
  {
    title: "Inventory Management",
    description: "Optimize your stock levels and track inventory across multiple locations with our real-time inventory management system.",
    icon: "📦",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function Features() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Everything you need. All in one place.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Our CRM x ERP solution is designed to grow with your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
