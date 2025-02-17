const express = require("express");
const mongoose = require("mongoose");
const TravelPlan = require("./model/travel"); // Ensure this model is correctly set up
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
async function main() {
  await mongoose.connect(
    "mongodb+srv://nitintomas31:entri1234@cluster0.sprx6.mongodb.net/e48db",
    {}
  );
}

main()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Home Route
app.get("/", (req, res) => {
  res.send("TRAVEL API");
});

// Create a Travel Plan (POST /plans)
app.post("/plans", async (req, res) => {
  try {
    const newPlan = new TravelPlan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: "Error creating plan", error });
  }
});

// Get all Travel Plans (GET /plans)
app.get("/plans", async (req, res) => {
  try {
    const plans = await TravelPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error });
  }
});

// Get a Specific Travel Plan (GET /plans/:id)
app.get("/plans/:id", async (req, res) => {
  try {
    const plan = await TravelPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plan", error });
  }
});

// Update a Travel Plan (PATCH /plans/:id)
app.patch("/plans/:id", async (req, res) => {
  try {
    const updatedPlan = await TravelPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlan)
      return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: "Error updating plan", error });
  }
});

// Delete a Travel Plan (DELETE /plans/:id)
app.delete("/plans/:id", async (req, res) => {
  try {
    const deletedPlan = await TravelPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan)
      return res.status(404).json({ message: "Plan not found" });
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan", error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
