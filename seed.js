const mongoose = require("mongoose");
const Candidate = require("./models/Candidate");

mongoose.connect("mongodb://localhost:27017/candidates_db");

const data = [
  {
    name: "Alice",
    phone: "1234567890",
    email: "alice@example.com",
    gender: "Female",
    experience: "2 Years",
    skills: ["JavaScript", "React"],
  },
  {
    name: "Bob",
    phone: "9876543210",
    email: "bob@example.com",
    gender: "Male",
    experience: "3 Years",
    skills: ["Python", "Node.js"],
  },
];

Candidate.insertMany(data).then(() => {
  console.log("Seeded!");
  mongoose.connection.close();
});
