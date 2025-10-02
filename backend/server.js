import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cron from "node-cron";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error(err));

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
});
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// All News Fetching route
app.get("/api/news", async (req, res) => {
    try {
        const { country = "us", category, pageSize = "60" } = req.query;

        const params = new URLSearchParams({
            country,
            pageSize,
            apiKey: process.env.NEWS_API_KEY
        });
        if (category) {
            params.append("category", category);
        }

        const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
        const { data } = await axios.get(url);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch news" });
    }
});


// Search route
app.get("/api/search", async (req, res) => {
    const { q, country = "us" } = req.query;
    if (!q) return res.json({ articles: [] });

    try {
        // For search, NewsAPI everything endpoint ignores country; use top-headlines when q is short
        const baseUrl = q.length < 3
            ? `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=9&apiKey=${process.env.NEWS_API_KEY}`
            : `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=9&apiKey=${process.env.NEWS_API_KEY}`;
        const { data } = await axios.get(baseUrl);

        // Ensure frontend always gets { articles: [...] }
        res.json({ articles: data.articles || [] });
    } catch (err) {
        console.error("❌ Backend search error:", err);
        res.status(500).json({ articles: [] });
    }
});

// Fetch HeadLines
const fetchNews = async () => {
    try {
        const { data } = await axios.get(
            `https://newsapi.org/v2/top-headlines?&apiKey=${process.env.NEWS_API_KEY}`
        );

        // Take top 5 headlines
        const headlines = data.articles.slice(0, 5).map((a, i) =>
            `<p><b>${i + 1}.</b> <a href="${a.url}" target="_blank">${a.title}</a> (${a.source?.name || "Unknown"})</p>`
        ).join("");

        return headlines || "No news available today.";
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        return "Could not fetch news today.";
    }
};

// Chatbot news route
app.get("/api/chat-news", async (req, res) => {
    try {
        const { category, country = "us" } = req.query;
        const validCategories = [
            "business",
            "entertainment",
            "general",
            "health",
            "science",
            "sports",
            "technology"
        ];
        const cat = validCategories.includes(category) ? category : "general";

        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${cat}&apiKey=${process.env.NEWS_API_KEY}`;

        const { data } = await axios.get(url);
        const articles = data.articles || [];

        const formattedArticles = articles.length
            ? articles.slice(0, 3).map((a, i) => ({
                id: i + 1,
                title: a.title,
                url: a.url,
                source: a.source?.name,
            }))
            : [
                {
                    id: 0,
                    title: "Sorry, no news available for this category right now.",
                    url: null,
                },
            ];

        // ✅ return as "articles" instead of "headlines"
        res.json({ articles: formattedArticles });
    } catch (error) {
        console.error("❌ Chatbot news fetch error:", error.message);
        res.status(500).json({
            articles: [
                { id: 0, title: "Sorry, I couldn't fetch the news.", url: null },
            ],
        });
    }
});

// Subscribe route
app.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: "🎉 Subscribed successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "You are already subscribed!" });
        }
        res.status(500).json({ message: "Server error", error });
    }
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Gmail
        pass: process.env.EMAIL_PASS  // App password
    }
});

// Contact route
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // 1️⃣ Send message to admin
        await transporter.sendMail({
            from: `"PulseNews Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Admin email
            replyTo: email,
            subject: `📩 New Contact Message from ${name}`,
            html: `
        <h3>New message from PulseNews contact form</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
        });

        // 2️⃣ Send confirmation to user
        await transporter.sendMail({
            from: `"PulseNews" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "✅ We received your message!",
            html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting <b>PulseNews</b>. We’ve received your message and will get back to you soon.</p>
        <br/>
        <p><i>Here’s a copy of your message:</i></p>
        <blockquote>${message}</blockquote>
        <br/>
        <p>Best regards,<br/>The PulseNews Team 📰</p>
      `,
        });

        res.json({ success: true, message: "✅ Your message has been sent successfully!" });
    } catch (error) {
        console.error("❌ Contact form error:", error);
        res.status(500).json({ success: false, message: "❌ Failed to send message. Try again later." });
    }
});


// Cron job: send news daily at 9 AM
cron.schedule("0 9 * * *", async () => {
    try {
        const subscribers = await Subscriber.find();
        if (!subscribers.length) return;

        const newsHeadlines = await fetchNews();

        const emails = subscribers.map(sub => sub.email);

        await transporter.sendMail({
            from: `"Daily News" <${process.env.EMAIL_USER}>`,
            to: emails,
            subject: "📰 Your Daily News Update",
            html: `<h3>Here are today's top news headlines:</h3>${newsHeadlines}<p>Stay informed!</p>`
        });


        console.log("✅ Daily news emails sent");
    } catch (err) {
        console.error("❌ Error sending daily emails:", err);
    }
}, { timezone: "Asia/Kolkata" });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
