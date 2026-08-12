import interiorOne from "../../../assets/images/interiors/interior-1.jpg";
import interiorTwo from "../../../assets/images/interiors/interior-2.jpg";

function Story() {
  return (
    <section className="bg-black py-36">
      <div className="container">
        <div className="grid items-center gap-24 lg:grid-cols-2">

          {/* Images */}

          <div className="grid grid-cols-2 gap-8">

            <div className="overflow-hidden rounded-3xl">
              <img
                src={interiorOne}
                alt="Restaurant interior"
                className="h-[560px] w-full rounded-3xl object-cover transition-all duration-700 hover:scale-105"
              />
            </div>

            <div className="mt-20 overflow-hidden rounded-3xl">
              <img
                src={interiorTwo}
                alt="Dining experience"
                className="h-[560px] w-full rounded-3xl object-cover transition-all duration-700 hover:scale-105"
              />
            </div>

          </div>

          {/* Content */}

          <div>

            <span className="uppercase tracking-[0.35rem] text-amber-400">
              Our Story
            </span>

            <h2 className="mt-5 text-5xl text-white md:text-6xl">
              Where Fire Meets Elegance
            </h2>

            <p className="mt-8 text-lg leading-9 text-zinc-400">
              Ember & Oak blends timeless open-fire cooking with contemporary
              luxury to create a dining experience unlike any other. Every dish
              is thoughtfully prepared using premium ingredients, refined
              techniques and genuine hospitality.
            </p>

            <p className="mt-7 text-lg leading-9 text-zinc-400">
              Whether celebrating life's special moments, enjoying an intimate
              dinner or hosting a corporate gathering, every guest receives the
              same unwavering attention to detail from the first welcome to the
              final course.
            </p>

            <div className="mt-14 grid grid-cols-2 gap-10">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-amber-400 hover:-translate-y-1">
                <h3 className="text-4xl font-bold text-amber-400">
                  15+
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  Years of Culinary Excellence
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-amber-400 hover:-translate-y-1">
                <h3 className="text-4xl font-bold text-amber-400">
                  25k+
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  Happy Guests Served
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-amber-400 hover:-translate-y-1">
                <h3 className="text-4xl font-bold text-amber-400">
                  40+
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  Signature Dishes
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-amber-400 hover:-translate-y-1">
                <h3 className="text-4xl font-bold text-amber-400">
                  5★
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  Premium Dining Experience
                </p>
              </div>

            </div>

            <button className="mt-14 rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_12px_35px_rgba(200,164,93,0.35)]">
              Discover More
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Story;