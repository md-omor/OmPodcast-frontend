require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const router = require("./routes");

const PORT = process.env.PORT || 5500;

const corsOption = {
  origin: ["http://localhost:3000"],
};

app.use(express.json());
app.use(router);
app.use(cors(corsOption));

app.get("/", (req, res) => res.send("Welcome to md omor Podcast API"));

// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Database connnect"))
//   .catch((err) => console.log(err.message));

const uri =
  "mongodb+srv://omor:Omor16@ompodcastclaster.k1jkxpm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  console.log("Database connnect");
});

const server = app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
