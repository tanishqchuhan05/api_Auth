const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const createSuperAdmin = require("./utilities/createSuperAdmin");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");
const  ROUTES  = require("./routes/routesEnum");
const routes = require("./routes/index")

const app = express();
app.use(express.json());


dotenv.config();

dbConnect().then(() => {
  // console.log("Connected to MongoDB");
  createSuperAdmin(); 
});


// app.use(cors({ origin: "*" }));
// app.options("*",cors())
// Allow all origins
app.use(cors());
// Alternative (Explicitly allow all origins)
app.use(
  cors({
    origin: "*",
  })
);


app.get("/test", (req, res) => {
  res.json({ message: "Backend app is running" });
});

app.use(routes);

const PORT = process.env.PORT;
//Export app for serverless deployment
app.listen(PORT, () => {
  console.log("Server is running");
});

module.exports = app;