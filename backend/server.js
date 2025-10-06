const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});