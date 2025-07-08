const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  due_date: { type: String, require: true },
});

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
