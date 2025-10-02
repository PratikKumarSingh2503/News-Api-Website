import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import SubscriptionForm from "./subscribe";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 border-t border-gray-300 mt-12">
      <div className="max-w-7xl mx-auto py-6 items-center justify-center grid gap-10 md:grid-cols-3 ">
        {/* Brand / About */}
        <div className="px-6">
          <h3 className="text-2xl font-extrabold text-rose-600">PulseNews</h3>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Stay updated with breaking news and stories across categories:
            business, technology, sports, health, science, and more.
          </p>
          {/* Social Media */}
          <div className="flex gap-4 mt-4 text-gray-500">
            <a href="#" className="hover:text-rose-600">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-rose-600">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="hover:text-rose-600">
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="px-8">
          <ul className="flex text-sm gap-4 justify-center border-b boder-gray-300 pb-3 font-medium">
            <li>
              <Link
                to="/"
                className="!text-gray-600 hover:text-rose-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/news/general"
                className="!text-gray-600 hover:text-rose-600 transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="!text-gray-600 hover:text-rose-600 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="!text-gray-600 hover:text-rose-600 transition"
              >
                Contact
              </Link>
            </li>
          </ul>

          <ul className="flex text-sm gap-4 justify-center pt-2 font-medium">
            <li>
              <Link
                to="/"
                className="!text-gray-600 hover:text-rose-600 transition"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="!text-gray-600 hover:text-rose-600 transition"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="!text-gray-600 hover:text-rose-600 transition"
              >
                Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscription Form */}
        <div className="px-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Subscribe</h3>
          <p className="text-gray-600 text-sm mb-3">
            Get daily updates directly to your inbox.
          </p>
          <SubscriptionForm />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} PulseNews — built with ❤️ and NewsAPI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
