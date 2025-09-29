import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const apiKey = "35774b6ef5cf4c50a38a1d9332761028";

export default function Home() {
  const [active, setActive] = useState("general");
  const [country, setCountry] = useState("us");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [resLoading, setResLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!searchTerm) return setResults([]);
    setResLoading(true);

    const controller = new AbortController();

    fetch(
      `${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(
        searchTerm
      )}`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((d) => {
        setResults(d.articles || []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("❌ Failed to fetch search results:", err);
        }
      })
      .finally(() => {
      setResLoading(false);
      // 👇 scroll after fetch finishes (whether results exist or not)
      if (searchRef.current) {
        searchRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => controller.abort();
  }, [searchTerm]);

  return (
    <div className="bg-neutral-50">
      <Navbar
        onSearch={(t) => setSearchTerm(t)}
        country={country}
        setCountry={setCountry}
        active={active}
        setActive={setActive}
      />

      <Hero
        country={country}
        activeCategory={active}
        onPickArticle={() => {}}
      />

      {/* Read More Button */}
      <div className="text-center mt-8">
        <Link
          to="/news/general"
          className="inline-block rounded-full bg-rose-600 px-6 py-2 font-semibold hover:bg-rose-700 transition !text-white"
        >
          View All News
        </Link>
      </div>

      {/* Search Results Section */}
      {searchTerm && (
        <section ref={searchRef} className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Search results for{" "}
              <span className="text-rose-600">“{searchTerm}”</span>
            </h2>
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm font-medium text-gray-600 hover:text-rose-600"
            >
              Clear
            </button>
          </div>

          {resLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="h-44 animate-pulse rounded-xl bg-gray-200"
                />
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="text-gray-600">
              No results found. Try another keyword.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a, i) => (
                <a
                  key={i}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                >
                  {a.urlToImage && (
                    <img
                      src={a.urlToImage}
                      alt={a.title}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-rose-600">
                      {a.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {a.description}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {a.source?.name} •{" "}
                      {a.publishedAt &&
                        new Date(a.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
