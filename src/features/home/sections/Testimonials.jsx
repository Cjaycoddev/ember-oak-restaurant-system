const testimonials = [
  {
    name: "James Mwangi",
    role: "Business Executive",
    review:
      "From the moment we arrived, every detail exceeded our expectations. The steak was perfectly prepared, the atmosphere was elegant, and the service was exceptional.",
  },
  {
    name: "Sarah Wanjiku",
    role: "Food Critic",
    review:
      "A truly premium dining experience. Every course was beautifully presented, the flavours were unforgettable, and the QR ordering system made everything effortless.",
  },
  {
    name: "Brian Otieno",
    role: "Regular Guest",
    review:
      "I've visited several times and the quality has remained consistently outstanding. Friendly staff, amazing ambience, and one of the finest steakhouses I've experienced.",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#0f0f10] py-36">
      <div className="container">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Testimonials
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            Loved By Our Guests
          </h2>

          <p className="mt-7 text-lg leading-8 text-zinc-400">
            Every visit is carefully designed to deliver exceptional cuisine,
            impeccable service and unforgettable moments worth sharing.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-3">

          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900/70 p-9 transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(200,164,93,0.18)]"
            >
              <div className="mb-6 flex items-center justify-between">

                <span className="text-6xl leading-none text-amber-400 opacity-70">
                  “
                </span>

                <span className="text-xl tracking-wider text-amber-400">
                  ★★★★★
                </span>

              </div>

              <p className="grow leading-8 text-zinc-300">
                {item.review}
              </p>

              <div className="mt-10 border-t border-zinc-700 pt-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-black">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-white transition duration-300 group-hover:text-amber-400">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm uppercase tracking-wider text-zinc-400">
                      {item.role}
                    </p>

                  </div>

                </div>

              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials; 