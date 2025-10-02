import React, { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "✅ Subscribed successfully!");
      } else {
        setSuccess(data.error || "❌ Subscription failed. Try again.");
      }
    } catch (err) {
      console.error("❌ Subscription error:", err);
      setSuccess("❌ Subscription failed. Try again.");
    } finally {
      setEmail("");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-1 rounded-lg border "
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
      {success && (
        <p className={`mt-3 ${res.ok ? "text-green-600" : "text-red-600"}`}>
          {success}
        </p>
      )}
    </div>
  );
};

export default Subscribe;
