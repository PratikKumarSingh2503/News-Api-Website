import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./components/chatbot";
import NewsPage from "./pages/newsPage";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* Chatbot can sit above main */}
        <Chatbot />

        {/* Main content expands to fill available space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:categoryName" element={<NewsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer always sticks to bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
