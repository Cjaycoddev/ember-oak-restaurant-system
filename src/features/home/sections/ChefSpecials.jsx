import { NavLink } from "react-router-dom";

const specials = [
  {
    title: "Herb Crusted Rack of Lamb",
    tag: "Chef's Signature",
    chef: "Chef Alessandro",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1400&q=90",
    description:
      "Tender New Zealand lamb finished with rosemary herbs, garlic and a rich red wine reduction.",
  },
  {
    title: "Seafood Paella",
    tag: "Seasonal Favourite",
    chef: "Chef Isabella",
    image:
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=1400&q=90",
    description:
      "Traditional Spanish saffron rice generously topped with prawns, mussels, calamari and fresh herbs.",
  },
  {
    title: "Crème Brûlée",
    tag: "Dessert Special",
    chef: "Chef Daniel",
    image:
      "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1400&q=90",
    description:
      "Silky Madagascan vanilla custard finished with a perfectly caramelised sugar crust.",
  },
];

function ChefSpecials() {
  return (
    <section className="bg-zinc-950 py-36">
      <div className="container">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Chef Recommends
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            Today's Specials
          </h2>

          <p className="mt-7 text-lg leading-8 text-zinc-400">
            A carefully selected collection of seasonal creations prepared by
            our chefs using the finest ingredients available today.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {specials.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(200,164,93,0.18)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <div className="flex flex-col p-8">
                <span className="text-xs uppercase tracking-[0.3rem] text-amber-400">
                  {item.tag}
                </span>

                <h3 className="mt-3 text-3xl text-white transition duration-300 group-hover:text-amber-400">
                  {item.title}
                </h3>

                <p className="mt-5 flex-grow leading-8 text-zinc-400">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-500">
                    {item.chef}
                  </span>

                  <NavLink
                    to="/menu"
                    className="group inline-flex items-center gap-2 font-medium text-amber-400 transition-all duration-300 hover:text-white"
                  >
                    <span>Discover</span>

                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChefSpecials;