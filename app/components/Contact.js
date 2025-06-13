import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      className="my-12 text-center"
      role="form"
      aria-labelledby="contact-heading"
    >
      <h3 id="contact-heading" className="text-2xl font-semibold mb-4">
        Get In Touch
      </h3>
      <p className="mb-4">
        Fancy a chat about food, collaboration, or staging opportunities? Drop
        me a line at{" "}
        <a
          href="mailto:youremail@example.com"
          className="underline hover:text-blue-600 focus:ring-1 focus:outline-none"
        >
          youremail@example.com
        </a>
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-blue-600 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        Say Hello!
      </motion.button>
    </section>
  );
}
