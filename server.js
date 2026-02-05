const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// A simple test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is alive!" });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
