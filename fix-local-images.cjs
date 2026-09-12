const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const MENU_SRC = path.join(ROOT, "src", "assets", "images", "menu");
const GALLERY_SRC = path.join(ROOT, "src", "assets", "images", "gallery");

const MENU_PUBLIC = path.join(ROOT, "public", "images", "menu");
const GALLERY_PUBLIC = path.join(ROOT, "public", "images", "gallery");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(source, destination) {
  if (!fs.existsSync(source)) return;

  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    ensureDir(destination);

    for (const item of fs.readdirSync(source)) {
      copyRecursive(
        path.join(source, item),
        path.join(destination, item)
      );
    }

    return;
  }

  ensureDir(path.dirname(destination));
  fs.copyFileSync(source, destination);
}

function replaceInFile(file, replacements) {
  if (!fs.existsSync(file)) {
    console.log(`SKIP  ${file}`);
    return;
  }

  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  for (const [from, to] of Object.entries(replacements)) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`FIXED ${path.relative(ROOT, file)}`);
  }
}

/*
 * 1. Copy the canonical menu image library.
 *
 * This includes your manually cropped drink images.
 */
console.log("\nCopying canonical MENU images...");
copyRecursive(MENU_SRC, MENU_PUBLIC);

/*
 * 2. Copy the canonical gallery image library.
 */
console.log("Copying canonical GALLERY images...");
copyRecursive(GALLERY_SRC, GALLERY_PUBLIC);

/*
 * 3. Menu image mapping.
 *
 * External image names are deliberately mapped to the correct
 * Ember & Oak menu category/file.
 */
const menuMap = {
  "photo-1559339352-11d035aa65de.jpg":
    "/images/menu/starters/ember-charred-octopus.jpg",

  "photo-1608897013039-887f21d8c804.jpg":
    "/images/menu/starters/burrata-heirloom-tomato.jpg",

  "photo-1601050690597-df0568f70950.jpg":
    "/images/menu/starters/wild-mushroom-croquettes.jpg",

  "photo-1544025162-d76694265947.jpg":
    "/images/menu/grill/wagyu-ribeye.jpg",

  "photo-1600891964092-4316c288032e.jpg":
    "/images/menu/grill/herb-crusted-rack-of-lamb.jpg",

  "photo-1558030006-450675393462.jpg":
    "/images/menu/grill/oak-smoked-beef-tenderloin.jpg",

  "photo-1532550907401-a500c9a57435.jpg":
    "/images/menu/grill/ember-chicken-supreme.jpg",

  "atlantic-salmon-asparagus.jpg":
    "/images/menu/seafood/atlantic-salmon.jpg",

  "photo-1515443961218-a51367888e4b.jpg":
    "/images/menu/seafood/seafood-paella.jpg",

  "photo-1565680018434-b513d5e5fd47.jpg":
    "/images/menu/seafood/garlic-butter-prawns.jpg",

  "photo-1519708227418-c8fd9a32b7a2.jpg":
    "/images/menu/seafood/pan-seared-sea-bass.jpg",

  "photo-1559847844-5315695dadae.jpg":
    "/images/menu/pasta/lobster-linguine.jpg",

  "photo-1476124369491-e7addf5db371.jpg":
    "/images/menu/pasta/wild-mushroom-risotto.jpg",

  "photo-1473093295043-cdd812d0e601.jpg":
    "/images/menu/pasta/truffle-tagliatelle.jpg",

  "photo-1621996346565-e3dbc646d9a9.jpg":
    "/images/menu/pasta/penne-arrabbiata.jpg",

  "photo-1568901346375-23c9450c58cd.jpg":
    "/images/menu/mains/ember-oak-burger.jpg",

  "photo-1540420773420-3366772f4999.jpg":
    "/images/menu/mains/roasted-vegetable-wellington.jpg",

  "photo-1603133872878-684f208fb84b.jpg":
    "/images/menu/mains/chicken-herb-risotto.jpg",

  "photo-1470124182917-cc6e71b22ecc.jpg":
    "/images/menu/desserts/creme-brulee.jpg",

  "dark-chocolate-fondant-card.jpg":
    "/images/menu/desserts/dark-chocolate-fondant.jpg",

  "photo-1464305795204-6f5bbfc7fb81.jpg":
    "/images/menu/desserts/lemon-passion-fruit-tart.jpg",

  "photo-1565958011703-44f9829ba187.jpg":
    "/images/menu/desserts/seasonal-cheesecake.jpg",

  "photo-1473973266408-ed4e27abdd47.jpg":
    "/images/menu/drinks/ember-old-fashioned.jpg",

  "photo-1513558161293-cdaf765ed2fd.jpg":
    "/images/menu/drinks/passion-fruit-spritz.jpg",

  "photo-1556679343-c7306c1976bc.jpg":
    "/images/menu/drinks/fresh-lime-mint-cooler.jpg",

  "espresso-martini-card.jpg":
    "/images/menu/drinks/espresso-martini.jpg",

  "photo-1495474472287-4d71bcdd2085.jpg":
    "/images/menu/drinks/kenyan-single-origin-coffee.jpg"
};

/*
 * 4. Additional direct legacy menu image references.
 */
