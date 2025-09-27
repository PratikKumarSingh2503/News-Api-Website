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
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error(err));

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
});
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// News chatbot route
app.get("/chat-news", async (req, res) => {
    try {
        const { category } = req.query; // e.g. technology, business, sports
        const url = `https://newsapi.org/v2/top-headlines?country=in${category ? `&category=${category}` : ""
            }&apiKey=${process.env.NEWS_API_KEY}`;

        const { data } = await axios.get(url);

        const headlines = data.articles.slice(0, 3).map((a, i) => `${i + 1}. ${a.title}`);
        res.json({ headlines });
    } catch (error) {
        console.error("❌ Chatbot news fetch error:", error);
        res.status(500).json({ headlines: ["Sorry, I couldn't fetch the news."] });
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

// Fetch News from API
const fetchNews = async () => {
    try {
        const { data } = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
        );

        // Take top 5 headlines
        const headlines = data.articles.slice(0, 5).map((a, i) => `${i + 1}. ${a.title}`).join("\n");

        return headlines || "No news available today.";
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        return "Could not fetch news today.";
    }
};

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
            text: `Here are today's top news headlines:\n\n${newsHeadlines}\n\nStay informed!`
        });

        console.log("✅ Daily news emails sent");
    } catch (err) {
        console.error("❌ Error sending daily emails:", err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ MongoDB connected"))
//     .catch(err => console.error(err));

// // Subscriber Schema
// const subscriberSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true }
// });
// const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// // Subscribe route
// app.post("/subscribe", async (req, res) => {
//     try {
//         const { email } = req.body;
//         if (!email) return res.status(400).json({ message: "Email is required" });

//         // Save to DB
//         const newSubscriber = new Subscriber({ email });
//         await newSubscriber.save();

//         res.status(201).json({ message: "🎉 Subscribed successfully!" });
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(400).json({ message: "You are already subscribed!" });
//         }
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // Daily email sender (Cron later)
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER, // your email
//         pass: process.env.EMAIL_PASS  // app password (not raw Gmail password)
//     }
// });

// // Example route to send test email
// app.post("/send-news", async (req, res) => {
//     try {
//         const subscribers = await Subscriber.find();
//         const emails = subscribers.map(sub => sub.email);

//         await transporter.sendMail({
//             from: `"Daily News" <${process.env.EMAIL_USER}>`,
//             to: emails,
//             subject: "📰 Your Daily News Update",
//             text: "Here are today’s top news stories... (later connect with News API)"
//         });

//         res.json({ message: "✅ Emails sent!" });
//     } catch (err) {
//         res.status(500).json({ message: "Error sending emails", err });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
