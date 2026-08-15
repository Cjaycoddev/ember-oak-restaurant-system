const principles = [
  {
    number: "01",
    title: "Respect The Ingredient",
    description:
      "Great cooking begins with great ingredients. We keep preparation intentional so quality remains at the heart of every plate.",
  },
  {
    number: "02",
    title: "Cook With Character",
    description:
      "Fire, smoke, heat and time give food its personality. Our cooking embraces those elements rather than hiding them.",
  },
  {
    number: "03",
    title: "Never Stop Learning",
    description:
      "The kitchen that started this journey was built around curiosity. That same mindset continues to shape everything we create.",
  },
  {
    number: "04",
    title: "Make People Feel Welcome",
    description:
      "Exceptional hospitality should feel natural. From the first welcome to the final course, every detail should feel considered.",
  },
];

function Philosophy() {
  return (
    <section className="bg-black py-36">
      <div className="container">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="uppercase tracking-[0.35rem] text-amber-400">
            What We Believe
          </span>

          <h2 className="mt-5 text-5xl font-semibold text-white md:text-6xl">
            The Principles Behind The Plate
          </h2>

          <p className="mt-7 text-lg leading-8 text-zinc-400">
            Ember &amp; Oak was built around a few simple ideas that continue
            to guide the kitchen, the room and the way we welcome our guests.
          </p>
        </div>

        {/* Principles */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-800 md:grid-cols-2">
          {principles.map((item) => (
            <article
              key={item.number}
              className="group bg-[#111111] p-10 transition-all duration-500 hover:bg-[#151515] md:p-12"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm tracking-[0.25rem] text-amber-400">
                  {item.number}
                </span>

                <div className="h-px w-16 bg-zinc-700 transition-all duration-500 group-hover:w-24 group-hover:bg-amber-400"></div>
              </div>

              <h3 className="mt-12 text-3xl text-white transition-colors duration-300 group-hover:text-amber-400">
                {item.title}
              </h3>

              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Philosophy;