const legacyMenuMap = {
  "/images/external/photo-1544025162-d76694265947.jpg":
    "/images/menu/grill/wagyu-ribeye.jpg",

  "/images/external/atlantic-salmon-asparagus.jpg":
    "/images/menu/seafood/atlantic-salmon.jpg",

  "/images/external/photo-1559847844-5315695dadae.jpg":
    "/images/menu/pasta/lobster-linguine.jpg",

  "/images/external/photo-1600891964092-4316c288032e.jpg":
    "/images/menu/grill/herb-crusted-rack-of-lamb.jpg",

  "/images/external/photo-1515443961218-a51367888e4b.jpg":
    "/images/menu/seafood/seafood-paella.jpg",

  "/images/external/photo-1470124182917-cc6e71b22ecc.jpg":
    "/images/menu/desserts/creme-brulee.jpg",

  "/images/external/photo-1532550907401-a500c9a57435.jpg":
    "/images/menu/grill/ember-chicken-supreme.jpg",

  "/images/external/photo-1476124369491-e7addf5db371.jpg":
    "/images/menu/pasta/wild-mushroom-risotto.jpg",

  "/images/external/photo-1519708227418-c8fd9a32b7a2.jpg":
    "/images/menu/seafood/pan-seared-sea-bass.jpg",

  "/images/external/photo-1559339352-11d035aa65de.jpg":
    "/images/menu/starters/ember-charred-octopus.jpg",

  "/images/external/dark-chocolate-fondant-card.jpg":
    "/images/menu/desserts/dark-chocolate-fondant.jpg",

  "/images/external/espresso-martini-card.jpg":
    "/images/menu/drinks/espresso-martini.jpg",

  "/images/external/photo-1556679343-c7306c1976bc.jpg":
    "/images/menu/drinks/fresh-lime-mint-cooler.jpg",

  "/images/external/photo-1495474472287-4d71bcdd2085.jpg":
    "/images/menu/drinks/kenyan-single-origin-coffee.jpg"
};

/*
 * 5. Gallery mapping.
 */
const galleryMap = {
  "/images/external/photo-1517248135467-4c7edcad34c4.jpg":
    "/images/gallery/gallery-interior-01.jpg",

  "/images/external/photo-1550966871-3ed3cdb5ed0c.jpg":
    "/images/gallery/gallery-interior-02.jpg",

  "/images/external/photo-1515003197210-e0cd71810b5f.jpg":
    "/images/gallery/gallery-interior-03.jpg",

  "/images/external/photo-1547592180-85f173990554.jpg":
    "/images/gallery/gallery-food-01.jpg",

  "/images/external/photo-1414235077428-338989a2e8c0.jpg":
    "/images/gallery/gallery-food-02.jpg",

  "/images/external/photo-1556910103-1c02745aae4d.jpg":
    "/images/gallery/gallery-kitchen-01.jpg",

  "/images/external/photo-1519167758481-83f550bb49b3.jpg":
    "/images/gallery/gallery-interior-04.jpg",

  "/images/external/photo-1544025162-d76694265947.jpg":
    "/images/gallery/gallery-food-03.jpg",

  "/images/external/photo-1513104890138-7c749659a591.jpg":
    "/images/gallery/gallery-food-04.jpg",

  "/images/external/photo-1559339352-11d035aa65de.jpg":
    "/images/gallery/gallery-food-05.jpg"
};

/*
 * 6. Replace references in active files.
 */
replaceInFile(
  path.join(ROOT, "src", "features", "menu", "pages", "MenuPage.jsx"),
  Object.fromEntries(
    Object.entries(menuMap).map(([file, target]) => [
      `/images/external/${file}`,
      target
    ])
  )
);

replaceInFile(
  path.join(ROOT, "src", "data", "menuData.js"),
  legacyMenuMap
);

replaceInFile(
  path.join(ROOT, "src", "features", "gallery", "data", "galleryData.js"),
  galleryMap
);

replaceInFile(
  path.join(ROOT, "src", "features", "home", "sections", "FeaturedDishes.jsx"),
  {
    "/images/external/atlantic-salmon-asparagus.jpg":
      "/images/menu/seafood/atlantic-salmon.jpg"
  }
);

/*
 * 7. Scan the source code for remaining external image references.
 */
console.log("\nScanning for remaining /images/external references...\n");

const sourceDirs = [
  path.join(ROOT, "src")
];

const allowedExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css"
]);

let remaining = [];

function scan(dir) {
  if (!fs.existsSync(dir)) return;

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      scan(full);
      continue;
    }

    if (!allowedExtensions.has(path.extname(full))) continue;

    const content = fs.readFileSync(full, "utf8");

    if (content.includes("/images/external/")) {
      remaining.push(path.relative(ROOT, full));
    }
  }
}

for (const dir of sourceDirs) {
  scan(dir);
}

if (remaining.length === 0) {
  console.log("SUCCESS: No /images/external references remain in src.");
} else {
  console.log("REMAINING REFERENCES:");
  for (const file of remaining) {
    console.log(` - ${file}`);
  }
}

console.log("\nImage migration complete.");
console.log("DO NOT delete public/images/external yet.");
console.log("First run: npm run build");