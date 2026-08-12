import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function GalleryLightbox({
  selectedImage,
  onClose,
  onPrevious,
  onNext,
}) {
  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, onClose, onPrevious, onNext]);

  if (!selectedImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-5 top-5 z-50 rounded-full border border-white/20 bg-black/40 p-3 text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black"
      >
        <X size={24} />
      </button>

      {/* Previous Button */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black md:left-8"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black md:right-8"
      >
        <ChevronRight size={28} />
      </button>

      {/* Image Content */}
      <div
        className="relative flex max-h-[90vh] max-w-6xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={selectedImage.image}
          alt={selectedImage.title}
          className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
        />

        <div className="mt-6 text-center">
          <span className="text-xs uppercase tracking-[0.3rem] text-amber-400">
            {selectedImage.category}
          </span>

          <h3 className="mt-2 text-2xl font-medium text-white md:text-3xl">
            {selectedImage.title}
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            {selectedImage.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GalleryLightbox;