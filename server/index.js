const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const resumeRoutes = require("./routes/resume.route");

const app = express();

//dotenv config
dotenv.config();

//database config
mongoDB();

app.use(express.json());
//middlewares
const whitelist = [
  "http://localhost:5173",
  "https://fastcv.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  withCredentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
  res.status(200).send("Hello from the server side!");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/data", resumeRoutes);

//middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
  // console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

mongoDB();
mongoose.connect(process.env.MONGO_URL).then(res=>console.log('DATABASE CONNECTED'))
//.catch(err=>console.log('somthong kalajadu happen'))  //connect to database
