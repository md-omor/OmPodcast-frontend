require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");

const PORT = process.env.PORT || 5500;
app.use(express.json());
app.use(router);

app.get("/", (req, res) => res.send("Hello world"));

const server = app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
