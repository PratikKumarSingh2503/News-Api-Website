import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const apiKey = "35774b6ef5cf4c50a38a1d9332761028";
const categories = [
  "general",
  "business",
  "technology",
  "sports",
  "health",
  "entertainment",
];

const NewsPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/news?country=us&category=${
            categoryName || "general"
          }`
        );
        const data = await res.json();
        const withImg = (data.articles || []).filter((a) => a.urlToImage);
        setArticles(withImg.length ? withImg : data.articles || []);
      } catch (err) {
        console.error("❌ Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-5">
      {/* Category Menu */}
      <div className="flex gap-3 mb-8 px-4 items-center md:justify-center overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {/* Home button */}
        <button
          onClick={() => navigate("/")}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition snap-start
      ${
        categoryName === "home"
          ? "bg-rose-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
        >
          Home
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/news/${cat}`)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition snap-start
        ${
          cat === categoryName
            ? "bg-rose-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      )}

      {/* No Articles */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-10">
          <div className="mx-auto w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full shadow-md mb-6">
            <span className="text-4xl">📰</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No News Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn’t find any articles for this category. Try exploring other
            sections or search for something new.
          </p>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((a, i) => (
          <a
            key={i}
            href={a.url}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md flex flex-col"
          >
            {a.urlToImage && (
              <img
                src={a.urlToImage}
                alt={a.title}
                className="h-44 w-full object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-rose-600">
                {a.title}
              </h3>
              {a.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {a.description}
                </p>
              )}
              <p className="mt-auto text-xs text-gray-500 pt-2">
                {a.source?.name} •{" "}
                {a.publishedAt && new Date(a.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </a>
        ))}
      </div>
      {/* Read More Button */}
      <div className="text-center mt-8">
        <Link
          to="/"
          className="inline-block rounded-full bg-rose-600 px-6 py-2 font-semibold hover:bg-rose-700 transition !text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NewsPage;
