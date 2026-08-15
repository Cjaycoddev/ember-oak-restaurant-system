import { NavLink } from "react-router-dom";

function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-36">

      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black"></div>

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

      {/* Decorative rings */}
      <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-amber-400/10"></div>

      <div className="absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-amber-400/10"></div>

      {/* Content */}
      <div className="container relative z-10 text-center">

        <span className="uppercase tracking-[0.4rem] text-amber-400">
          The Story Continues
        </span>

        <h2 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-6xl">
          Come Be Part Of
          <br />
          The Experience
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-zinc-300">
          From the fire in the kitchen to the final course at your table,
          Ember &amp; Oak exists to make ordinary evenings feel worth
          remembering.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <NavLink
            to="/reservations"
            className="rounded-xl bg-amber-500 px-9 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_15px_40px_rgba(200,164,93,0.35)]"
          >
            Reserve A Table
          </NavLink>

          <NavLink
            to="/gallery"
            className="rounded-xl border border-zinc-700 px-9 py-4 font-semibold text-zinc-300 transition-all duration-300 hover:border-amber-400 hover:text-amber-400"
          >
            Explore The Gallery →
          </NavLink>

        </div>
      </div>
    </section>
  );
}

export default AboutCTA;