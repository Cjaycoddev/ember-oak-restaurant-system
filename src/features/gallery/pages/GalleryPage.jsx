import { useEffect, useState } from "react";

import GalleryHero from "../sections/GalleryHero";
import GalleryFilters from "../sections/GalleryFilters";
import GalleryGrid from "../sections/GalleryGrid";
import GalleryCTA from "../sections/GalleryCTA";
import GalleryLightbox from "../components/GalleryLightbox";

import galleryImages from "../data/galleryData";

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (image) => image.category === activeCategory
        );

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const showPrevious = () => {
    if (!selectedImage) {
      return;
    }

    const currentIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );

    const previousIndex =
      currentIndex === 0
        ? filteredImages.length - 1
        : currentIndex - 1;

    setSelectedImage(filteredImages[previousIndex]);
  };

  const showNext = () => {
    if (!selectedImage) {
      return;
    }

    const currentIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );

    const nextIndex =
      currentIndex === filteredImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(filteredImages[nextIndex]);
  };

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    const imageId = hash.replace("#", "");

    const image = galleryImages.find(
      (item) => item.id === imageId
    );

    if (!image) {
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(image.id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 400);
  }, []);

  return (
    <>
      <GalleryHero />

      <section className="bg-[#0b0b0b] py-28">
        <div className="container">

          <GalleryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <GalleryGrid
            images={filteredImages}
            onImageClick={openImage}
          />

        </div>
      </section>

      <GalleryCTA />

      <GalleryLightbox
        images={filteredImages}
        selectedImage={selectedImage}
        onClose={closeImage}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </>
  );
}

export default GalleryPage;