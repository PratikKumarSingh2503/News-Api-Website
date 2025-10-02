import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setStatus(data.message || "❌ Something went wrong.");
      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("❌ Contact submit error:", err);
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <section className="bg-neutral-50 min-h-screen py-16 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Have feedback, questions, or collaboration ideas? Drop us a message
          below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-xl shadow"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-lg border px-3 py-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700 transition"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-6 text-center text-green-600 font-medium">
            {status}
          </p>
        )}
      </div>
    </section>
  );
}
