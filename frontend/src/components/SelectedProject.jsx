import { useEffect, useState } from "react";
import Tasks from "../components/Tasks";

export default function SelectedProject({ projectId, onDelete, onAddTask, onDeleteTask, tasks }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the selected project's details
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`http://localhost:3000/projects/${projectId}`);
        if (!res.ok) throw new Error("Failed to fetch project details");
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return <p className="text-stone-500">Loading project details...</p>;
  }

  if (error || !project) {
    return <p className="text-red-500">Error: {error || "Project not found"}</p>;
  }

  const formattedDate = new Date(project.duedate).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
          <button
            className="px-6 py-2 rounded-md bg-green-800 text-stone-50 hover:bg-red-800"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}
