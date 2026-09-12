const menuItems = [
  {
    id: "wagyu-ribeye",
    name: "Wagyu Ribeye",
    category: "From the Fire",
    price: "KSh 7,800",
    image:
      "/images/menu/grill/wagyu-ribeye.jpg",
    description:
      "Premium Wagyu ribeye grilled over oak fire and finished with roasted garlic butter.",
    featured: true,
    special: false,
  },
  {
    id: "atlantic-salmon",
    name: "Atlantic Salmon",
    category: "From the Sea",
    price: "KSh 3,400",
    image:
      "/images/menu/seafood/atlantic-salmon.jpg",
    description:
      "Fresh salmon with grilled asparagus, seasonal vegetables and lemon butter.",
    featured: true,
    special: false,
  },
  {
    id: "lobster-linguine",
    name: "Lobster Linguine",
    category: "Pasta & Grains",
    price: "KSh 4,600",
    image:
      "/images/menu/pasta/lobster-linguine.jpg",
    description:
      "Handmade linguine with lobster, garlic, herbs and delicate parmesan cream.",
    featured: true,
    special: false,
  },

  {
    id: "herb-crusted-rack-of-lamb",
    name: "Herb Crusted Rack of Lamb",
    category: "Today's Specials",
    price: "KSh 5,200",
    image:
      "/images/menu/grill/herb-crusted-rack-of-lamb.jpg",
    description:
      "Tender lamb finished with rosemary, garlic and a rich red wine reduction.",
    featured: false,
    special: true,
  },
  {
    id: "seafood-paella",
    name: "Seafood Paella",
    category: "Today's Specials",
    price: "KSh 4,200",
    image:
      "/images/menu/seafood/seafood-paella.jpg",
    description:
      "Saffron rice with prawns, mussels, calamari and fresh herbs.",
    featured: false,
    special: true,
  },
  {
    id: "creme-brulee",
    name: "Crè¨me Brè»lè©e",
    category: "Desserts",
    price: "KSh 1,200",
    image:
      "/images/menu/desserts/creme-brulee.jpg",
    description:
      "Silky Madagascan vanilla custard finished with a crisp caramelised crust.",
    featured: false,
    special: true,
  },

  {
    id: "charred-octopus",
    name: "Charred Octopus",
    category: "Starters",
    price: "KSh 2,600",
    image:
      "/images/external/photo-1533777857889-4be7c70b33f7.jpg",
    description:
      "Slow-cooked octopus charred over fire with smoked paprika, herbs and citrus.",
    featured: false,
    special: false,
  },
  {
    id: "smoked-beef-carpaccio",
    name: "Smoked Beef Carpaccio",
    category: "Starters",
    price: "KSh 2,400",
    image:
      "/images/menu/grill/wagyu-ribeye.jpg",
    description:
      "Thinly sliced smoked beef with parmesan, herbs, capers and toasted sourdough.",
    featured: false,
    special: false,
  },
  {
    id: "wild-mushroom-risotto",
    name: "Wild Mushroom Risotto",
    category: "Mains",
    price: "KSh 2,900",
    image:
      "/images/menu/pasta/wild-mushroom-risotto.jpg",
    description:
      "Creamy arborio rice with roasted mushrooms, parmesan and fresh herbs.",
    featured: false,
    special: false,
  },
  {
    id: "ember-grilled-chicken",
    name: "Ember-Grilled Chicken",
    category: "From the Fire",
    price: "KSh 3,200",
    image:
      "/images/menu/grill/ember-chicken-supreme.jpg",
    description:
      "Free-range chicken grilled over oak with roasted garlic jus and seasonal greens.",
    featured: false,
    special: false,
  },
  {
    id: "roasted-branzino",
    name: "Whole Roasted Branzino",
    category: "From the Sea",
    price: "KSh 4,400",
    image:
      "/images/menu/seafood/pan-seared-sea-bass.jpg",
    description:
      "Whole roasted sea bass with lemon, herbs, fennel and caper butter.",
    featured: false,
    special: false,
  },
  {
    id: "truffle-fries",
    name: "Truffle Fries",
    category: "Sides",
    price: "KSh 900",
    image:
      "/images/external/photo-1573080496219-bb080dd4f877.jpg",
    description:
      "Crisp hand-cut fries finished with truffle oil, parmesan and herbs.",
    featured: false,
    special: false,
  },
  {
    id: "roasted-broccolini",
    name: "Charred Broccolini",
    category: "Sides",
    price: "KSh 850",
    image:
      "/images/external/photo-1455619452474-d2be8b1e70cd.jpg",
    description:
      "Fire-charred broccolini with lemon, parmesan and chilli oil.",
    featured: false,
    special: false,
  },
  {
    id: "dark-chocolate-tart",
    name: "Dark Chocolate Tart",
    category: "Desserts",
    price: "KSh 1,300",
    image:
      "/images/external/photo-1578985545062-69928b1d9587.jpg",
    description:
      "Dark chocolate ganache, buttery pastry and a touch of smoked sea salt.",
    featured: false,
    special: false,
  },
];

export const menuCategories = [
  "Today's Specials",
  "Starters",
  "From the Fire",
  "From the Sea",
  "Pasta & Grains",
  "Mains",
  "Sides",
  "Desserts",
];

export const featuredDishes = menuItems.filter(
  (item) => item.featured
);

export const specialDishes = menuItems.filter(
  (item) => item.special
);

export default menuItems;



