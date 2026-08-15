import heroImage from "../../../assets/images/interiors/interior-1.jpg";

function AboutHero() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-black">
      {/* Background */}
      <img
        src={heroImage}
        alt="Elegant Ember & Oak dining interior"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent"></div>

      {/* Content */}
      <div className="container relative z-10 py-32">
        <div className="max-w-4xl">
          <span className="uppercase tracking-[0.4rem] text-amber-400">
            Our Story
          </span>

          <h1 className="mt-6 text-6xl font-semibold leading-[1.05] text-white md:text-7xl lg:text-8xl">
            Built From
            <br />
            <span className="text-amber-400">Fire &amp; Passion</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-zinc-300 md:text-xl">
            Before Ember &amp; Oak became a destination for exceptional dining,
            it began with a simple love for cooking and a determination to
            build something meaningful from the ground up.
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
    </section>
  );
}

export default AboutHero;