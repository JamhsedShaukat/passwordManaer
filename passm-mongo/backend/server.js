const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const { MongoClient } = require("mongodb");
dotenv.config();
const bodyparser = require("body-parser");
// or as an es module:
// import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";

const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(cors());
// console.log(process.env.MONGO_URI);
client.connect();

// get all a password
app.get("/", async (req, res) => {
  const db = client.db("passop");
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save a passwords
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db("passop");
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.json({ success: true, result: findResult });
});

// delete a password

app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db("passop");
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
