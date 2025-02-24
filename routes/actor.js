// src/routes/actor.js
const Actor = require("../models/actorSchema");
const router = require("express").Router();

// Status endpoint for actor API
router.get("/status", async (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Actor API is operational"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Actor API status check failed"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post("/add-actor", async (req, res) => {
  try {
    const { name, gender, bio, DOB, image } = req.body;
    const actor = new Actor({
      name,
      gender,
      bio,
      DOB,
      image
    });
    await actor.save();
    res.json(actor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;