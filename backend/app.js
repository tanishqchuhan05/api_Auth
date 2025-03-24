const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const createSuperAdmin = require("../backend/utilities/createSuperAdmin");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
// Load environment variables from .env file
dotenv.config();

// Connect to Database
dbConnect().then(() => {
  console.log("Connected to MongoDB");
  createSuperAdmin(); // Call AFTER DB connection
});

// FIXED CORS CONFIGURATION
// app.use(cors({
//   origin: ["http://localhost:3000", "https://api-auth-la58.vercel.app"],
//   methods: "GET, POST, PUT, DELETE",
//   allowedHeaders: "Content-Type, Authorization",
//   credentials: true
// }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://api-auth-la58.vercel.app",
  // ✅ Add frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// const corsOptions = {
//   origin: [
//     "https://api-auth-la58.vercel.app",
//     "https://api-auth-la58-bn6td80kh-tanishqs-projects-0428fe8d.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // Allow cookies and authentication
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.get("/test", (req, res) => {
  res.json({ message: "backend is running" });
});

const path = require("path");
// Serve images from a folder where uploaded images are stored
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/orders", orderRoutes);

// Start the server
// const PORT = process.env.PORT || 7001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
