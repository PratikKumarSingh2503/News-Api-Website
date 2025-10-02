import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about the latest news." },
  ]);
  const [input, setInput] = useState("");
  const [lastCategory, setLastCategory] = useState("general");
  const [seenArticles, setSeenArticles] = useState(new Set());

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const detectCategory = (query) => {
    const text = query.toLowerCase();
    if (text.includes("hi") || text.includes("hello") || text.includes("hey"))
      return "smalltalk";
    if (text.includes("how are you")) return "smalltalk";
    if (text.includes("tech") || text.includes("ai")) return "technology";
    if (text.includes("business") || text.includes("finance"))
      return "business";
    if (
      text.includes("sport") ||
      text.includes("cricket") ||
      text.includes("football")
    )
      return "sports";
    if (
      text.includes("health") ||
      text.includes("covid") ||
      text.includes("medical")
    )
      return "health";
    if (
      text.includes("science") ||
      text.includes("space") ||
      text.includes("research")
    )
      return "science";
    if (
      text.includes("entertainment") ||
      text.includes("movies") ||
      text.includes("music")
    )
      return "entertainment";
    return "general";
  };

  const fetchNews = async (category) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/chat-news?category=${category}`
      );
      const data = await res.json();
      let articles = data.articles || [];

      // filter out duplicates
      articles = articles.filter((a) => !seenArticles.has(a.url));

      // update seen
      setSeenArticles((prev) => {
        const updated = new Set(prev);
        articles.forEach((a) => updated.add(a.url));
        return updated;
      });

      // fallback if nothing new
      if (!articles.length && category !== "general") {
        const fallbackRes = await fetch(
          `${import.meta.env.VITE_API_URL}/chat-news?category=general`
        );
        const fallbackData = await fallbackRes.json();
        articles = fallbackData.articles || [];
      }

      return articles.slice(0, 3);
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const query = input.toLowerCase();
    setInput("");

    const category = detectCategory(query);
    setLastCategory(category);

    // small talk
    if (category === "smalltalk") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "👋 Hi there! I’m NewsBot. Ask me about tech, sports, business, health, science, or entertainment.",
        },
      ]);
      return;
    }

    const fetchCategory =
      query.includes("more news") || query.includes("show more")
        ? lastCategory
        : category;

    console.log("Fetching news for category:", fetchCategory);

    const headlines = await fetchNews(fetchCategory);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: headlines.length
          ? headlines
          : "I couldn’t find any news for that topic.",
      },
    ]);
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 z-[9999]"
        >
          💬
        </button>
      )}

      {isOpen && (
        <Rnd
          default={{
            x: window.innerWidth - 360,
            y: window.innerHeight - 460,
            width: 320,
            height: 420,
          }}
          minWidth={300}
          minHeight={350}
          bounds="window"
          dragHandleClassName="drag-handle"
          enableResizing={false}
          className="z-[9999] max-w-full"
          style={{
            position: "fixed",
            ...(window.innerWidth < 640
              ? { left: 0, right: 0, bottom: 0, width: "100%", height: "70vh" }
              : {}),
          }}
        >
          <div className="w-full h-full bg-white border rounded-xl shadow-xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="drag-handle flex justify-between items-center px-3 py-2 bg-blue-600 text-white font-semibold rounded-t-xl cursor-move">
              <span>📰 NewsBot</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 pointer-events-auto"
              >
                ✕
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`my-1 p-2 rounded-lg text-sm max-w-[80%] shadow-sm ${
                    msg.sender === "user"
                      ? "ml-auto bg-green-100 text-green-900"
                      : "mr-auto bg-gray-200 text-gray-800"
                  }`}
                >
                  {/* if bot message is list of articles */}
                  {Array.isArray(msg.text) ? (
                    <ul className="space-y-2">
                      {msg.text.map((a, idx) => (
                        <li key={idx}>
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {idx + 1}. {a.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center p-2 border-t bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ask about news..."
              />
              <button
                onClick={handleSend}
                className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </Rnd>
      )}
    </div>
  );
};

export default Chatbot;
