import { NavLink } from "react-router-dom";
import heroImage from "../../../assets/images/hero/hero-restaurant.jpg";

function Hero() {
  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(
          rgba(10, 10, 10, 0.68),
          rgba(10, 10, 10, 0.82)
        ), url(${heroImage})`,
      }}
    >
      {/* Fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

      <div className="container relative z-10">
        <div className="max-w-5xl">

          <span className="mb-6 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-5 py-2 text-sm uppercase tracking-[0.35rem] text-amber-300 backdrop-blur-sm">
            Premium Steakhouse
          </span>

          <h1 className="text-5xl font-semibold leading-[0.95] text-white md:text-7xl xl:text-8xl">
            Fire.
            <br />
            Flavor.
            <br />
            Experience.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-300">
            A contemporary steakhouse where open-fire cooking, seasonal
            ingredients and exceptional hospitality come together to create
            unforgettable dining experiences.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <NavLink
              to="/reservations"
              className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_40px_rgba(200,164,93,0.35)]"
            >
              Reserve a Table
            </NavLink>

            <NavLink
              to="/menu"
              className="rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:bg-amber-500 hover:text-black hover:shadow-[0_15px_40px_rgba(200,164,93,0.35)]"
            >
              Explore Menu
            </NavLink>

          </div>

        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white/30">
          <div className="mt-2 h-2.5 w-2.5 animate-bounce rounded-full bg-amber-400"></div>
        </div>
      </div>

    </section>
  );
}

export default Hero;