const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const user = require("./routes/router");
const guide = require("./routes/guides");
const client = require("./routes/client");
const gpt = require("./routes/gpt");
// const paymentRoute = require("./routes/payment.js");
// const transactionRoute = require("./routes/transaction.js");

// Load config
dotenv.config({ path: "./config/config.env" });

// console.log(process.env.SECRET);
connectDB();

const app = express();

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.use(cookieParser());
app.use("/api/auth", user);
app.use("/guide", guide);
app.use("/client", client);
app.use("/chat", chat);
// app.use("/api", paymentRoute);
// app.use("/api", transactionRoute);
// app.get("/api/getkey", (req, res) =>
//   res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// );
//Logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Routes

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`app running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
