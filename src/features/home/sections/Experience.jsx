function Experience() {
  const features = [
    {
      title: "Open Fire Kitchen",
      text: "Every premium cut is expertly finished over an open flame, creating rich flavours and a distinctive smoky character.",
    },
    {
      title: "Fresh Ingredients",
      text: "We source the finest seasonal produce from trusted local farms and artisan suppliers to guarantee exceptional quality.",
    },
    {
      title: "Award-Winning Chefs",
      text: "Our experienced culinary team combines creativity, passion and precision to deliver memorable dining experiences.",
    },
  ];

  return (
    <section className="bg-zinc-950 py-36">
      <div className="container">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="uppercase tracking-[0.35rem] text-amber-400">
            The Experience
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            More Than Just Dinner
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-zinc-400">
            Ember & Oak creates unforgettable dining experiences through
            exceptional cuisine, elegant interiors, warm hospitality and
            impeccable service. Every visit is carefully crafted to leave a
            lasting impression from the first welcome to the final course.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_18px_45px_rgba(200,164,93,0.15)]"
            >
              <h3 className="mb-5 text-2xl text-white transition duration-300 group-hover:text-amber-400">
                {item.title}
              </h3>

              <p className="leading-8 text-zinc-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;