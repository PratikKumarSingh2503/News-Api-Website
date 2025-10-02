import React, { useEffect, useMemo, useState } from "react";

export default function Hero({ country, activeCategory, onPickArticle }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_API_URL}/news?country=${country}&category=${
        activeCategory || "general"
      }`
    )
      .then((r) => r.json())
      .then((d) => {
        const withImg = (d.articles || []).filter((a) => a.urlToImage);
        setItems(withImg.length ? withImg : d.articles || []);
      })
      .catch((err) => console.error("❌ Failed to fetch news:", err))
      .finally(() => setLoading(false));
  }, [country, activeCategory]);

  const featured = useMemo(() => items?.[0], [items]);
  const side = useMemo(() => items?.slice(1, 5) || [], [items]);

  if (loading) {
    return (
      <section className="relative mt-18 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 h-[360px] animate-pulse rounded-2xl bg-gray-200" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // if (!featured) return null;
  if (!featured) {
    return (
      <section className="relative mt-18 overflow-hidden">
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full shadow-md mb-6">
            <span className="text-4xl">📰</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No Featured News Available
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Stay tuned! We’re updating the latest headlines. Meanwhile, explore
            other categories to catch up with what’s happening around the world.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mt-18">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Featured Article */}
          <article className="relative lg:col-span-2 overflow-hidden rounded-2xl shadow ring-1 ring-black/5">
            <div
              className="h-full min-h-[380px] w-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(11,15,25,0.85), rgba(11,15,25,0.35)), url(${featured.urlToImage})`,
              }}
            >
              <div className="flex h-full flex-col justify-end p-6 md:p-8">
                <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                  {activeCategory || "Trending"}
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                </span>
                <h2 className="mb-2 line-clamp-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  {featured.title}
                </h2>
                {featured.description && (
                  <p className="mb-4 line-clamp-2 max-w-3xl text-sm/6 text-white/80">
                    {featured.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                  <span>{featured.source?.name}</span>
                  {featured.author && <span>• {featured.author}</span>}
                  {featured.publishedAt && (
                    <time>
                      • {new Date(featured.publishedAt).toLocaleString()}
                    </time>
                  )}
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
                  >
                    Read full story
                  </a>
                  <button
                    onClick={() => onPickArticle?.(featured)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur hover:bg-white/15"
                  >
                    Save for later
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Side Articles */}
          <div className="space-y-4">
            {side.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-4 overflow-hidden rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md"
              >
                {a.urlToImage && (
                  <img
                    src={a.urlToImage}
                    alt={a.title}
                    className="h-20 w-28 flex-none rounded-md object-cover"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-rose-600">
                    {a.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                    {a.description}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {a.source?.name} •{" "}
                    {a.publishedAt &&
                      new Date(a.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
