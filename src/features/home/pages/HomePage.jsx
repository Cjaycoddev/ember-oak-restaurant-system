import Hero from "../sections/Hero";
import Experience from "../sections/Experience";
import FeaturedDishes from "../sections/FeaturedDishes";
import Story from "../sections/Story";
import ChefSpecials from "../sections/ChefSpecials";
import GalleryPreview from "../sections/GalleryPreview";
import ReservationCTA from "../sections/ReservationCTA";
import Testimonials from "../sections/Testimonials";

function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <FeaturedDishes />
      <Story />
      <ChefSpecials />
      <GalleryPreview />
      <Testimonials />
      <ReservationCTA />
    </>
  );
}

export default HomePage;