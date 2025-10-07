const express = require("express");
const port = 3000;
const app = express();
const connectDB = require("./db");
const personRoute = require("./routes/personRoutes");
const resumeRoute = require("./routes/resumeRoute");
const { GoogleGenAI } = require("@google/genai");
const cors = require("cors");

connectDB();

app.use(cors());

app.use("/uploads", express.static("uploads"));

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
// app.use(bodyParser.json());
app.use("/user", personRoute);
app.use("/uploads", resumeRoute);

app.get("/", (req, res) => {
  res.send(" AI POWERED RESUME");
});

app.listen(port, () => {
  console.log(`your port is listining at ${port}`);
});
