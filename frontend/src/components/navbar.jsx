import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const categories = [
  "general",
  "business",
  "technology",
  "entertainment",
  "sports",
  "health",
  "science",
];
// const countries = ["us", "in", "gb", "au", "ca"];
const countries = ["us"];

export default function Navbar({
  onSearch,
  country,
  setCountry,
  active,
  setActive,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

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
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-rose-600" />
            <Link
              to="/"
              className="text-xl font-extrabold tracking-tight !text-rose-600">
              PulseNews
            </Link>
          </div>

          {/* Center: Categories (Desktop only) */}
          <ul className="hidden md:flex items-center gap-5 text-sm font-medium">
            {categories.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setActive(c)}
                  className={`capitalize transition-colors text-gray-600 ${
                    active === c
                      ? "text-rose-600"
                      : scrolled
                      ? "hover:text-rose-600"
                      : "hover:text-rose-300"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: Country + Search (Desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`rounded-lg border px-2 py-1 text-sm ${
                scrolled
                  ? "bg-white text-gray-800"
                  : "bg-white/90 text-gray-800"
              }`}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch(term.trim());
              }}
              className={`flex items-center rounded-full border px-3 py-1.5 ${
                scrolled ? "bg-white" : "bg-white/90"
              }`}
            >
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-40 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                placeholder="Search articles..."
              />
              <button
                type="submit"
                className="ml-2 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* Hamburger (Mobile only) */}
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
        {/* Close button inside drawer */}
        <div className="flex justify-between items-center p-[17px] border-b border-gray-400">
          <span className="text-lg font-bold">Menu</span>
          <div className="items-center flex gap-3">
            {/* Country */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-lg border px-2 py-1 text-sm bg-white text-gray-800"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
            <button
              className="text-2xl cursor-pointer border rounded "
              onClick={() => setOpen(false)}
            >
              <FiX />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 bg-white/95 background-blur">
          {/* Categories */}
          <div className="flex flex-col gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActive(c);
                  setOpen(false);
                }}
                className={`px-3 py-2 text-left rounded capitalize ${
                  active === c ? "bg-rose-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(term.trim());
              setOpen(false);
            }}
            className="flex items-center rounded-full border px-3 py-2 bg-white"
          >
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              placeholder="Search articles..."
            />
            <button
              type="submit"
              className="ml-2 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
