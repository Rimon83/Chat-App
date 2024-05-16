// npm i express cors mongoose jsonwebtoken cookie-parser dotenv bcryptjs
// npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "../database/connectDB.js";
import router from "../api_routes/index.js";
import cookieParser from "cookie-parser";

   import path from "path";
   const __dirname = path.resolve();
// for socket
import {app, server} from "../socket/index.js"

const PORT = 3001;
// const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// to grab data from client side and process it in server side
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to use cookie
app.use(cookieParser());

// api endpoint
app.use("/api", router);



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

server.listen(PORT || process.env.PORT, () => {
  console.log("Server run on port " + PORT);
  connectToDB();
});
