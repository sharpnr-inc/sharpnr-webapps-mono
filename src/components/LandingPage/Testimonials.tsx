import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "This CRM x ERP has transformed our business. We are more efficient and profitable than ever before.",
    name: "John Doe",
    title: "CEO, Example Inc.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    quote:
      "The best all-in-one solution on the market. The support team is also fantastic!",
    name: "Jane Smith",
    title: "COO, Another Co.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",

  },
  {
    quote:
      "I was hesitant to switch, but I'm so glad I did. It's intuitive, powerful, and has everything we need.",
    name: "Sam Wilson",
    title: "Founder, Startup LLC",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Trusted by businesses worldwide
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Hear what our customers have to say about us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
            key={testimonial.name}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 dark:text-white font-bold">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {testimonial.title}
                </p>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
