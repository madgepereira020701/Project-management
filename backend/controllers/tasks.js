const Task = require("../models/task");

const addtask = async (req, res) => {
  const { title, projectId } = req.body;
  const task = new Task({ title, projectId });
  await task.save();
  res.json(task);
};

// GET /api/tasks/:projectId
const gettask = async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
};

const deletetask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error" });
  }
};

module.exports = { addtask, gettask, deletetask };
