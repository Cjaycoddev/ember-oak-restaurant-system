function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {images.map((item, index) => {
        const featured = index === 0 || index === 5;

        return (
          <button
            key={item.id}
            id={item.id}
            type="button"
            onClick={() => onImageClick(item)}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              text-left
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-amber-400
              hover:shadow-[0_20px_50px_rgba(200,164,93,0.18)]
              ${
                featured
                  ? "md:col-span-2 md:row-span-2"
                  : "md:col-span-1 md:row-span-1"
              }
            `}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-all duration-500 group-hover:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <span className="text-xs uppercase tracking-[0.25rem] text-amber-400">
                {item.category}
              </span>

              <h3
                className={
                  featured
                    ? "mt-2 text-3xl font-medium text-white md:text-4xl"
                    : "mt-2 text-xl font-medium text-white md:text-2xl"
                }
              >
                {item.title}
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300 opacity-0 transition-all duration-500 group-hover:opacity-100">
                {item.description}
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                View Image →
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default GalleryGrid;