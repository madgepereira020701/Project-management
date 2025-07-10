const Project = require("../models/project");

const addproject = async (req, res) => {
  const { title, description, duedate } = req.body;

  try {
    const newproject = new Project({ title, description, duedate });
    await newproject.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Projects not found" });
  }
};

const getproject = async (req, res) => {
  try {
    const projects = await Project.find({ title });
    res.status(200).json({ projects, message: "Projects not found" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Projects not found" });
  }
};

module.exports = { addproject, getproject };
