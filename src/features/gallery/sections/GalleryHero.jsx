function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-black py-32 md:py-40">
      
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black"></div>

      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="container relative z-10">

        <div className="mx-auto max-w-4xl text-center">

          <span className="uppercase tracking-[0.4rem] text-amber-400">
            Gallery
          </span>

          <h1 className="mt-6 text-5xl font-semibold leading-tight text-white md:text-7xl">
            Moments at
            <br />
            Ember & Oak
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Explore the flavours, atmosphere, craftsmanship and unforgettable
            moments that make every evening at Ember & Oak unique.
          </p>

        </div>

      </div>
    </section>
  );
}

export default GalleryHero;