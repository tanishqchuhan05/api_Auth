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
const corsOptions = {
  origin: ["http://localhost:3000","https://api-auth-la58.vercel.app"], //Allow frontend URL
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Fixed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow token headers
  credentials: true, // Required for authentication
};
// app.use(cors(corsOptions));
app.use(cors(corsOptions))
app.options("*", cors(corsOptions)); 



app.get("/test", (req, res)=>{
  res.json({message: "backend is running"});
})

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

export default app;