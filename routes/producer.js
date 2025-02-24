// src/routes/producer.js
const Producer = require("../models/producerSchema");
const router = require("express").Router();

// Status endpoint for producer API
router.get("/status", async (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Producer API is operational"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Producer API status check failed"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post("/add-producer", async (req, res) => {
  try {
    const { name, gender, bio, DOB, image } = req.body;
    const producer = new Producer({
      name,
      gender,
      bio,
      DOB,
      image
    });
    await producer.save();
    res.json(producer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;