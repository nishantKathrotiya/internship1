const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/connect");

const userRoutes = require("./routes/User");
const studentRoutes = require("./routes/Student");
const hodRoutes = require("./routes/Hod")
const committeeRoutes = require("./routes/Committee");
const adminRoutes = require("./routes/Admin")

dotenv.config();
const PORT = process.env.PORT;

//database connect
dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//routes
app.use("/auth", userRoutes);
app.use("/student", studentRoutes);
app.use("/hod", hodRoutes);
app.use("/committee", committeeRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

