const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.db_name}:${process.env.db_pass}@cluster0.6qi4vu5.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {


    await client.connect();
    const database = client.db("Islamic_Tracker");
    const foodCollection = database.collection("foods");
    const userCollection = database.collection("users");
    

    //food add api
    app.post("/foods", async (req, res) => {
      const food = req.body;
      const result = await foodCollection.insertOne(food);
      res.send(result);
    }); 

    //food get api
    app.get("/foods", async (req, res) => {
      const cursor = foodCollection.find({});
      const foods = await cursor.toArray();
      res.send(foods);
    
    });




    //user add api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //user get api
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Islamic tracking server is running");
});

app.listen(port, () => {
  console.log(`Islamic tracking server listening on port ${port}`);
});
