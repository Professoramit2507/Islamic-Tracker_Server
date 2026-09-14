const express = require("express");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.db_name}:${process.env.db_pass}@cluster0.6qi4vu5.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();

  console.log("Connected to MongoDB!");

  const database = client.db("Islamic_Tracker");

  const foodCollection = database.collection("foods");
  const userCollection = database.collection("users");
  const hadithCollection = database.collection("hadith");

  // =========================
  // Food API
  // =========================

  // Add food
  app.post("/foods", async (req, res) => {
    const food = req.body;

    const result = await foodCollection.insertOne(food);

    res.send(result);
  });

  // Get all foods
  app.get("/foods", async (req, res) => {
    const cursor = foodCollection.find({});
    const foods = await cursor.toArray();

    res.send(foods);
  });

  // =========================
  // User API
  // =========================

  // Add user
  app.post("/users", async (req, res) => {
    const user = req.body;

    const result = await userCollection.insertOne(user);

    res.send(result);
  });

  // Get all users
  app.get("/users", async (req, res) => {
    const cursor = userCollection.find({});
    const users = await cursor.toArray();

    res.send(users);
  });

  // =========================
  // Hadith API
  // =========================

  // Add hadith
  app.post("/hadith", async (req, res) => {
    const hadith = req.body;

    const result = await hadithCollection.insertOne(hadith);

    res.send(result);
  });

  // Get all hadith
  app.get("/hadith", async (req, res) => {
    const cursor = hadithCollection.find({});
    const hadiths = await cursor.toArray();

    res.send(hadiths);
  });

  // =========================
  // Root API
  // =========================

  app.get("/", (req, res) => {
    res.send("Islamic tracking server is running");
  });

  // Start server
  app.listen(port, () => {
    console.log(`Islamic tracking server listening on port ${port}`);
  });
}

run().catch(console.dir);
