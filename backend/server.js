// server.js

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const noteRoutes = require("./routes/noteRoute");
const pdfRoutes = require("./routes/pdfRoutes");
const quizRoutes = require("./routes/quizRoute");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/DashboardRoutes");

const app = express();


// ======================
// DATABASE
// ======================

connectDB();


// ======================
// MIDDLEWARE
// ======================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());


// ======================
// STATIC FOLDER
// ======================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ======================
// RATE LIMIT
// ======================

const limiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 1000,

  message:
    "Too many requests, try again later.",

});

app.use(limiter);


// ======================
// FAVICON FIX
// ======================

app.get("/favicon.ico", (req, res) => {

  res.status(204).end();

});


// ======================
// ROUTES
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/pdf", pdfRoutes);

app.use("/api/quiz", quizRoutes);

app.use("/api/user", userRoutes);

app.use("/api/dashboard", dashboardRoutes);


// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {

  res.send("API Running 🚀");

});


// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT} 🚀`
  );

});