const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// Get with filtering and search
router.get("/", async (req, res) => {
  const {
    search,
    gender,
    experience,
    skills,
    page = 1,
    limit = 10,
  } = req.query;
  const query = {};

  if (search) {
    const regex = new RegExp(search, "i");
    query.$or = [{ name: regex }, { phone: regex }, { email: regex }];
  }

  if (gender) query.gender = gender;

  if (experience) query.experience = `${experience} Years`;

  if (skills) query.skills = { $all: skills.split(",") };

  const total = await Candidate.countDocuments(query);
  const candidates = await Candidate.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ candidates, total });
});

// Create new candidate
router.post("/", async (req, res) => {
  const candidate = new Candidate(req.body);
  await candidate.save();
  res.status(201).json(candidate);
});

// PUT: Update candidate
router.put("/:id", async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete candidate
router.delete("/:id", async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: "Candidate deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
