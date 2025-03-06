const express = require('express');
const dotenv = require('dotenv');
const cors = require ('cors');
const dbConnect = require('./config/dbConnect');
const authRoutes = require("./routes/authRoutes");
const createSuperAdmin = require("../backend/utilities/createSuperAdmin") 



//Load environment varaibles from .env file
dotenv.config();


//dbConnect();
// Connect to Database
dbConnect().then(() => {
    console.log("🔥 Connected to MongoDB");
    createSuperAdmin(); // ✅ Call the function AFTER connecting to DB
  });

const app = express();

const corsOptions = {
    origin: [`http://localhost:3000`], method: ["POST", "PUT", "PATCH", "DELETE"], credential: true
}

app.use(cors(corsOptions));

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);



//start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, ()=>{
    console.log(`Server is runing at port ${PORT}`);
});  
