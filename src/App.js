import './App.css';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import About from './pages/About/about';
import Science from './pages/Science/science';
import Technology from './pages/Technolgy/technology';
import Sports from './pages/Sports/sports';
import Entertainment from './pages/Entertainment/entertainment';
import Business from './pages/Business/business';
import Health from './pages/Health/health';
import Contact from './pages/Contact/contact';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}>Home</Route>
          <Route path="/login" element={<Login />}>Login</Route>
          <Route path="/about" element={<About />}>About</Route>
          <Route path="/science" element={<Science />}>Science</Route>
          <Route path="/technology" element={<Technology />}>Technical</Route>
          <Route path="/sports" element={<Sports />}>Sports</Route>
          <Route path="/entertainment" element={<Entertainment />}>Entertainment</Route>
          <Route path="/business" element={<Business />}>Business</Route>
          <Route path="/health" element={<Health />}>Health</Route>
          <Route path="/contact&us" element={<Contact />}>Login</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
