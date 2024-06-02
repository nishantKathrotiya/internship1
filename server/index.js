
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const dbConnect = require("./config/connect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const {isLoggedin,isAdmin}  =require("./middleware/AuthMiddleware")

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

app.get("/", (req, res) => {
	
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
	
});

app.get('/test' ,isLoggedin, isAdmin ,(req,res)=>{
    console.log(req.user);
    res.send(req.user);
})


app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
  });