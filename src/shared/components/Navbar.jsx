import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Gallery", path: "/gallery" },
  { name: "Reservations", path: "/reservations" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/90 backdrop-blur-xl">
      <div className="container flex h-24 items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="group flex flex-col"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-3xl font-semibold tracking-wide text-amber-400 transition duration-300 group-hover:text-amber-300">
            Ember & Oak
          </span>

          <span className="text-xs uppercase tracking-[0.35rem] text-zinc-500 transition duration-300 group-hover:text-zinc-300">
            Luxury Steakhouse
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-12">

            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-[15px] font-medium tracking-wide transition-all duration-300 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:-translate-y-0.5 hover:text-amber-400 hover:after:w-full ${
                      isActive
                        ? "text-amber-400 after:w-full"
                        : "text-zinc-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

          </ul>
        </nav>

        {/* CTA */}
        <button className="hidden rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_12px_35px_rgba(200,164,93,0.35)] lg:block">
          Reserve Table
        </button>

        {/* Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white transition hover:text-amber-400 lg:hidden"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-zinc-800 bg-zinc-950 lg:hidden">
          <ul className="container flex flex-col gap-2 py-6">

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-5 py-4 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-amber-500 text-black"
                      : "text-white hover:bg-zinc-900 hover:pl-7"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button className="mt-5 rounded-xl bg-amber-500 py-4 font-semibold text-black transition-all duration-300 hover:bg-white">
              Reserve Table
            </button>

          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;