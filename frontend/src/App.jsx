import { useState, useEffect } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(undefined);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]); // For future task feature

  // Fetch all projects on initial load
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("http://localhost:3000/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }

    fetchProjects();
  }, []);

  // Fetch selected project details
  useEffect(() => {
    async function fetchProjectById() {
      if (!selectedProjectId) {
        setSelectedProject(null);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/projects/${selectedProjectId}`);
        const data = await res.json();
        setSelectedProject(data);
      } catch (err) {
        console.error("Error fetching selected project:", err);
        setSelectedProject(null);
      }
    }

    fetchProjectById();
  }, [selectedProjectId]);

  // Handlers
  function handleSelectProject(id) {
    setSelectedProjectId(id);
  }

  function handleStartAddProject() {
    setSelectedProjectId(null); // show NewProject component
  }

  function handleCancelAddProject() {
    setSelectedProjectId(undefined); // go back to initial view
  }

  async function handleAddProject(projectData) {
    try {
      const res = await fetch("http://localhost:3000/addproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed to add project");

      // Re-fetch project list
      const response = await fetch("http://localhost:3000/projects");
      const updatedProjects = await response.json();
      setProjects(updatedProjects);
      setSelectedProjectId(undefined);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  }

  async function handleDeleteProject() {
    try {
      await fetch(`http://localhost:3000/projects/${selectedProjectId}`, {
        method: "DELETE",
      });

      // Refresh list after deletion
      const response = await fetch("http://localhost:3000/projects");
      const updatedProjects = await response.json();
      setProjects(updatedProjects);
      setSelectedProjectId(undefined);
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  }

  // Task-related handlers (still frontend-only)
  function handleAddTask(text) {
    const taskId = Math.random();
    const newTask = { text, projectId: selectedProjectId, id: taskId };
    setTasks((prev) => [newTask, ...prev]);
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  // Conditional rendering
  let content = <p className="text-center">Loading...</p>;

  if (selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (selectedProject) {
    content = (
<SelectedProject
  projectId={selectedProjectId}
  onDelete={handleDeleteProject}
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={tasks.filter((task) => task.projectId === selectedProjectId)}
/>
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={selectedProjectId}
        projects={projects}
      />
      {content}
    </main>
  );
}

export default App;
