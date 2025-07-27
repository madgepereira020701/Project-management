const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const projectcontroller = require("./controllers/projects");
const port = 3000;

connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:5173", required: true }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/addproject", projectcontroller.addproject);
app.get("/projects", projectcontroller.getproject);
app.get("/projects/:id", projectcontroller.getSingleProject);
app.delete("/projects/:id", projectcontroller.deleteProject);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
