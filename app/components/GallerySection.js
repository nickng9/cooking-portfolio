import { motion } from "framer-motion";

export default function GallerySection() {
  const dishes = [
    { src: "/images/dish1.jpg", caption: "Signature sourdough loaf" },
    {
      src: "/images/dish2.jpg",
      caption: "Bright lemon tart with whipped cream",
    },
    {
      src: "/images/dish3.jpg",
      caption: "Hearty homemade chili at golden hour",
    },
  ];
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="my-12"
      aria-labelledby="gallery-heading"
    >
      <h3 id="gallery-heading" className="text-2xl font-semibold mb-4">
        Gallery
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((d, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white shadow rounded overflow-hidden"
            role="figure"
            tabIndex={0}
            aria-label={d.caption}
          >
            <img
              src={d.src}
              alt={d.caption}
              className="w-full h-48 object-cover"
            />
            <p className="p-2 text-center">{d.caption}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
