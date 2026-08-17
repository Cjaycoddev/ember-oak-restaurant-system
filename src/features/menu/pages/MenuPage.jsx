import { useMemo, useState } from "react";

const menuSections = [
  {
    id: "starters",
    label: "Starters",
    cuisine: "Contemporary",
    description: "Elegant beginnings designed for the table.",
    items: [
      {
        name: "Ember Charred Octopus",
        description:
          "Charred octopus, smoked paprika potatoes, preserved lemon and herb oil.",
        price: 1850,
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85",
        tag: "Signature",
      },
      {
        name: "Burrata & Heirloom Tomato",
        description:
          "Creamy burrata, heirloom tomatoes, basil oil and aged balsamic.",
        price: 1650,
        image:
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Wild Mushroom Croquettes",
        description:
          "Crisp mushroom croquettes, parmesan cream and roasted garlic.",
        price: 1350,
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Beef Carpaccio",
        description:
          "Thinly sliced beef tenderloin, capers, parmesan and mustard dressing.",
        price: 1950,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },

  {
    id: "grill",
    label: "Grill & Fire",
    cuisine: "Ember & Oak",
    description:
      "Prime cuts kissed by oak flame and finished with restraint.",
    items: [
      {
        name: "Wagyu Ribeye",
        description:
          "Premium Wagyu ribeye grilled over oak fire and finished with roasted garlic butter.",
        price: 7800,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85",
        tag: "Featured",
      },
      {
        name: "Herb Crusted Rack of Lamb",
        description:
          "Tender New Zealand lamb, rosemary, garlic and red wine reduction.",
        price: 5200,
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=700&q=85",
        tag: "Today's Special",
      },
      {
        name: "Oak-Smoked Beef Tenderloin",
        description:
          "Premium beef tenderloin, smoked root vegetables and pepper jus.",
        price: 6100,
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Ember Chicken Supreme",
        description:
          "Fire-roasted chicken breast, charred corn, herbs and natural jus.",
        price: 3200,
        image:
          "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },

  {
    id: "seafood",
    label: "Seafood",
    cuisine: "Coastal",
    description:
      "Fresh catches paired with bright, seasonal flavours.",
    items: [
      {
        name: "Atlantic Salmon",
        description:
          "Fresh salmon, grilled asparagus, seasonal vegetables and lemon butter.",
        price: 3400,
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=85",
        tag: "Featured",
      },
      {
        name: "Seafood Paella",
        description:
          "Saffron rice with prawns, mussels, calamari and fresh herbs.",
        price: 3900,
        image:
          "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=700&q=85",
        tag: "Today's Special",
      },
      {
        name: "Garlic Butter Prawns",
        description:
          "Tiger prawns, roasted garlic, chilli, lemon and grilled sourdough.",
        price: 2950,
        image:
          "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Pan-Seared Sea Bass",
        description:
          "Crisp-skinned sea bass, pea purée, fennel and citrus beurre blanc.",
        price: 4300,
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },

  {
    id: "pasta",
    label: "Pasta & Risotto",
    cuisine: "Italian",
    description:
      "Hand-finished pasta and slow-cooked rice from the kitchen.",
    items: [
      {
        name: "Lobster Linguine",
        description:
          "Fresh lobster, handmade linguine, garlic, herbs and parmesan cream.",
        price: 4600,
        image:
          "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=700&q=85",
        tag: "Featured",
      },
      {
        name: "Wild Mushroom Risotto",
        description:
          "Arborio rice, wild mushrooms, parmesan and thyme.",
        price: 2750,
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Truffle Tagliatelle",
        description:
          "Fresh tagliatelle, black truffle, parmesan and brown butter.",
        price: 3500,
        image:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Penne Arrabbiata",
        description:
          "Italian tomato, roasted garlic, chilli, basil and parmesan.",
        price: 2100,
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },

  {
    id: "mains",
    label: "Main Plates",
    cuisine: "Contemporary",
    description:
      "Refined plates built around exceptional ingredients.",
    items: [
      {
        name: "Ember Oak Burger",
        description:
          "Dry-aged beef, aged cheddar, caramelised onion and house sauce.",
        price: 2600,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Roasted Vegetable Wellington",
        description:
          "Seasonal vegetables, mushroom duxelles and flaky pastry.",
        price: 2800,
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Slow-Braised Beef Short Rib",
        description:
          "Eight-hour braised beef, silky mash, roasted carrots and jus.",
        price: 4100,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Chicken & Herb Risotto",
        description:
          "Roasted chicken, parmesan risotto, garden herbs and jus.",
        price: 2900,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },

  {
    id: "desserts",
    label: "Desserts",
    cuisine: "Patisserie",
    description:
      "A final course worth lingering over.",
    items: [
      {
        name: "Crème Brûlée",
        description:
          "Madagascan vanilla custard finished with a caramelised sugar crust.",
        price: 1250,
        image:
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=700&q=85",
        tag: "Today's Special",
      },
      {
        name: "Dark Chocolate Fondant",
        description:
          "Warm dark chocolate cake, vanilla ice cream and cocoa soil.",
        price: 1450,
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476a?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Lemon & Passion Fruit Tart",
        description:
          "Bright citrus curd, passion fruit and toasted Italian meringue.",
        price: 1350,
        image:
          "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Seasonal Cheesecake",
        description:
          "Silky baked cheesecake with seasonal fruit and vanilla cream.",
        price: 1350,
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },

  {
    id: "drinks",
    label: "Drinks",
    cuisine: "Bar",
    description:
      "Classic pours, fresh cocktails and refined non-alcoholic options.",
    items: [
      {
        name: "Ember Old Fashioned",
        description:
          "Oak-smoked bourbon, bitters, orange and a touch of demerara.",
        price: 1800,
        image:
          "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=700&q=85",
        tag: "Signature",
      },
      {
        name: "Passion Fruit Spritz",
        description:
          "Passion fruit, citrus, sparkling water and fresh mint.",
        price: 950,
        image:
          "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Fresh Lime & Mint Cooler",
        description:
          "Fresh lime, mint, cane sugar and chilled sparkling water.",
        price: 750,
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Espresso Martini",
        description:
          "Fresh espresso, coffee liqueur and vodka shaken until silky.",
        price: 1600,
        image:
          "https://images.unsplash.com/photo-1619674078418-7e2e4d6b6a4d?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "House Iced Tea",
        description:
          "Cold-brewed black tea, citrus, mint and seasonal fruit.",
        price: 700,
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Kenyan Single-Origin Coffee",
        description:
          "Freshly brewed specialty coffee from selected Kenyan estates.",
        price: 650,
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
];

const filterOptions = [
  { id: "all", label: "All Menu" },
  ...menuSections.map((section) => ({
    id: section.id,
    label: section.label,
  })),
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-KE").format(price);

function MenuCard({ item }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden border border-zinc-800 bg-[#151412] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:bg-[#191714]">
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18rem] text-amber-400 backdrop-blur-sm">
            {item.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-6 text-white transition-colors group-hover:text-amber-400">
            {item.name}
          </h3>

          <span className="shrink-0 text-sm font-bold text-amber-400">
            KSh {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          {item.description}
        </p>
      </div>
    </article>
  );
}

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const activeSection = useMemo(
    () =>
      menuSections.find(
        (section) => section.id === activeCategory
      ),
    [activeCategory]
  );

  const featuredDishes = useMemo(
    () =>
      menuSections
        .flatMap((section) => section.items)
        .filter((item) => item.tag === "Featured"),
    []
  );

  const todaysSpecials = useMemo(
    () =>
      menuSections
        .flatMap((section) => section.items)
        .filter((item) => item.tag === "Today's Special"),
    []
  );

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return [];

    return menuSections.flatMap((section) =>
      section.items
        .filter((item) => {
          const searchableText = [
            item.name,
            item.description,
            item.tag,
            section.label,
            section.cuisine,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableText.includes(query);
        })
        .map((item) => ({
          ...item,
          sectionLabel: section.label,
          sectionId: section.id,
        }))
    );
  }, [searchTerm]);

  const visibleSections = useMemo(() => {
    if (activeCategory === "all") {
      return menuSections;
    }

    return menuSections.filter(
      (section) => section.id === activeCategory
    );
  }, [activeCategory]);

  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchInput.trim();

    setSearchTerm(value);

    if (value) {
      setActiveCategory("all");

      setTimeout(() => {
        document
          .getElementById("search-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 50);
    }
  };

  const handleCategoryChange = (categoryId) => {
    clearSearch();
    setActiveCategory(categoryId);

    setTimeout(() => {
      document
        .getElementById("full-menu")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <main className="min-h-screen bg-[#0d0c0a] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90"
            alt="Elegant restaurant dining overlooking the coast"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
        </div>

        <div className="container relative flex min-h-[520px] items-center py-28">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm uppercase tracking-[0.4rem] text-amber-400">
              Ember &amp; Oak
            </p>

            <h1 className="text-5xl leading-tight md:text-7xl">
              The Menu
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              Fire, seasonality and exceptional ingredients come together
              across a menu designed for long lunches, intimate dinners and
              memorable evenings.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#featured"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
              >
                Featured dishes
              </a>

              <a
                href="#specials"
                className="rounded-full border border-white/30 bg-black/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-amber-400 hover:text-amber-400"
              >
                Today&apos;s specials
              </a>

              <a
                href="#full-menu"
                className="rounded-full border border-white/30 bg-black/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-amber-400 hover:text-amber-400"
              >
                Explore menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH + CATEGORY NAVIGATION */}
      <section className="sticky top-0 z-30 border-b border-white/10 bg-[#11100e]/95 py-4 backdrop-blur-xl">
        <div className="container">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form
              onSubmit={handleSearch}
              className="relative w-full lg:max-w-md"
            >
              <input
                type="search"
                value={searchInput}
                onChange={(event) =>
                  setSearchInput(event.target.value)
                }
                placeholder="Search the menu..."
                aria-label="Search menu"
                className="w-full border border-zinc-700 bg-zinc-900 px-5 py-3 pr-24 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-400"
              />

              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-500 transition hover:text-white"
                >
                  Clear
                </button>
              )}

              <button
                type="submit"
                className="absolute right-0 top-0 h-full border-l border-zinc-700 px-4 text-xs font-semibold uppercase tracking-wider text-amber-400 transition hover:bg-amber-400 hover:text-black"
              >
                Search
              </button>
            </form>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filterOptions.map((option) => {
                const isActive =
                  activeCategory === option.id && !searchTerm;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(option.id)
                    }
                    className={[
                      "shrink-0 border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "border-amber-400 bg-transparent text-amber-400"
                        : "border-zinc-700 bg-zinc-900 text-white hover:border-amber-400 hover:text-amber-400",
                    ].join(" ")}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {searchTerm && (
        <section
          id="search-results"
          className="scroll-mt-28 border-b border-white/10 bg-[#11100e] py-16"
        >
          <div className="container">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3rem] text-amber-400">
                Menu search
              </p>

              <h2 className="mt-3 text-3xl text-white md:text-4xl">
                Results for &ldquo;{searchTerm}&rdquo;
              </h2>

              <p className="mt-3 text-sm text-zinc-500">
                {searchResults.length}{" "}
                {searchResults.length === 1
                  ? "dish"
                  : "dishes"}{" "}
                found.
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {searchResults.map((item) => (
                  <div key={`${item.sectionId}-${item.name}`}>
                    <MenuCard item={item} />

                    <p className="mt-2 text-[10px] uppercase tracking-[0.2rem] text-zinc-600">
                      {item.sectionLabel}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-zinc-800 bg-[#151412] px-6 py-12 text-center">
                <p className="text-lg text-white">
                  We couldn&apos;t find that on the menu.
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Try searching for steak, salmon, pasta, dessert,
                  coffee, or another dish.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-6 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FEATURED */}
      {!searchTerm && activeCategory === "all" && (
        <section
          id="featured"
          className="scroll-mt-28 border-b border-white/10 bg-[#11100e] py-20"
        >
          <div className="container">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3rem] text-amber-400">
                  From the kitchen
                </p>

                <h2 className="mt-3 text-4xl text-white md:text-5xl">
                  Featured Dishes
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-zinc-400">
                Guest favourites and signature plates that define
                the Ember &amp; Oak experience.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredDishes.map((dish) => (
                <MenuCard key={dish.name} item={dish} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TODAY'S SPECIALS */}
      {!searchTerm && activeCategory === "all" && (
        <section
          id="specials"
          className="scroll-mt-28 border-b border-white/10 bg-[#0d0c0a] py-20"
        >
          <div className="container">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3rem] text-amber-400">
                  Chef Recommends
                </p>

                <h2 className="mt-3 text-4xl text-white md:text-5xl">
                  Today&apos;s Specials
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-zinc-400">
                Seasonal creations selected by our chefs and prepared
                around what is best today.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {todaysSpecials.map((dish) => (
                <MenuCard key={dish.name} item={dish} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FULL MENU */}
      <section
        id="full-menu"
        className="scroll-mt-28 bg-[#0d0c0a] py-24"
      >
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.35rem] text-amber-400">
              {activeCategory === "all"
                ? "Explore"
                : activeSection?.cuisine}
            </p>

            <h2 className="mt-4 text-4xl text-white md:text-5xl">
              {activeCategory === "all"
                ? "Our Full Menu"
                : activeSection?.label}
            </h2>

            <p className="mt-5 text-base leading-7 text-zinc-400">
              {activeCategory === "all"
                ? "Choose from contemporary plates, fire-grilled favourites, coastal seafood, Italian classics, desserts and drinks."
                : activeSection?.description}
            </p>
          </div>

          <div className="space-y-24">
            {visibleSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <div className="mb-8 flex flex-col gap-3 border-b border-zinc-800 pb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3rem] text-amber-400">
                      {section.cuisine}
                    </p>

                    <h2 className="mt-2 text-3xl text-white md:text-4xl">
                      {section.label}
                    </h2>
                  </div>

                  <p className="max-w-md text-sm leading-6 text-zinc-500">
                    {section.description}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {section.items.map((item) => (
                    <MenuCard
                      key={item.name}
                      item={item}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="border-t border-white/10 bg-[#11100e] py-24">
        <div className="container">
          <div className="border border-zinc-800 bg-zinc-900 px-7 py-12 text-center md:px-16">
            <p className="text-xs uppercase tracking-[0.35rem] text-amber-400">
              Your table awaits
            </p>

            <h2 className="mt-4 text-4xl text-white md:text-5xl">
              Make an evening of it.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-zinc-400">
              Join us for fire, flavour and good company at Ember &amp;
              Oak.
            </p>

            <a
              href="/reservations"
              className="mt-8 inline-flex rounded-full bg-amber-400 px-7 py-3 font-semibold text-black transition hover:bg-amber-300"
            >
              Request a reservation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MenuPage;