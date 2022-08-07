require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const router = require("./routes");

const PORT = process.env.PORT || 5500;

app.use(cookieParser());
app.use(express.json({ limit: "40mb" }));
app.use(router);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/storage", express.static("storage"));

app.get("/", (req, res) => res.send("Welcome to md omor Podcast API"));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connnect"))
  .catch((err) => console.log(err.message));

const server = app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
