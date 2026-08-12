import { NavLink } from "react-router-dom";

import galleryImages from "../../gallery/data/galleryData";

function GalleryPreview() {
  const previewImages = galleryImages.slice(0, 6);

  return (
    <section className="bg-[#0b0b0b] py-36">
      <div className="container">

        {/* Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Gallery
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            Moments at Ember & Oak
          </h2>

          <p className="mx-auto mt-7 text-lg leading-8 text-zinc-400">
            Elegant interiors, handcrafted cuisine and unforgettable moments
            captured inside our signature dining experience.
          </p>
        </div>

        {/* Desktop Editorial Layout */}
        <div className="hidden auto-rows-[220px] grid-cols-3 gap-6 md:grid">

          {/* Image 1 — Large */}
          <NavLink
            to="/gallery#gallery-1"
            className="group relative col-span-2 row-span-2 overflow-hidden rounded-3xl"
          >
            <img
              src={previewImages[0].image}
              alt={previewImages[0].title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/45">
              <span className="rounded-full border border-amber-400 bg-black/70 px-6 py-3 text-sm font-semibold text-amber-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
                View Photo
              </span>
            </div>
          </NavLink>

          {/* Image 2 */}
          <NavLink
            to="/gallery#gallery-2"
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src={previewImages[1].image}
              alt={previewImages[1].title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/45" />
          </NavLink>

          {/* Image 3 */}
          <NavLink
            to="/gallery#gallery-3"
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src={previewImages[2].image}
              alt={previewImages[2].title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/45" />
          </NavLink>

          {/* Image 4 */}
          <NavLink
            to="/gallery#gallery-4"
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src={previewImages[3].image}
              alt={previewImages[3].title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/45" />
          </NavLink>

          {/* Image 5 — Large */}
          <NavLink
            to="/gallery#gallery-5"
            className="group relative col-span-2 row-span-2 overflow-hidden rounded-3xl"
          >
            <img
              src={previewImages[4].image}
              alt={previewImages[4].title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/45">
              <span className="rounded-full border border-amber-400 bg-black/70 px-6 py-3 text-sm font-semibold text-amber-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
                View Photo
              </span>
            </div>
          </NavLink>

          {/* Image 6 */}
          <NavLink
            to="/gallery#gallery-6"
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src={previewImages[5].image}
              alt={previewImages[5].title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/45" />
          </NavLink>

        </div>

        {/* Mobile */}
        <div className="grid gap-5 md:hidden">
          {previewImages.map((item) => (
            <NavLink
              key={item.id}
              to={`/gallery#${item.id}`}
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/45">
                <span className="rounded-full border border-amber-400 bg-black/70 px-6 py-3 text-sm font-semibold text-amber-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  View Photo
                </span>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Full Gallery Button */}
        <div className="mt-16 text-center">
          <NavLink
            to="/gallery"
            className="inline-block rounded-xl border border-amber-400 px-8 py-4 font-semibold text-amber-400 transition-all duration-300 hover:scale-105 hover:bg-amber-400 hover:text-black hover:shadow-[0_15px_40px_rgba(200,164,93,0.3)]"
          >
            View Full Gallery →
          </NavLink>
        </div>

      </div>
    </section>
  );
}

export default GalleryPreview;