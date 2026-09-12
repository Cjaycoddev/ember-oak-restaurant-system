const fs = require("fs");

const updates = {
  "src/features/home/sections/FeaturedDishes.jsx": [
    [
      'import { NavLink } from "react-router-dom";',
      `import { NavLink } from "react-router-dom";
import wagyuRibeye from "../../../assets/images/menu/grill/wagyu-ribeye.jpg";
import lobsterLinguine from "../../../assets/images/menu/pasta/lobster-linguine.jpg";`
    ],
    [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90',
      'wagyuRibeye'
    ],
    [
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=90',
      '/images/external/atlantic-salmon-asparagus.jpg'
    ],
    [
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1400&q=90',
      'lobsterLinguine'
    ]
  ],

  "src/features/home/sections/ChefSpecials.jsx": [
    [
      'import { NavLink } from "react-router-dom";',
      `import { NavLink } from "react-router-dom";
import herbCrustedLamb from "../../../assets/images/menu/grill/herb-crusted-rack-of-lamb.jpg";
import seafoodPaella from "../../../assets/images/menu/seafood/seafood-paella.jpg";
import cremeBrulee from "../../../assets/images/menu/desserts/creme-brulee.jpg";`
    ],
    [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1400&q=90',
      'herbCrustedLamb'
    ],
    [
      'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=1400&q=90',
      'seafoodPaella'
    ],
    [
      'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1400&q=90',
      'cremeBrulee'
    ]
  ]
};

for (const [file, replacements] of Object.entries(updates)) {
  let content = fs.readFileSync(file, "utf8");

  for (const [oldValue, newValue] of replacements) {
    if (!content.includes(oldValue)) {
      console.log(`NOT FOUND: ${file}`);
      console.log(oldValue);
      continue;
    }

    content = content.replace(oldValue, newValue);
  }

  fs.writeFileSync(file, content, "utf8");
  console.log(`UPDATED: ${file}`);
}
