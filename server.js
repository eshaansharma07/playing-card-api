require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Card = require("./models/Card");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Root Route (Required for Koyeb Health Check)
app.get("/", (req, res) => {
  res.send("Playing Card API Running");
});


// CREATE Card
app.post("/cards", async (req, res) => {
  const newCard = new Card(req.body);
  const savedCard = await newCard.save();
  res.json(savedCard);
});

// READ All Cards
app.get("/cards", async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

// UPDATE Card
app.put("/cards/:id", async (req, res) => {
  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedCard);
});

// DELETE Card
app.delete("/cards/:id", async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.json({ message: "Card Deleted" });
});


// IMPORTANT FOR KOYEB
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
