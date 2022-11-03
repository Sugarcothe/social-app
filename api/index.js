const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const postsRoute = require("./routes/posts");


dotenv.config();

// CONNECTING TO DATABASE
const app = express();
mongoose.connect(process.env.MONGO_DB, (err) => {
  if (err) {
    console.log(`🔴 BACKEND IS NOT CONNECTED ${err}`);
  } else {
    console.log(`🟢 CONNECTED TO MONGODB`);
  }
});

// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// API ROUTE
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

// SERVER LISTENING TO PORT
app.listen(process.env.PORT, () => {
  console.log(`🟢 SERVER IS LISTENING IN PORT ${process.env.PORT}`);
});
