const categories = [
  "All",
  "Dining",
  "Cuisine",
  "Experience",
  "Behind the Scenes",
];

function GalleryFilters({ activeCategory, onCategoryChange }) {
  return (
    <div className="mb-16 flex flex-wrap justify-center gap-3">

      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`
              rounded-full
              border
              px-6
              py-3
              text-sm
              font-medium
              transition-all
              duration-300
              ${
                active
                  ? "border-amber-400 bg-amber-400 text-black"
                  : "border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:border-amber-400 hover:text-amber-400"
              }
            `}
          >
            {category}
          </button>
        );
      })}

    </div>
  );
}

export default GalleryFilters;