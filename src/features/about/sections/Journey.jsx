import journeyImage from "../../../assets/images/interiors/journey-fire.jpg";

const milestones = [
  {
    year: "The Beginning",
    title: "A Small Kitchen, A Big Dream",
    description:
      "What began with a passion for cooking slowly became a commitment to creating food that people genuinely wanted to come back for.",
  },
  {
    year: "Oak",
    title: "Starting Small",
    description:
      "With limited resources but plenty of determination, Oak began as a modest food outlet. The menu was focused, the team was small and every customer mattered.",
  },
  {
    year: "Growing",
    title: "One Guest At A Time",
    description:
      "As word spread, so did the vision. Returning guests, new faces and countless lessons shaped the business into something far beyond its humble beginnings.",
  },
  {
    year: "Ember & Oak",
    title: "A New Chapter",
    description:
      "Ember & Oak brought the original spirit of Oak into a more refined setting—combining open-fire cooking, thoughtful hospitality and an atmosphere designed for memorable occasions.",
  },
];

function Journey() {
  return (
    <section className="bg-[#0d0d0d] py-36">
      <div className="container">

        <div className="grid gap-20 lg:grid-cols-[1fr_0.9fr] lg:items-start">

          {/* Timeline */}
          <div>
            <span className="uppercase tracking-[0.35rem] text-amber-400">
              The Journey
            </span>

            <h2 className="mt-5 text-5xl font-semibold text-white md:text-6xl">
              From Oak To Ember &amp; Oak
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
              Growth didn't happen overnight. It came through persistence,
              patience and thousands of small decisions that gradually turned
              an idea into a destination.
            </p>

            <div className="relative mt-16 border-l border-zinc-800 pl-10">

              {milestones.map((item, index) => (
                <article
                  key={item.year}
                  className={`relative ${
                    index !== milestones.length - 1 ? "pb-14" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-[49px] top-1 h-4 w-4 rounded-full border-2 border-amber-400 bg-[#0d0d0d]"></span>

                  <span className="text-sm uppercase tracking-[0.25rem] text-amber-400">
                    {item.year}
                  </span>

                  <h3 className="mt-3 text-3xl text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-xl leading-8 text-zinc-400">
                    {item.description}
                  </p>
                </article>
              ))}

            </div>
          </div>

          {/* Image */}
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={journeyImage}
                alt="Ember & Oak dining experience"
                className="h-[680px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="mt-6 border-l border-amber-400 pl-6">
              <p className="text-xl italic leading-8 text-zinc-300">
                "The ember represents the passion that started the journey.
                The oak represents everything that passion became."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Journey;