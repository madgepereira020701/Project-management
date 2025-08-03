const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: { type: String, required: true },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
