import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about the latest news." },
  ]);
  const [input, setInput] = useState("");
  const [lastCategory, setLastCategory] = useState("general");

  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Detect category from query
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

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    const query = input.toLowerCase();
    setInput("");

    if (query.includes("more news") || query.includes("show more")) {
      try {
        const res = await fetch(
          `http://localhost:5000/chat-news?category=${lastCategory}`
        );
        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              data.headlines?.length > 0
                ? `Here are more ${lastCategory} updates:\n` +
                  data.headlines.join("\n")
                : "I couldn’t find more news right now.",
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Failed to fetch news. Try again." },
        ]);
      }
      return;
    }

    const category = detectCategory(query);
    setLastCategory(category);

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

    try {
      const res = await fetch(
        `http://localhost:5000/chat-news?category=${category}`
      );
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            data.headlines?.length > 0
              ? `Here are the latest ${category} updates:\n` +
                data.headlines.join("\n")
              : "I couldn’t find any news for that topic.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Failed to fetch news. Try again." },
      ]);
    }
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-[9999]"
        >
          💬 Chat
        </button>
      )}

      {isOpen && (
        <Rnd
          default={{
            x: window.innerWidth - 360, // stick to right
            y: window.innerHeight - 460, // stick to bottom
            width: 320,
            height: 400,
          }}
          minWidth={300}
          minHeight={300}
          bounds="window"
          dragHandleClassName="drag-handle"
          enableResizing={false} // optional: disable resize if not needed
          className="z-[9999] max-w-full"
          style={{ position: "fixed" }}
        >
          <div className="w-full h-full bg-white border rounded-xl shadow-lg flex flex-col transition-all duration-300 overflow-hidden">
            {/* Top bar */}
            <div className="drag-handle flex justify-between items-center p-2 bg-blue-600 text-white font-bold rounded-t-xl cursor-move">
              NewsBot
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 px-2 py-1 text-sm font-bold bg-red-500 rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-2 h-64 overflow-y-auto overflow-x-hidden">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`my-1 p-2 rounded-lg max-w-[70%] ${
                    msg.sender === "user"
                      ? "ml-auto bg-blue-100"
                      : "mr-auto bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex p-2 border-t">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border rounded-lg px-2 py-1 text-sm"
                placeholder="Ask about news..."
              />
              <button
                onClick={handleSend}
                className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </Rnd>
      )}
    </div>
  );
};

export default Chatbot;
// import React, { useState } from "react";
// import { Rnd } from "react-rnd";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi! Ask me about the latest news." },
//   ]);
//   const [input, setInput] = useState("");

//   // Simple keyword → category mapper
//   const detectCategory = (query) => {
//     const text = query.toLowerCase();

//     // Small talk detection
//     if (text.includes("hi") || text.includes("hello") || text.includes("hey"))
//       return "smalltalk";
//     if (text.includes("how are you")) return "smalltalk";

//     // Categories
//     if (text.includes("tech") || text.includes("ai")) return "technology";
//     if (text.includes("business") || text.includes("finance"))
//       return "business";
//     if (
//       text.includes("sport") ||
//       text.includes("cricket") ||
//       text.includes("football")
//     )
//       return "sports";
//     if (
//       text.includes("health") ||
//       text.includes("covid") ||
//       text.includes("medical")
//     )
//       return "health";
//     if (
//       text.includes("science") ||
//       text.includes("space") ||
//       text.includes("research")
//     )
//       return "science";
//     if (
//       text.includes("entertainment") ||
//       text.includes("movies") ||
//       text.includes("music")
//     )
//       return "entertainment";

//     return "general"; // fallback
//   };

//   const [lastCategory, setLastCategory] = useState("general");

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     setMessages([...messages, { sender: "user", text: input }]);
//     const query = input.toLowerCase();
//     setInput("");

//     // ✅ If user says "more news", use last category
//     if (query.includes("more news") || query.includes("show more")) {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/chat-news?category=${lastCategory}`
//         );
//         const data = await res.json();

//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: "bot",
//             text:
//               data.headlines && data.headlines.length > 0
//                 ? `Here are more ${lastCategory} updates:\n` +
//                   data.headlines.join("\n")
//                 : "I couldn’t find more news right now.",
//           },
//         ]);
//       } catch (err) {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "bot", text: "❌ Failed to fetch news. Try again." },
//         ]);
//       }
//       return;
//     }

//     // Detect category
//     const category = detectCategory(query);

//     // ✅ Save last category
//     setLastCategory(category);

//     // Smalltalk
//     if (category === "smalltalk") {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "👋 Hi there! I’m NewsBot. Ask me about tech, sports, business, health, science, or entertainment.",
//         },
//       ]);
//       return;
//     }

//     // Fetch news
//     try {
//       const res = await fetch(
//         `http://localhost:5000/chat-news?category=${category}`
//       );
//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text:
//             data.headlines && data.headlines.length > 0
//               ? `Here are the latest ${category} updates:\n` +
//                 data.headlines.join("\n")
//               : "I couldn’t find any news for that topic.",
//         },
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "❌ Failed to fetch news. Try again." },
//       ]);
//     }
//   };

//   return (
//     <div>
//       {/* Floating button (visible when chat is closed) */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-[9999]"
//         >
//           💬 Chat
//         </button>
//       )}

//       {/* Draggable Chat Window */}
//       {isOpen && (
//         <Rnd
//           default={{ x: 1200, y: 200, width: 320, height: 400 }}
//           minWidth={300}
//           minHeight={300}
//           bounds="window"
//           className="z-[9999]"
//         >
//           <div className="fixed bottom-16 right-5 w-80 bg-white border rounded-xl shadow-lg flex flex-col z-[99] transition-all duration-300">
//             {/* Top bar with drag handle + minimize button */}
//             <div className="drag-handle flex justify-between items-center p-2 bg-blue-600 text-white font-bold rounded-t-xl cursor-move">
//               NewsBot
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="ml-2 px-2 py-1 text-sm font-bold bg-red-500 rounded hover:bg-red-600"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-2 h-64 overflow-y-auto">
//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`my-1 p-2 rounded-lg max-w-[70%] ${
//                     msg.sender === "user"
//                       ? "ml-auto bg-blue-100"
//                       : "mr-auto bg-gray-100"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="flex p-2 border-t">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="flex-1 border rounded-lg px-2 py-1 text-sm"
//                 placeholder="Ask about news..."
//               />
//               <button
//                 onClick={handleSend}
//                 className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </Rnd>
//       )}
//     </div>
//   );
// };
