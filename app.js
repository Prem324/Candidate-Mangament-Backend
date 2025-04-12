const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const candidateRoutes = require("./routes/candidates.js");

const app = express();

app.use(cors());
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Candidate Mangement Portal");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/candidates", require("./routes/candidates"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
