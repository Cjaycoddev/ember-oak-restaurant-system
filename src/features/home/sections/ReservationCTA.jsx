import { NavLink } from "react-router-dom";

function ReservationCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-36">

      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-zinc-900 to-black"></div>

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-162.5 w-162.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

      {/* Decorative Accents */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-amber-500/10"></div>

      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-amber-500/10"></div>

      <div className="container relative z-10 text-center">

        <span className="uppercase tracking-[0.4rem] text-amber-400">
          Reservations
        </span>

        <h2 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-6xl">
          Reserve Your Table For An
          <br />
          Unforgettable Dining Experience
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-zinc-300">
          Whether you're planning a romantic dinner, family celebration,
          birthday, business meeting or a special occasion, our team is ready
          to create an exceptional dining experience tailored just for you.
        </p>

        <div className="mt-14 flex flex-wrap justify-center gap-6">

          {/* Book a Table */}
          <NavLink
            to="/reservations"
            className="rounded-xl bg-amber-500 px-9 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_15px_40px_rgba(200,164,93,0.35)]"
          >
            Book a Table
          </NavLink>

          {/* Call Us */}
          <NavLink
            to="/contact#contact-phone"
            className="rounded-xl border border-amber-400 px-9 py-4 font-semibold text-amber-400 transition-all duration-300 hover:scale-105 hover:bg-amber-400 hover:text-black hover:shadow-[0_15px_40px_rgba(200,164,93,0.35)]"
          >
            Call Us
          </NavLink>

        </div>

      </div>

    </section>
  );
}

export default ReservationCTA;