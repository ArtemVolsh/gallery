require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./Routes/router");
const cors = require("./Middlewares/cors.js");
const Port = process.env.PORT;
const ConnectionString = process.env.DB_CONSTRING;
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use("/api", Router);

const connectDB = async () => {
  try {
    await mongoose.connect(ConnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB connection SUCCESS ✔");
  } catch (error) {
    console.log("MongoDB connection FAILED ❌");
    console.log(error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    await connectDB();
    app.listen(Port, () => console.log(`http://localhost:${Port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
