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
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Projects not found" });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

module.exports = { addproject, getproject, getSingleProject, deleteProject };
