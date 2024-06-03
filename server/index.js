const express = require("express");
const app = express();

const dbConnect = require("./config/connect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/User");
const studentRoutes = require("./routes/Student")

dotenv.config();
const PORT = process.env.PORT ;

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
app.use("/student",studentRoutes);



app.get("/", (req, res) => {
	
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
	
});




app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
  });