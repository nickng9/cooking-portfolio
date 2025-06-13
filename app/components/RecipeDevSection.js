import { motion } from "framer-motion";

export default function RecipeDevSection() {
  const recipes = [
    {
      title: "Garlic Cheesy Bread Bun",
      description:
        "Fluffy buns stuffed with a blend of melted cheeses, roasted garlic, and fresh herbs—perfect for sharing with friends over a cozy evening chat.",
    },
    {
      title: "Scallop Risotto",
      description:
        "Creamy risotto slow-cooked with white wine and Parmesan, topped with seared scallops for an elegant seafood twist that brings loved ones together.",
    },
    {
      title: "Levain-Style Chocolate Chip Cookie Dupe",
      description:
        "A home-tested replica of the famous bakery cookie: thick, gooey centers with crisp edges, underpinned by a perfect balance of brown sugar and chocolate chunks.",
    },
    {
      title: "Iterating on Bon Appétit’s Chocolate Chip Cookie",
      description:
        "Building off BA’s classic recipe by tweaking butter ratios and chill times, resulting in deeper caramel notes and an unbeatable texture.",
    },
  ];
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="my-12"
      aria-labelledby="recipe-heading"
    >
      <h3 id="recipe-heading" className="text-2xl font-semibold mb-4">
        Recipe Developments
      </h3>
      <ul className="space-y-4">
        {recipes.map((r, i) => (
          <li
            key={i}
            className="bg-white p-4 shadow rounded hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            tabIndex={0}
          >
            <h4 className="text-xl font-bold">{r.title}</h4>
            <p>{r.description}</p>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
