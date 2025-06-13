import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center my-12"
      aria-labelledby="hero-heading"
    >
      <h2 id="hero-heading" className="text-4xl font-extrabold mb-4">
        Welcome! I’m [Your Name], a home cook sharing flavors and stories.
      </h2>
      <p className="text-lg max-w-2xl mx-auto">
        From experimenting with new recipes to perfecting old favorites, I cook
        to bring people together. Here you’ll find dishes I’ve crafted, recipes
        I’m tweaking, and the moments that inspired them.
      </p>
    </motion.section>
  );
}
