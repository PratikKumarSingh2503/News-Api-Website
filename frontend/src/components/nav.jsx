import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "News", path: "/news/general" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 border-b border-gray-300 z-40 transition-all ${
        scrolled ? "backdrop-blur bg-white/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-rose-600" />
            <Link
              to="/"
              className="text-xl font-extrabold tracking-tight !text-rose-600"
            >
              PulseNews
            </Link>
          </div>

          {/* Center: Nav links (Desktop only) */}
          <ul className="hidden md:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `capitalize transition-colors ${
                      isActive
                        ? "text-rose-600" // active link color
                        : scrolled
                        ? "text-gray-600 hover:text-rose-600" // when scrolled
                        : "text-gray-600 hover:text-rose-300" // default
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right: Hamburger (Mobile only) */}
          <button
            className="md:hidden text-2xl cursor-pointer border rounded"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <span className="text-lg font-bold text-rose-600">PulseNews</span>
          <button
            className="text-2xl cursor-pointer border rounded p-1"
            onClick={() => setOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded text-gray-700 hover:bg-rose-600 hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
