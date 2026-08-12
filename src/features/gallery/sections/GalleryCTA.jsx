import { NavLink } from "react-router-dom";

function GalleryCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-32">

      <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950 to-black"></div>

      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="container relative z-10 text-center">

        <span className="uppercase tracking-[0.4rem] text-amber-400">
          Experience It Yourself
        </span>

        <h2 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold text-white md:text-6xl">
          Some Moments Are Better Experienced In Person
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Join us at Ember & Oak for exceptional food, warm hospitality and an
          evening worth remembering.
        </p>

        <NavLink
          to="/reservations"
          className="mt-10 inline-flex rounded-xl bg-amber-500 px-9 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_15px_40px_rgba(200,164,93,0.3)]"
        >
          Reserve a Table →
        </NavLink>

      </div>
    </section>
  );
}

export default GalleryCTA;