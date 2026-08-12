import { NavLink } from "react-router-dom";

const dishes = [
  {
    name: "Wagyu Ribeye",
    category: "Chef's Choice",
    price: "$78",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90",
    description:
      "Premium Wagyu ribeye grilled over oak fire and finished with roasted garlic butter.",
  },
  {
    name: "Atlantic Salmon",
    category: "Fresh Catch",
    price: "$34",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=90",
    description:
      "Fresh Atlantic salmon served with grilled asparagus, seasonal vegetables and lemon butter sauce.",
  },
  {
    name: "Lobster Linguine",
    category: "House Favourite",
    price: "$46",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1400&q=90",
    description:
      "Fresh lobster folded into handmade linguine with garlic, herbs and a delicate parmesan cream.",
  },
];

function FeaturedDishes() {
  return (
    <section className="bg-[#111] py-36">
      <div className="container">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Signature Menu
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            Featured Dishes
          </h2>

          <p className="mx-auto mt-7 text-lg leading-8 text-zinc-400">
            Our guests' favourites, crafted from premium ingredients and
            finished over an open flame to deliver unforgettable flavour.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {dishes.map((dish) => (
            <article
              key={dish.name}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(200,164,93,0.18)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent"></div>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <span className="text-sm uppercase tracking-[0.25rem] text-amber-400">
                  {dish.category}
                </span>

                <h3 className="mt-3 text-3xl text-white transition duration-300 group-hover:text-amber-400">
                  {dish.name}
                </h3>

                <p className="mt-5 grow leading-8 text-zinc-400">
                  {dish.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-3xl font-bold text-amber-400">
                    {dish.price}
                  </span>

                  <NavLink
                    to="/menu"
                    className="rounded-xl border border-amber-400 px-6 py-3 font-medium text-amber-400 transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg"
                  >
                    View Details →
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

export default FeaturedDishes;