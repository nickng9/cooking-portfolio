import Hero from "./components/Hero";
import StageCallout from "./components/StageCallout";
import GallerySection from "./components/GallerySection";
import RecipeDevSection from "./components/RecipeDevSection";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <StageCallout />
      <GallerySection />
      <RecipeDevSection />
      <About />
      <Contact />
    </>
  );
}
