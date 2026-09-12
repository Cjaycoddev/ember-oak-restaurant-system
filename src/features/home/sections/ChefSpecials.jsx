import { NavLink } from "react-router-dom";
import herbCrustedLamb from "../../../assets/images/menu/grill/herb-crusted-rack-of-lamb.jpg";
import seafoodPaella from "../../../assets/images/menu/seafood/seafood-paella.jpg";
import cremeBrulee from "../../../assets/images/menu/desserts/creme-brulee.jpg";

const specials = [
  {
    title: "Herb Crusted Rack of Lamb",
    tag: "Chef's Signature",
    chef: "Chef Alessandro",
    price: "KSh 5,900",
    image:
      herbCrustedLamb,
    description:
      "Tender New Zealand lamb finished with rosemary herbs, garlic and a rich red wine reduction.",
  },
  {
    title: "Seafood Paella",
    tag: "Seasonal Favourite",
    chef: "Chef Isabella",
    price: "KSh 4,200",
    image:
      seafoodPaella,
    description:
      "Traditional Spanish saffron rice generously topped with prawns, mussels, calamari and fresh herbs.",
  },
  {
    title: "Crème Brûlée",
    tag: "Dessert Special",
    chef: "Chef Daniel",
    price: "KSh 1,400",
    image:
      cremeBrulee,
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
              className="group flex h-full flex-col overflow-hidden border border-zinc-800 bg-zinc-900 transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(200,164,93,0.18)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <span className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.25rem] text-amber-400">
                  {item.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-3xl text-white transition duration-300 group-hover:text-amber-400">
                  {item.title}
                </h3>

                <p className="mt-5 grow leading-8 text-zinc-400">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center justify-between gap-6">
                  <div>
                    <span className="block text-sm font-medium text-zinc-500">
                      {item.chef}
                    </span>

                    <span className="mt-1 block text-xl font-semibold text-amber-400">
                      {item.price}
                    </span>
                  </div>

                  <NavLink
                    to={
                      item.title === "Herb Crusted Rack of Lamb"
                        ? "/menu#dish-herb-crusted-rack-of-lamb"
                        : item.title === "Seafood Paella"
                        ? "/menu#dish-seafood-paella"
                        : "/menu#dish-creme-brulee"
                    }
                    className="group inline-flex shrink-0 items-center gap-2 border border-amber-400 px-6 py-3 font-medium text-amber-400 transition-all duration-300 hover:bg-amber-400 hover:text-black"
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