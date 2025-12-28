import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-black">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Ready to take your business to the next level?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Join thousands of satisfied customers and see the difference our CRM x ERP solution can make for your business.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-cyan-400 hover:bg-cyan-500 text-white">
              Get Started for Free
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
